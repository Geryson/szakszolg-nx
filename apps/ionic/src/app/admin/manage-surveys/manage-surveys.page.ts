import { Component } from '@angular/core'
import { CrudPageClass } from '../../../shared/utils/crud-page.class'
import { IQuiz, RESOURCES } from '@szakszolg-nx/api-interfaces'
import { pages } from '../../../shared/utils/pages.const'
import { SurveyService } from '../../../shared/services/survey.service'
import { TokenService } from '../../../shared/services/token.service'
import { first } from 'rxjs'
import { ExportService } from '../../../shared/services/export.service'
import { Log } from '../../../shared/utils/log.tools'
import { Clipboard } from '@awesome-cordova-plugins/clipboard/ngx'

@Component({
    selector: 'nx12-manage-surveys',
    templateUrl: './manage-surveys.page.html',
    styleUrls: ['./manage-surveys.page.scss'],
})
export class ManageSurveysPage extends CrudPageClass<IQuiz, { quizzes: Partial<IQuiz>[] }> {
    generatedToken: { quizId?: string; token?: string } = {}
    copied = false
    tokenDialog = false
    protected editPage = pages.admin.surveysManagement
    protected resourceName = RESOURCES.SURVEYS

    constructor(
        protected readonly resourceService: SurveyService,
        private readonly tokenService: TokenService,
        private readonly exportService: ExportService,
        private readonly clipboard: Clipboard,
    ) {
        super()
    }

    async createToken(item: Partial<IQuiz>) {
        if (item._id === this.generatedToken.quizId) {
            this.tokenDialog = true
            return
        }

        const loading = await this.loadingController.create().then((l) => {
            l.present()
            return l
        })

        this.tokenService
            .create(item._id)
            .pipe(first())
            .subscribe((res) => {
                this.generatedToken = {
                    quizId: item._id,
                    token: res.data?.createToken.token ?? '',
                }
                loading.dismiss().then()
                this.tokenDialog = true
            })
    }

    async copyToken() {
        if (!this.generatedToken.token) {
            Log.error('ManageSurveysPage::copyToken', 'No token to copy')
            return
        }
        try {
            await this.clipboard.copy(this.generatedToken.token)
        } catch (e) {
            Log.warn('ManageSurveysPage::copyToken', 'Error copying token to clipboard', e)
            Log.info('ManageSurveysPage::copyToken', 'Trying with navigator clipboard')
            await navigator.clipboard.writeText(this.generatedToken.token)
        }

        this.copied = true
        setTimeout(() => {
            this.copied = false
        }, 2000)
    }

    exportClick(item: Partial<IQuiz>) {
        this.exportService.exportSurvey(item).then()
    }
}
