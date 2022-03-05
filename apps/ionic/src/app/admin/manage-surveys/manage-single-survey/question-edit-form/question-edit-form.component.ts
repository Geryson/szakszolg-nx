import { Component, EventEmitter, Input, Output } from '@angular/core'
import { IQuizQuestion } from '@szakszolg-nx/api-interfaces'

@Component({
    selector: 'nx12-question-edit-form',
    templateUrl: './question-edit-form.component.html',
    styleUrls: ['./question-edit-form.component.scss'],
})
export class QuestionEditFormComponent {
    @Input() question: Partial<IQuizQuestion> = {}
    @Output() questionChange = new EventEmitter<Partial<IQuizQuestion>>()
    @Output() canceled = new EventEmitter<void>()
    @Output() submitted = new EventEmitter<Partial<IQuizQuestion>>()
    questionTypes = ['free', 'choose', 'choose-multiple', 'rating', 'true-false']

    constructor() {}

    removeAnswer(ans: string) {
        this.question.answers = this.question.answers?.filter((a) => a !== ans)
    }

    addAnswer(newAnswer: HTMLInputElement) {
        if (newAnswer.value && !this.question.answers?.includes(newAnswer.value)) {
            if (!this.question.answers) this.question.answers = []
            this.question.answers.push(newAnswer.value)
            newAnswer.value = ''
            newAnswer.focus()
        }
    }

    markAsCorrect(ans: string) {
        if (this.question.type === 'choose') {
            this.question.correctAnswers = [ans]
            return
        }

        if (!this.question.correctAnswers) this.question.correctAnswers = []
        this.question.correctAnswers.push(ans)
    }

    unMarkAsCorrect(ans: string) {
        if (this.question.type === 'choose') {
            this.question.correctAnswers = []
            return
        }

        this.question.correctAnswers = this.question.correctAnswers?.filter((a) => a !== ans)
    }

    save() {
        this.submitted.emit(this.question)
    }

    cancel() {
        this.question = {}
        this.canceled.emit()
    }
}
