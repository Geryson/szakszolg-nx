import { Injectable } from '@angular/core'
import { IQuiz } from '@szakszolg-nx/api-interfaces'
import { Diagnostic } from '@awesome-cordova-plugins/diagnostic/ngx'

@Injectable({
    providedIn: 'root',
})
export class ExportService {
    private loadingDialog?: HTMLIonLoadingElement
    constructor(private readonly diagnostic: Diagnostic) {}

    async exportForm(survey: IQuiz) {}
}
