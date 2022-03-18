import { Inject, Injectable } from '@angular/core'
import { IExportableSurveyAnswer, IQuiz } from '@szakszolg-nx/api-interfaces'
import { Diagnostic } from '@awesome-cordova-plugins/diagnostic/ngx'
import { File } from '@awesome-cordova-plugins/file/ngx'
import { APOLLO_CLIENT } from '../injector.tokens'
import { Apollo } from 'apollo-angular'
import { ANSWERS } from '../graphql/answers.graphql'
import { presentAlert, presentConfirmation, presentLoading } from '../utils/observable.tools'
import { firstValueFrom } from 'rxjs'
import { Log } from '../utils/log.tools'

@Injectable({
    providedIn: 'root',
})
export class ExportService {
    private readonly headers: { key: keyof IExportableSurveyAnswer; label: string }[] = [
        { key: 'om', label: 'oktatasi_azonosito' },
        { key: 'questionId', label: 'kerdes_sorszam' },
        { key: 'answer', label: 'valasz' },
    ]
    private readonly csvDelimiter = ','
    private readonly csvNewLine = '\n'

    private loadingDialog?: HTMLIonLoadingElement
    constructor(
        @Inject(APOLLO_CLIENT) private readonly apolloClient: Apollo,
        private readonly diagnostic: Diagnostic,
        private readonly file: File,
    ) {}

    private static generateFileName(title: string) {
        const now = new Date()
        return `${now.getFullYear()}${now.getMonth() + 1}${now.getDate()}_${now
            .getHours()
            .toString()
            .padStart(2, '0')}${now.getMinutes().toString().padStart(2, '0')}${now
            .getSeconds()
            .toString()
            .padStart(2, '0')}_${title}.csv`
    }

    getAnswers(quizId: string) {
        return this.apolloClient.query<{ quizAnswers: IExportableSurveyAnswer[]; quiz: { title: string } }>({
            query: ANSWERS.READ,
            variables: { quizId },
            fetchPolicy: 'no-cache',
        })
    }

    async exportSurvey(survey: Partial<IQuiz>) {
        const confirm = await presentConfirmation('MESSAGE.FORM_CSV_EXPORT_CONFIRM', 'HEADER.CONFIRM')
        if (!confirm) return

        const res = await this.diagnostic.requestRuntimePermission(this.diagnostic.permission.WRITE_EXTERNAL_STORAGE)

        switch (res) {
            case this.diagnostic.permissionStatus.DENIED_ALWAYS:
            case this.diagnostic.permissionStatus.DENIED_ONCE:
                await presentAlert('MESSAGE.FORM_CSV_EXPORT_UNAUTHORIZED', 'HEADER.ERROR')
                break
            case this.diagnostic.permissionStatus.GRANTED:
                this.loadingDialog = await presentLoading()
                await this.exportSurveyToFile((await firstValueFrom(this.getAnswers(survey._id))).data)
                break
        }
    }

    private async exportSurveyToFile(queryResult: { quizAnswers: IExportableSurveyAnswer[]; quiz: { title: string } }) {
        // const externalPath =
        //     this.file.externalRootDirectory !== null && this.file.externalRootDirectory.length > 0
        //         ? this.file.externalRootDirectory
        //         : this.file.externalApplicationStorageDirectory.split('/Android')[0]
        try {
            const writeResult = await this.file.writeFile(
                'file:///storage/emulated/0',
                ExportService.generateFileName(queryResult.quiz.title),
                new Blob([this.generateCsv(queryResult.quizAnswers)]),
                {
                    replace: true,
                },
            )
            Log.debug('ExportService.exportFormToFile', 'Write OK', writeResult)
            presentAlert('MESSAGE.FORM_CSV_EXPORT_DONE', 'HEADER.EUREKA').then()
        } catch (e) {
            Log.error('ExportService::exportFormToFile', 'Export failed:', e)
            presentAlert('MESSAGE.FORM_CSV_EXPORT_FAILED', 'HEADER.ERROR').then()
        } finally {
            this.loadingDialog?.dismiss().then()
        }
    }

    private generateCsv(answers: IExportableSurveyAnswer[]): string {
        let result = `${this.headers.map((h) => h.label).join(this.csvDelimiter)}${this.csvNewLine}`
        for (const answer of answers) {
            result +=
                this.headers.map((header) => this.csvEscape(answer[header.key])).join(this.csvDelimiter) +
                this.csvNewLine
        }

        return result
    }

    private csvEscape(value: string | number): string {
        if (typeof value === 'number') {
            return value.toString()
        }
        value = value.replace(/"/g, '""').replace(/'/g, '""')
        return value.includes(this.csvDelimiter) ? `"${value}"` : value
    }
}
