import {Component, OnInit} from '@angular/core';
import {TokenService} from "../../../shared/services/token.service";
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

    constructor(public readonly service: TokenService, private readonly redirect: RedirectService,
                private readonly storage: StorageService) {
    }

    ionViewDidEnter() {
        this.onEnterInit().then()
    }

    private async onEnterInit() {
        await this.storage.get(STORAGE_KEY.SURVEY_INDEX).then(index => {
            if (!index) {
                return;
            }
            this.service.index = index
        })

        await this.storage.get(STORAGE_KEY.SURVEY_QUESTIONS).then(questions => {
            if (!questions) {
                return;
            }
            this.service.questions = questions
        })

        await this.storage.get(STORAGE_KEY.SURVEY_ANSWER).then(answer => {
            if (answer) {
                this.service.answers = answer
            }
        })

        await this.storage.get(STORAGE_KEY.EDU_ID).then(edu_id => {
            if (edu_id) {
                this.service.activeOM = edu_id
            }
        })

        if (this.service.activeQuiz?.template !== 'quiz' && this.service.index < 1) {

            this.service.questions = this.service.activeQuiz?.questions.sort((a, b) =>
                Math.random() - 0.5) ?? []
            this.storage.set(STORAGE_KEY.SURVEY_QUESTIONS, this.service.questions).then()
        }
        if (this.service.activeQuiz?.template === 'quiz'){
            this.service.questions = this.service.activeQuiz?.questions ?? []
            this.storage.set(STORAGE_KEY.SURVEY_QUESTIONS, this.service.questions).then()
        }

        if(this.service.answers.length !== this.service.questions.length) {
            for (const question of this.service.questions) {
                this.service.answers?.push({
                    _id: null,
                    createdAt: new Date,
                    answeredAt: new Date,
                    quizId: this.service.activeQuiz?._id,
                    questionId: question._id,
                    answer: '',
                    om: this.service.activeOM
                })
            }
        }
    }

    log() {
        console.log(this.service.answers)
    }

    async next() {
        if (this.service.index >= this.service.questions.length - 1) {
            console.log('oh shit')
            return
        }

        this.service.index++
        this.storage.set(STORAGE_KEY.SURVEY_INDEX, this.service.index).then()
        this.storage.set(STORAGE_KEY.SURVEY_ANSWER, this.service.answers).then()
    }

    ngOnInit() {
        if(!this.service.activeQuiz)
            this.redirect.to(pages.student.enterToken)
    }

    back() {
        if (this.service.index <= 0) {
            return;
        }
        this.service.index--
        this.storage.set(STORAGE_KEY.SURVEY_INDEX, this.service.index).then()
    }
    ionViewDidLeave(){
        this.service.answers = []
    }

    submit() {
        this.storage.set(STORAGE_KEY.SURVEY_ANSWER, this.service.answers).then()
        this.service.end = true
        //this.service.answers = []
    }
}
