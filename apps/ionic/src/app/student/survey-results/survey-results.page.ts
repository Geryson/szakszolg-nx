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

    skillPoints: Array<number> = new Array<number>()

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
        if (this.activeQuiz?.template) {
            this.quizType = this.activeQuiz.template
            switch (this.quizType) {
                case 'skill': {
                    this.calculateSkillResults();
                    break;
                }
                default: {
                    console.log('No template')
                }
            }
        }
    }

    private calculateSkillResults() {
        const points = this.skillPoints

        const categoryCount = this.activeQuiz?.categories?.length
        if (categoryCount) {
            for (let i = 0; i < categoryCount; i++) {
                points.push(0)
            }

            const questionCount = this.activeQuiz?.questions?.length
            if (questionCount && this.answers) {
                for (let j = 0; j < questionCount; j++) {
                    const selectedAnswerText = this.answers[j].answer
                    this.activeQuiz?.questions[j].answers?.forEach(function (answer) {
                        if (answer.categoryIndex != null && answer.text == selectedAnswerText) {
                            points[answer.categoryIndex] += 1
                        }
                    })
                }
            }
        }
    }

    async backToHome() {
        this.redirect.to(pages.home)
    }
}
