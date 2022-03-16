import { Inject, Injectable } from '@angular/core'
import { Apollo, MutationResult } from 'apollo-angular'
import { APOLLO_CLIENT } from '../injector.tokens'
import {IQuizAnswer, IQuizQuestion, IToken} from "@szakszolg-nx/api-interfaces";
import {ANSWERS} from "../graphql/answers.graphql";

@Injectable({
    providedIn: 'root',
})
export class AnswerService {

    constructor(@Inject(APOLLO_CLIENT) private readonly apolloClient: Apollo,) {
    }

    create(answer: string, quizId: string, questionId: number, answeredAt: Date, om: string){
        return this.apolloClient.mutate<{ createQuizAnswer: IQuizAnswer }>({
            mutation: ANSWERS.ADD,
            variables: {
                answer, quizId, questionId, answeredAt, om
            },
            fetchPolicy: 'no-cache'
        })
    }
}
