import { Component, EventEmitter, Input, Output } from '@angular/core'
import { IQuizQuestion } from '@szakszolg-nx/api-interfaces'
import { TranslatePipe } from '@ngx-translate/core'

@Component({
    selector: 'nx12-question-edit-form',
    templateUrl: './question-edit-form.component.html',
    styleUrls: ['./question-edit-form.component.scss'],
})
export class QuestionEditFormComponent {
    @Input() template = ''
    @Input() categories: string[] = []
    @Input() question!: IQuizQuestion
    @Output() questionChange = new EventEmitter<IQuizQuestion>()
    @Output() canceled = new EventEmitter<void>()
    @Output() submitted = new EventEmitter<IQuizQuestion>()
    questionTypes = ['free', 'choose', 'rating', 'true-false']
    validationErrors: { [key: string]: string } = {}
    options: { name: string; value: number }[] = []

    constructor(private readonly translate: TranslatePipe) {}

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

    check() {
        if (this.question.question?.length) delete this.validationErrors.question
        else this.validationErrors.question = this.translate.transform('MANAGE_QUESTIONS.ERRORS.QUESTION_EMPTY')

        switch (this.question.type) {
            case 'skill':
                if (this.question.answers?.length) delete this.validationErrors.answers
                else this.validationErrors.answers = this.translate.transform('MANAGE_QUESTIONS.ERRORS.NO_ANSWERS')
                break
            case 'choose':
            case 'true-false':
                if (this.question.answers?.length) delete this.validationErrors.answers
                else this.validationErrors.answers = this.translate.transform('MANAGE_QUESTIONS.ERRORS.NO_ANSWERS')
                break
        }
    }

    populateCategories() {
        this.options = this.categories.map((c, i) => ({ name: c, value: i }))
    }
}
