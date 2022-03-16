import {Component, Input, OnInit} from '@angular/core'
import {TokenService} from '../../../../shared/services/token.service'
import {IQuizAnswerOption, IQuizQuestion} from '@szakszolg-nx/api-interfaces'
import {STORAGE_KEY} from "../../../../shared/utils/constants";
import {StorageService} from "../../../../shared/services/storage.service";
import {AnswerService} from "../../../../shared/services/answer.service";
import {date} from "joi";
import {log} from "util";
import {showLoading} from "../../../../shared/utils/observable.tools";
import {first, firstValueFrom} from "rxjs";

@Component({
    selector: 'nx12-answer-choose',
    templateUrl: './answer-choose.component.html',
    styleUrls: ['./answer-choose.component.scss'],
})
export class AnswerChooseComponent implements OnInit{
    @Input() quizQuestions: IQuizQuestion[] = []
    public finish = false
    correctAnswers=0
    constructor(public readonly service: TokenService, public readonly storage: StorageService, protected readonly sendData: AnswerService) {
    }

    ngOnInit() {
        this.correctAnswers=this.service.index
    }

    ionViewDidLeave(){
        this.finish = false
    }

    async next(answer: IQuizAnswerOption) {
        if(!answer.isCorrect){
            console.log('NEM JÓ')
            this.finish = true
            return
        }
        if (this.service.activeQuiz?.questions && this.service.index < this.service.activeQuiz.questions.length) {
            this.service.answers[this.service.index].answer = answer.text
            await this.storage.set(STORAGE_KEY.SURVEY_ANSWER, this.service.answers).then()
            const promises: Promise<any>[] = []
            if (this.service.index === this.service.activeQuiz.questions.length - 1) {
                const l = await showLoading()
                for (const answerElement of this.service.answers) {
                    console.log(answerElement.questionId)
                    promises.push(firstValueFrom(this.sendData.create(
                            answerElement.answer,
                            answerElement.quizId,
                            answerElement.questionId,
                            answerElement.createdAt,
                            answerElement.om

                        ))
                    )
                }
                await Promise.all(promises)
                l.dismiss().then()
                console.log('Bent vagyok')
                this.correctAnswers=this.service.index
                this.correctAnswers++
                this.finish=true
                return
            }
            this.service.index++
            this.correctAnswers=this.service.index
            await this.storage.set(STORAGE_KEY.SURVEY_INDEX, this.service.index).then()
            console.log('Itt van')
        }
    }
}
