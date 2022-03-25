import { Component, Input, OnInit } from '@angular/core'
import { TokenService } from '../../../../shared/services/token.service'
import { IQuizAnswerOption, IQuizQuestion } from '@szakszolg-nx/api-interfaces'
import { STORAGE_KEY } from '../../../../shared/utils/constants'
import { StorageService } from '../../../../shared/services/storage.service'
import { AnswerService } from '../../../../shared/services/answer.service'
import { date } from 'joi'
import { log } from 'util'
import { presentLoading } from '../../../../shared/utils/observable.tools'
import { first, firstValueFrom } from 'rxjs'
import { pages } from '../../../../shared/utils/pages.const'
import { RedirectService } from '../../../../shared/services/redirect.service'

@Component({
    selector: 'nx12-answer-choose',
    templateUrl: './answer-choose.component.html',
    styleUrls: ['./answer-choose.component.scss'],
})
export class AnswerChooseComponent implements OnInit {
    @Input() quizQuestions: IQuizQuestion[] = []
    public finish = false
    correctAnswers = 0
    constructor(
        public readonly service: TokenService,
        public readonly storage: StorageService,
        private readonly redirect: RedirectService,
    ) {}

    ngOnInit() {
        this.service.save=false
        this.correctAnswers=this.service.index
    }

    ionViewDidLeave() {
        this.finish = false
        this.service.save = false
    }

    async next(answer: IQuizAnswerOption) {
        if (this.service.activeQuiz?.questions && this.service.index < this.service.activeQuiz.questions.length) {
            this.service.answers[this.service.index].answer = answer.text
            if (this.service.activeQuiz.template === 'quiz')
                this.service.answers[this.service.index].isCorrect = answer.isCorrect
            await this.storage.set(STORAGE_KEY.SURVEY_ANSWER, this.service.answers).then()
            if(this.service.activeQuiz.template==='quiz' && !answer.isCorrect){
                this.finish = true
                this.service.save = true
                return
            }
            if (this.service.index === this.service.activeQuiz.questions.length - 1) {

                this.correctAnswers=this.service.index
                this.correctAnswers++
                this.service.save=true
                this.finish=true
                this.service.end =  true
                return
            }
            this.service.index++
            this.correctAnswers = this.service.index
            await this.storage.set(STORAGE_KEY.SURVEY_INDEX, this.service.index).then()
        }
    }

    async exit() {
        await this.service.cancel()
        this.redirect.to(pages.home)
    }
}
