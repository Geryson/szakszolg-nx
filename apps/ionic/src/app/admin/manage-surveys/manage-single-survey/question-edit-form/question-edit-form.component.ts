import { Component, EventEmitter, Input, Output } from '@angular/core'
import { IQuizAnswerOption, IQuizQuestion } from '@szakszolg-nx/api-interfaces'
import { TranslatePipe } from '@ngx-translate/core'
import { Log } from '../../../../../shared/utils/log.tools'
import { Validator } from '../../../../../shared/utils/translation.tools'

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
    validator = new Validator<IQuizQuestion>({
        subjectFactory: () => this.question || {},
        translationKey: 'MANAGE_QUESTIONS',
        properties: ['question', 'type', 'answers'],
        rules: {
            question: (subject, value) => (value as string).length > 0,
            type: (subject, value) => this.questionTypes.includes(value as string),
            answers: (subject, value) => {
                const answers = value as IQuizAnswerOption[]
                if (answers.length === 0) return false

                return true
            },
        },
    })

    constructor(private readonly translate: TranslatePipe) {
        setTimeout(() => {
            Log.debug('QuestionEditFormComponent', 'constructor', 'options', this.options)
        }, 2000)
    }

    removeAnswer(ans: string) {
        this.question.answers = this.question.answers?.filter((a) => a.text !== ans)
    }

    addAnswer(newAnswerInput: HTMLInputElement) {
        if (newAnswerInput.value) {
            if (!this.question.answers) this.question.answers = []
            this.question.answers.push({
                _id: this.question.answers.length,
                text: newAnswerInput.value,
                categoryIndex: undefined,
                isCorrect: false,
                createdAt: new Date(),
            })
            newAnswerInput.value = ''
            newAnswerInput.focus()
        }
    }

    markAsCorrect(ans: string) {}

    unMarkAsCorrect(ans: string) {}

    save() {
        this.submitted.emit(this.question)
    }

    cancel() {
        this.canceled.emit()
    }

    log($event: Event) {
        Log.debug('QuestionEditFormComponent', 'event', $event)
    }
}
