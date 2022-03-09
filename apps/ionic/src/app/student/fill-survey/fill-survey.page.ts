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
export class FillSurveyPage implements OnInit{

    public questions: IQuizQuestion[] = []

    constructor(public readonly service: TokenService, private readonly redirect: RedirectService,
                private readonly storage: StorageService) {
    }

    ionViewDidEnter() {
        this.onEnterInit().then()
    }

    private async onEnterInit() {
        this.storage.get(STORAGE_KEY.SURVEY_INDEX).then(index => {
            if (index) {
                this.service.index = index
            }
        })

        this.storage.get(STORAGE_KEY.SURVEY_ANSWER).then(answer => {
            if (answer) {
                this.service.answers = answer
            }
        })

        this.questions = this.service.activeQuiz?.questions ?? []
        this.questions.sort((a, b) => Math.random() - 0.5)
        console.log(this.service.activeQuiz)

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

    log() {
        console.log(this.service.answers)
    }

    async next() {
        if (this.service.index < this.questions.length -1) {
            this.service.index++
            this.storage.set(STORAGE_KEY.SURVEY_INDEX, this.service.index).then()
            this.storage.set(STORAGE_KEY.SURVEY_ANSWER, this.service.answers).then()
        }
    }

    async cancel() {
        delete this.service.token
        this.service.index = 0
        await this.storage.remove(STORAGE_KEY.SURVEY_TOKEN).then()
        await this.storage.remove(STORAGE_KEY.SURVEY_INDEX).then()
        await this.storage.remove(STORAGE_KEY.SURVEY_ANSWER).then()
        this.redirect.to(pages.student.enterToken)
    }

    ngOnInit() {
        if(!this.service.activeQuiz)
            this.redirect.to(pages.student.enterToken)
    }
}
