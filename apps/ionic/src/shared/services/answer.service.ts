import { Inject, Injectable } from '@angular/core'
import { Apollo, MutationResult } from 'apollo-angular'
import { APOLLO_CLIENT } from '../injector.tokens'
import {ICreateQuizAnswerInput, IQuizAnswer, IQuizQuestion, IToken} from "@szakszolg-nx/api-interfaces"
import {ANSWERS} from "../graphql/answers.graphql"

@Injectable({
    providedIn: 'root',
})
export class AnswerService {

    constructor(@Inject(APOLLO_CLIENT) private readonly apolloClient: Apollo,) {
    }

    create(answer: string, quizId: string, questionId: number, answeredAt: Date, om: string, isCorrect: boolean, token: string){
        return this.apolloClient.mutate<{ createQuizAnswer: IQuizAnswer }>({
            mutation: ANSWERS.ADD,
            variables: {
                answer, quizId, questionId, answeredAt, om, isCorrect,token
            },
            fetchPolicy: 'no-cache'
        })
    }
    create2(answers: ICreateQuizAnswerInput[]){
        return this.apolloClient.mutate<{ createManyQuizAnswers: IQuizAnswer[] }>({
            mutation: ANSWERS.ADD2,
            variables: { answers },
            fetchPolicy: 'no-cache'
        })
    }
}
