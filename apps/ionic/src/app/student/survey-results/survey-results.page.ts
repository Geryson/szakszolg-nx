import {Component, OnInit} from '@angular/core';
import {RedirectService} from "../../../shared/services/redirect.service";
import {TokenService} from "../../../shared/services/token.service";
import {StorageService} from "../../../shared/services/storage.service";
import {TranslatePipe} from "@ngx-translate/core";
import {pages} from "../../../shared/utils/pages.const";
import {ActivatedRoute, Router} from "@angular/router";
import {IQuiz, IQuizAnswer} from "@szakszolg-nx/api-interfaces";

@Component({
    selector: 'nx12-survey-results',
    templateUrl: './survey-results.page.html',
    styleUrls: ['./survey-results.page.scss'],
})
export class SurveyResultsPage implements OnInit {
    quizType = ''

    points: Array<number> = new Array<number>()

    activeQuiz: IQuiz | undefined = undefined
    answers: IQuizAnswer[] | undefined = undefined

    constructor(public readonly service: TokenService, private readonly redirect: RedirectService,
                private readonly storage: StorageService, private readonly translate: TranslatePipe,
                private route: ActivatedRoute, private router: Router) {
        this.route.queryParams.subscribe(() => {
            if (this.router.getCurrentNavigation()?.extras.state) {
                this.activeQuiz = this.router.getCurrentNavigation()?.extras.state?.activeQuiz
                this.answers = this.router.getCurrentNavigation()?.extras.state?.answers
            }
        })
    }

    ngOnInit() {
        const points = this.points

        const categoryCount = this.activeQuiz?.categories?.length
        if (categoryCount) {
            for (let i = 0; i < categoryCount; i++) {
                points.push(0)
            }

            const questionCount = this.activeQuiz?.questions?.length
            if (questionCount && this.answers && this.activeQuiz?.template) {
                this.quizType = this.activeQuiz.template
                for (let j = 0; j < questionCount; j++) {
                    switch (this.quizType) {
                        case 'skill': {
                            this.calculateSkillAnswers(j, points, this.answers);
                            break;
                        }
                        case 'rating': {
                            this.calculateRatingAnswers(j, points, this.answers);
                            break;
                        }
                        default: {
                            console.log('No template')
                        }
                    }
                }
            }
        }
    }

    private calculateSkillAnswers(j: number, points: Array<number>, answers: IQuizAnswer[]) {
        const selectedAnswer = answers[j].answer
        this.activeQuiz?.questions[j].answers?.forEach(function (answer) {
            if (answer.categoryIndex != null && answer.text == selectedAnswer) {
                points[answer.categoryIndex] += 1
            }
        })
    }

    private calculateRatingAnswers(j: number, points: Array<number>, answers: IQuizAnswer[]) {
        const selectedAnswer = parseInt(answers[j].answer)
        if (this.activeQuiz?.questions[j] != null && this.activeQuiz?.questions[j]?.categoryIndex != null) {
            const currentCategory = this.activeQuiz?.questions[j]?.categoryIndex;
            if (currentCategory != null) {
                points[currentCategory] += selectedAnswer
            }
        }
    }
    async backToHome() {
        this.redirect.to(pages.home)
    }
}
