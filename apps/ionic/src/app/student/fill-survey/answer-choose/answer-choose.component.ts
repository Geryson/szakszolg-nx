import { Component, Input, OnInit } from '@angular/core'
import { TokenService } from '../../../../shared/services/token.service'
import { IQuizAnswerOption, IQuizQuestion } from '@szakszolg-nx/api-interfaces'

@Component({
    selector: 'nx12-answer-choose',
    templateUrl: './answer-choose.component.html',
    styleUrls: ['./answer-choose.component.scss'],
})
export class AnswerChooseComponent implements OnInit {
    @Input() quizQuestions: IQuizQuestion[] = []
    constructor(public readonly service: TokenService) {}

    ngOnInit() {}

    next(answer: IQuizAnswerOption) {
        if (this.service.activeQuiz?.questions) {
            if (this.service.index < this.service.activeQuiz.questions.length - 1) {
                this.service.answers[this.service.index].answer = answer.text
                this.service.index++
            }
        }
    }
}
