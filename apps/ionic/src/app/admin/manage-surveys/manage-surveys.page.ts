import { Component } from '@angular/core'
import { CrudPageClass } from '../../../shared/utils/crud-page.class'
import { IQuiz, RESOURCES } from '@szakszolg-nx/api-interfaces'
import { pages } from '../../../shared/utils/pages.const'
import { SurveyService } from '../../../shared/services/survey.service'

@Component({
    selector: 'nx12-manage-surveys',
    templateUrl: './manage-surveys.page.html',
    styleUrls: ['./manage-surveys.page.scss'],
})
export class ManageSurveysPage extends CrudPageClass<IQuiz, { quizzes: Partial<IQuiz>[] }> {
    protected editPage = pages.admin.surveysManagement
    protected resourceName = RESOURCES.SURVEYS

    constructor(protected readonly resourceService: SurveyService) {
        super()
    }
}
