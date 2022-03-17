import { Component, EventEmitter, Input, Output } from '@angular/core'
import { IQuizAnswerOption, IQuizQuestion } from '@szakszolg-nx/api-interfaces'
import { TranslatePipe } from '@ngx-translate/core'
import { Validator } from '../../../../../shared/utils/translation.tools'
import { Log } from '../../../../../shared/utils/log.tools'

@Component({
    selector: 'nx12-question-edit-form',
    templateUrl: './question-edit-form.component.html',
    styleUrls: ['./question-edit-form.component.scss'],
})
export class QuestionEditFormComponent {
    @Input() template = ''
    @Input() question!: IQuizQuestion
    @Output() questionChange = new EventEmitter<IQuizQuestion>()
    @Output() canceled = new EventEmitter<void>()
    @Output() submitted = new EventEmitter<IQuizQuestion>()
    questionTypes = ['free', 'choose', 'rating', 'true-false']
    @Input() options: { name: string; value: number }[] = []
    validator = new Validator<IQuizQuestion>()
    trueFalseAnswer: any

    constructor(private readonly translate: TranslatePipe) {
        setTimeout(() => {
            Log.debug('QuestionEditFormComponent::constructor()', 'template', this.template)
            switch (this.template) {
                case 'true-false':
                    this.question.type = 'true-false'
                    break
                case 'quiz':
                    this.question.type = 'choose'
                    break
            }
        }, 100)
    }

    get templateKey() {
        return this.template.toUpperCase()
    }

    initValidator() {
        this.validator.init({
            subjectFactory: () => this.question || {},
            translationKey: 'MANAGE_QUESTIONS',
            properties: ['question', 'type', 'answers'],
            rules: {
                question: (subject, value) => (value as string).length > 0,
                type: (subject, value) => this.questionTypes.includes(value as string),
                answers: (subject, value) => {
                    const answers = value as IQuizAnswerOption[]
                    if (answers.length === 0) return false

                    if (this.template === 'quiz') {
                        return answers.length === 4 && answers.filter((a) => a.isCorrect).length === 1
                    }

                    switch (subject.type) {
                        case 'choose':
                            return answers.length > 2
                        case 'skill':
                            return answers.length === 2
                    }

                    return true
                },
            },
        })
    }

    removeAnswer(ans: IQuizAnswerOption) {
        this.question.answers = this.question.answers?.filter((a) => a._id !== ans._id)
        this.validator.check('answers')
    }

    addAnswer(newAnswerInput: HTMLInputElement) {
        if (!newAnswerInput.value) return
        if (this.question.type === 'skill' && (this.question.answers?.length ?? 0) > 1) return
        if (!this.question.answers) this.question.answers = []

        this.question.answers.push({
            _id: this.question.answers.length,
            text: newAnswerInput.value,
            categoryIndex: 0,
            isCorrect: false,
            createdAt: new Date(),
        })
        newAnswerInput.value = ''
        newAnswerInput.focus()
        this.validator.check('answers')
    }

    markAsCorrect(ans: IQuizAnswerOption) {
        this.question.answers?.forEach((a) => (a.isCorrect = false))
        ans.isCorrect = true
        this.validator.check('answers')
    }

    unMarkAsCorrect(ans: IQuizAnswerOption) {
        ans.isCorrect = false
        this.validator.check('answers')
    }

    save() {
        if (
            !this.question?.question ||
            !this.question.type ||
            (this.question.type !== 'rating' && this.question.type !== 'free' && !this.question.answers?.length) ||
            (this.question.type === 'skill' && this.question.answers?.length !== 2)
        ) {
            this.validator.check()
            return
        }
        this.submitted.emit(this.question)
    }

    cancel() {
        this.canceled.emit()
    }

    questionTypeChanged($event: { originalEvent?: Event; value: string }) {
        switch ($event.value) {
            case 'rating':
            case 'free':
                this.question.answers = []
                break
            case 'choose':
                this.question.answers = []
                break
            case 'true-false':
                this.question.answers = [
                    {
                        _id: 0,
                        text: this.translate.transform('FORM_OPERATION.TRUE'),
                        isCorrect: false,
                        createdAt: new Date(),
                    },
                    {
                        _id: 1,
                        text: this.translate.transform('FORM_OPERATION.FALSE'),
                        isCorrect: false,
                        createdAt: new Date(),
                    },
                ]
        }
    }
}
