import {Component, OnInit} from '@angular/core';
import {RedirectService} from "../../../shared/services/redirect.service";
import {TokenService} from "../../../shared/services/token.service";
import {StorageService} from "../../../shared/services/storage.service";
import {TranslatePipe} from "@ngx-translate/core";
import {pages} from "../../../shared/utils/pages.const";
import {ActivatedRoute, Router} from "@angular/router";
import {IQuiz, IQuizAnswer, IQuizQuestion} from "@szakszolg-nx/api-interfaces";

@Component({
    selector: 'nx12-survey-results',
    templateUrl: './survey-results.page.html',
    styleUrls: ['./survey-results.page.scss'],
})
export class SurveyResultsPage implements OnInit {
    quizType = ''

    points: Array<string> = new Array<string>()

    activeQuiz: IQuiz | undefined = undefined
    answers: IQuizAnswer[] | undefined = undefined

    totalCategoryPoints: number[] = []
    answeredCategoryPoints: number[] = []

    quizCategories: string[] | undefined = []

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
        const points: number[] = []

        if (this.activeQuiz?.template) {
            this.quizType = this.activeQuiz.template

            this.quizCategories = this.activeQuiz?.categories

            if (this.quizType == 'true-false') {
                if (this.activeQuiz.questions) {
                    const firstQuestion = this.activeQuiz.questions[0]
                    if (firstQuestion) {
                        const neutralAnswer = firstQuestion.answers?.find((answer) => {
                            return answer.text == this.translate.transform('QUESTION_STRING.FALSE')
                        })
                        if (neutralAnswer && neutralAnswer.categoryIndex) {
                            this.quizCategories?.splice(neutralAnswer.categoryIndex, 1)

                            this.totalCategoryPoints = []
                            this.answeredCategoryPoints = []

                            if (this.quizCategories?.length && this.quizCategories.length > 0) {
                                for (let i = 0; i < this.quizCategories.length; i++) {
                                    this.totalCategoryPoints.push(0)
                                    this.answeredCategoryPoints.push(0)
                                }
                            }
                        }
                    }
                }
            }

            const categoryCount = this.quizCategories?.length
            if (categoryCount) {
                for (let i = 0; i < categoryCount; i++) {
                    points.push(0)
                }

                const questionCount = this.activeQuiz?.questions?.length
                if (questionCount && this.answers) {
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
                            case 'true-false': {
                                this.calculateTrueFalseAnswers(j, this.answers, this.activeQuiz.questions);
                                break;
                            }
                            default: {
                                console.log('No template')
                            }
                        }
                    }

                    if (this.quizType == 'true-false') {
                        for (let i = 0; i < categoryCount; i++) {
                            const categoryResult = this.answeredCategoryPoints[i] + '/' + this.totalCategoryPoints[i]
                                + ' (' + (this.answeredCategoryPoints[i] / this.totalCategoryPoints[i]) * 100 + '%)'
                            this.points.push(categoryResult)
                        }
                    } else {
                        this.convertNumbersToStrings(points)
                    }
                }
            }
        }
    }

    private calculateSkillAnswers(j: number, points: Array<number>, answers: IQuizAnswer[]) {
        const selectedAnswer = answers[j].answer
        this.activeQuiz?.questions[j].answers?.forEach(answer => {
            if (answer.categoryIndex != null && answer.text == selectedAnswer) {
                points[answer.categoryIndex] += 1
            }
        })
    }

    private calculateRatingAnswers(j: number, points: Array<number>, answers: IQuizAnswer[]) {
        const selectedAnswer = parseInt(answers[j].answer)
        if (this.activeQuiz?.questions[j] != null && this.activeQuiz?.questions[j]?.categoryIndex != null
            && this.activeQuiz?.questions[j]?.type != null) {
            const currentCategory = this.activeQuiz?.questions[j]?.categoryIndex;
            const questionType = this.activeQuiz?.questions[j]?.type
            if (currentCategory != null) {
                const calculatedAnswer = questionType === 'rating-reversed' ? selectedAnswer - 6 : selectedAnswer
                points[currentCategory] += Math.abs(calculatedAnswer)
            }
        }
    }

    private calculateTrueFalseAnswers(j: number, answers: IQuizAnswer[], questions: IQuizQuestion[]) {


        if (questions[j].answers) {
            const firstAnswer = questions[j].answers?.find((answer) => {
                return answer.text == this.translate.transform('QUESTION_STRING.TRUE')
            })
            const categoryId = firstAnswer?.categoryIndex
            if (categoryId != undefined) {
                this.totalCategoryPoints[categoryId] += 1

                if (answers[j].answer == this.translate.transform('QUESTION_STRING.TRUE')) {
                    this.answeredCategoryPoints[categoryId] += 1
                } /*else if (answers[j].answer == this.translate.transform('QUESTION_STRING.FALSE')) {

                    }*/
            }
        }
    }

    private convertNumbersToStrings(points: Array<number>) {
        points.forEach(point => {
            this.points.push(point.toString())
        })
    }

    async backToHome() {
        this.redirect.to(pages.home)
    }
}
