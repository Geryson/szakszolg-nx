/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Component } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { IQuiz, IQuizQuestion } from '@szakszolg-nx/api-interfaces'
import { QueryRef } from 'apollo-angular'
import { NG_ICON } from '../../../../shared/utils/prime-icons.class'
import { first, Subscription } from 'rxjs'
import { ConfirmationService, MessageService } from 'primeng/api'
import { TranslatePipe } from '@ngx-translate/core'
import { NavController } from '@ionic/angular'
import { SurveyService } from '../../../../shared/services/survey.service'
import { areEqual, deepCopy, omit } from '../../../../shared/utils/object.tools'
import { Log } from 'apps/ionic/src/shared/utils/log.tools'
import { showLoading } from '../../../../shared/utils/observable.tools'

@Component({
    selector: 'nx12-manage-single-survey',
    templateUrl: './manage-single-survey.page.html',
    styleUrls: ['./manage-single-survey.page.scss'],
})
export class ManageSingleSurveyPage {
    survey?: Partial<IQuiz>
    originalSurvey?: Partial<IQuiz>
    areEqual = areEqual
    NG_ICON = NG_ICON
    validationErrors: { [key: string]: string } = {}
    templateDialog = 0
    questionEditing?: IQuizQuestion
    categoryDialog = false
    skillQuestion = ''
    private originalQuestionEditing?: IQuizQuestion
    private queryRef?: QueryRef<{ quiz: Partial<IQuiz> }>
    private sub = new Subscription()

    constructor(
        private readonly activatedRoute: ActivatedRoute,
        private readonly surveyService: SurveyService,
        private readonly confirmation: ConfirmationService,
        private readonly translate: TranslatePipe,
        private readonly nav: NavController,
        private readonly toast: MessageService,
    ) {}

    ionViewDidEnter() {
        this.init().then()
    }

    check(prop: keyof IQuiz) {
        const validation = validations[prop](this.survey![prop as keyof IQuiz], prop)
        setTimeout(() => {
            if (!validation) this.validationErrors[prop] = this.translate.transform(`USER_EDIT.ERROR.${prop}`)
            // TODO: translate and show on UI
            else this.validationErrors[prop] = ''
        }, 50)
        return !validation
    }

    ionViewDidLeave() {
        this.sub?.unsubscribe()
    }

    save() {
        if (this.survey?._id) {
            this.update()
            return
        }
        this.create()
    }

    addClick() {
        Log.debug('ManageSingleSurveyPage::addClick', 'template', this.survey)
        const newQuestion: IQuizQuestion = {
            _id: this.getNextId(),
            type: !(this.survey?.template === 'custom' || this.survey?.template === 'quiz')
                ? this.survey?.template ?? 'free'
                : '',
            createdAt: new Date(),
            question: this.survey?.template === 'skill' ? this.skillQuestion : '',
            answers: [],
        }
        if (!this.survey?.questions) this.survey!.questions = []
        this.questionEditing = newQuestion
        this.originalQuestionEditing = deepCopy(newQuestion)
    }

    editClick(item: IQuizQuestion) {
        this.questionEditing = item
        this.originalQuestionEditing = deepCopy(item)
    }

    deleteClick(item: IQuizQuestion) {
        Log.debug('ManageSingleSurveyPage::deleteClick', 'item', item)
        this.survey!.questions = this.survey!.questions?.filter((question) => question._id !== item._id) // TODO: Add confirmation
    }

    formCanceled() {
        this.questionEditing = deepCopy(this.originalQuestionEditing)
        delete this.originalQuestionEditing
        delete this.questionEditing
    }

    formSubmitted($event: IQuizQuestion) {
        delete this.questionEditing
        delete this.originalQuestionEditing
        this.survey?.questions?.push($event)
    }

    templateChosen(template: string) {
        switch (template) {
            case 'template/':
                this.templateDialog = 2
                return
            case 'custom':
                this.survey!.template = 'custom'
                break
            default:
                this.survey!.template = template
                break
        }

        this.templateDialog = 0
    }

    templateChoosingCancelled(onTemplate2: boolean = false) {
        this.templateDialog--
        if (!onTemplate2) this.nav.back()
    }

    openCategoryManagement() {
        this.categoryDialog = true
    }

    private async init() {
        this.sub.add(
            this.activatedRoute.params.subscribe(async (params) => {
                if (params.id === 'new') {
                    this.survey = {
                        title: '',
                        description: '',
                        questions: [],
                        categories: [],
                        template: '',
                    }
                    this.originalSurvey = deepCopy(this.survey)
                    this.templateDialog = 1
                    return
                }

                this.queryRef = this.surveyService.read(params.id)
                this.sub.add(
                    this.queryRef!.valueChanges.subscribe(({ data }) => {
                        this.survey = deepCopy(data.quiz)
                        if (this.survey.categories?.length === 0) this.survey.categories = ['']
                        this.originalSurvey = deepCopy(this.survey)
                    }),
                )
                this.queryRef?.refetch().then()
            }),
        )
    }

    private async create() {
        const l = await showLoading()
        this.surveyService
            .add(this.survey!)
            .pipe(first())
            .subscribe(() => this.saveCallback(l))
    }

    private async update() {
        const l = await showLoading()
        this.surveyService
            .edit(this.survey!._id, omit(this.survey!, '_id'))
            .pipe(first())
            .subscribe(() => this.saveCallback(l))
    }

    private saveCallback(l: HTMLIonLoadingElement) {
        this.originalSurvey = { ...this.survey }
        this.toast.add({
            severity: 'success',
            summary: this.translate.transform('FORM_OPERATION.SUCCESS'),
            detail: this.translate.transform('FORM_OPERATION.SUCCESS_DETAIL'),
        })
        l.dismiss().then()
        this.nav.back()
    }

    private getNextId(): string {
        if (!this.survey?.questions) return '0'
        const next = (
            this.survey?.questions
                ?.map((question) => parseInt(question._id))
                .reduce((max, question_id) => Math.max(max, question_id), 0) + 1
        ).toString()
        Log.debug('ManageSingleSurveyPage::getNextId', 'next', next)
        return next
    }
}

const validations: { [key: string]: (value: string, attribute: string) => boolean } = {}
