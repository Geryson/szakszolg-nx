import {Component, OnInit} from '@angular/core';
import {TokenService} from "../../../shared/services/token.service";
import {IQuiz, IQuizAnswer, IQuizQuestion} from "@szakszolg-nx/api-interfaces";
import {RedirectService} from "../../../shared/services/redirect.service";
import {pages} from "../../../shared/utils/pages.const";
import {StorageService} from "../../../shared/services/storage.service";
import {STORAGE_KEY} from "../../../shared/utils/constants";

@Component({
    selector: 'nx12-fill-survey',
    templateUrl: './fill-survey.page.html',
    styleUrls: ['./fill-survey.page.scss'],
})
export class FillSurveyPage {

    public questions: IQuizQuestion[] = []

    constructor(public readonly service: TokenService, private readonly redirect: RedirectService,
                private readonly storage: StorageService) {
    }

    ionViewDidEnter() {

        this.storage.get(STORAGE_KEY.SURVEY_INDEX).then(index => {
            if(index){
                this.service.index = index
            }
        })

        this.questions = this.service.activeQuiz?.questions ?? []
        console.log(this.service.activeQuiz)
        if(this.questions.length < 1)
            this.redirect.to(pages.student.enterToken)
        else{
            for (const question of this.questions) {
                this.service.answers?.push({
                    _id: null,
                    createdAt: new Date,

                    quizId: this.service.activeQuiz?._id,
                    questionId: question._id,
                    answer: '',
                    om: this.service.activeOM
                })
            }
            for (const question of this.questions) {
                console.log(question.type)
            }
        }
    }

    log() {
        console.log(this.service.answers)
    }

    async next() {
        if (this.service.index < this.questions.length -1) {
            this.service.index++
            this.storage.set(STORAGE_KEY.SURVEY_INDEX, this.service.index).then()
            //this.storage.set('', this.service.activeQuiz)
            // async const quiz = await this.storage.get<IQuiz>('')
            // sync this.storage.get<IQuiz>('').then(res => {})
        }
    }

    async cancel() {
        delete this.service.token
        this.service.index = 0
        await this.storage.remove(STORAGE_KEY.SURVEY_TOKEN).then()
        await this.storage.remove(STORAGE_KEY.SURVEY_INDEX).then()
        this.redirect.to(pages.student.enterToken)
    }
}
