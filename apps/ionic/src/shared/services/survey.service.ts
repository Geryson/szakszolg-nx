import { Inject, Injectable } from '@angular/core'
import { Apollo } from 'apollo-angular'
import { IQuiz, IQuizAnswerOption, IQuizQuestion } from '@szakszolg-nx/api-interfaces'
import { SURVEYS } from '../graphql/surveys.graphql'
import { APOLLO_CLIENT } from '../injector.tokens'
import { deepCopy } from '../utils/object.tools'

@Injectable({
    providedIn: 'root',
})
export class SurveyService {
    constructor(@Inject(APOLLO_CLIENT) private readonly apolloClient: Apollo) {}

    private static transformForGql(data: Partial<Omit<IQuiz, '_id'>>): Partial<Omit<IQuiz, '_id'>> {
        const mutationData = deepCopy(data)
        if (mutationData.questions?.length) {
            mutationData.questions = mutationData.questions.map((question: Partial<IQuizQuestion>) => {
                question.answers = question.answers?.map((answer: Partial<IQuizAnswerOption>) => {
                    delete answer.createdAt
                    delete (answer as any).__typename
                    return answer as IQuizAnswerOption
                })
                delete question.createdAt
                delete (question as any).__typename
                return question
            }) as IQuizQuestion[]
        }
        delete (mutationData as any).__typename
        return mutationData
    }

    browse() {
        return this.apolloClient.watchQuery<{ quizzes: Partial<IQuiz>[] }>({
            query: SURVEYS.BROWSE,
        })
    }

    edit(id: string, data: Partial<Omit<IQuiz, '_id'>>) {
        return this.apolloClient.mutate<{ quiz: Partial<IQuiz> }>({
            mutation: SURVEYS.EDIT,
            variables: { id, ...SurveyService.transformForGql(data) },
        })
    }

    destroy(id: string) {
        return this.apolloClient.mutate<{ quiz: Partial<IQuiz> }>({
            mutation: SURVEYS.DESTROY,
            variables: { id },
        })
    }

    add(data: Partial<Omit<IQuiz, '_id'>>) {
        return this.apolloClient.mutate<{ quiz: Partial<IQuiz> }>({
            mutation: SURVEYS.ADD,
            variables: { ...SurveyService.transformForGql(data) },
        })
    }

    read(id: string) {
        return this.apolloClient.watchQuery<{ quiz: Partial<IQuiz> }>({
            query: SURVEYS.READ,
            variables: { id },
            fetchPolicy: 'no-cache', // This is a hack. Fix it.
        })
    }

    getCategories() {
        return this.apolloClient.watchQuery<{ quizzes: { categories: string[] }[] }>({
            query: SURVEYS.CATEGORIES,
        })
    }
}
