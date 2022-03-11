/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Component } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { IQuiz, IQuizQuestion } from '@szakszolg-nx/api-interfaces'
import { QueryRef } from 'apollo-angular'
import { NG_ICON } from '../../../../shared/utils/prime-icons.class'
import { first, Subscription } from 'rxjs'
import { ConfirmationService, MessageService } from 'primeng/api'
import { NavController } from '@ionic/angular'
import { SurveyService } from '../../../../shared/services/survey.service'
import { areEqual, deepCopy, omit } from '../../../../shared/utils/object.tools'
import { Log } from '../../../../shared/utils/log.tools'
import { showLoading } from '../../../../shared/utils/observable.tools'
import { translate, Validator } from '../../../../shared/utils/translation.tools'

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
    templateDialog = 0
    questionEditing?: IQuizQuestion
    categoryDialog = false
    skillQuestion = ''
    options: { name: string; value: number }[] = []
    validator = new Validator<IQuiz>({
        subjectFactory: (__) => this.survey!,
        attributeFactory: (prop) =>
            prop === 'skillQuestion' ? this.skillQuestion : this.survey?.[prop as keyof IQuiz],
        translationKey: 'MANAGE_SURVEYS.SINGLE',
        properties: ['title', 'description', 'categories', 'questions', 'skillQuestion'],
        rules: {
            title: (survey, title) => !!title,
            description: (survey, description) => !!description,
            questions: (survey, questions) => !!questions && (questions as IQuizQuestion[]).length > 0,
            categories: (survey, categories) => !!categories && (categories as string[]).length > 0,
            skillQuestion: (survey, skillQuestion) => survey.template !== 'skill' || !!skillQuestion,
        },
    })
    private originalQuestionEditing?: IQuizQuestion
    private queryRef?: QueryRef<{ quiz: Partial<IQuiz> }>
    private sub = new Subscription()

    constructor(
        private readonly activatedRoute: ActivatedRoute,
        private readonly surveyService: SurveyService,
        private readonly confirmation: ConfirmationService,
        private readonly nav: NavController,
        private readonly toast: MessageService,
    ) {}

    ionViewDidEnter() {
        this.init().then()
    }

    ionViewDidLeave() {
        this.sub?.unsubscribe()
    }

    save() {
        if (!this.validator.valid) {
            this.validator.check()
            return
        }
        if (this.survey?._id) {
            this.update().then()
            return
        }
        this.create().then()
    }

    addClick() {
        if (
            (this.survey?.template !== 'quiz' && !this.survey?.categories?.length) ||
            (this.survey?.template === 'skill' && !this.skillQuestion)
        )
            return

        this.options = this.survey?.categories?.map((c, i) => ({ name: c, value: i })) ?? []
        if (!this.survey?.questions) this.survey!.questions = []
        const newQuestion: IQuizQuestion = this.getNewQuestion()
        this.questionEditing = newQuestion
        this.originalQuestionEditing = deepCopy(newQuestion)
    }

    editClick(item: IQuizQuestion) {
        this.options = this.survey?.categories?.map((c, i) => ({ name: c, value: i })) ?? []
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
        this.validator.check('questions')
    }

    async templateChosen(template: string) {
        switch (template) {
            case 'template/':
                this.templateDialog = 2
                return
            case 'custom':
                this.survey!.template = 'custom'
                break
            case 'true-false':
                this.survey!.categories = [await translate('FORM_OPERATION.NOTHING')]
                this.survey!.template = template
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

    categoryEditClosing() {
        this.categoryDialog = false
        this.validator.check('categories')
    }

    private getNewQuestion() {
        return {
            _id: this.getNextId(),
            type: !(this.survey?.template === 'custom' || this.survey?.template === 'quiz')
                ? this.survey?.template ?? 'free'
                : '',
            categoryIndex: -1,
            createdAt: new Date(),
            question: this.survey?.template === 'skill' ? this.skillQuestion : '',
            answers: [],
        }
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
                        if (this.survey?.template === 'skill')
                            this.skillQuestion = this.survey?.questions?.[0]?.question ?? ''
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

    private async saveCallback(l: HTMLIonLoadingElement) {
        this.originalSurvey = { ...this.survey }
        this.toast.add({
            severity: 'success',
            summary: await translate('FORM_OPERATION.SUCCESS'),
            detail: await translate('FORM_OPERATION.SUCCESS_DETAIL'),
        })
        l.dismiss().then()
        this.nav.back()
    }

    private getNextId(): number {
        if (!this.survey?.questions) return 0
        return (
            this.survey?.questions
                ?.map((question) => parseInt(question._id))
                .reduce((max, question_id) => Math.max(max, question_id), 0) + 1
        )
    }
}
