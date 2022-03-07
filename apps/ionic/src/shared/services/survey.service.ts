import { Inject, Injectable } from '@angular/core'
import { Apollo } from 'apollo-angular'
import { IQuiz } from '@szakszolg-nx/api-interfaces'
import { SURVEYS } from '../graphql/surveys.graphql'
import { APOLLO_CLIENT } from '../injector.tokens'
import { deepCopy } from '../utils/object.tools'

@Injectable({
    providedIn: 'root',
})
export class SurveyService {
    constructor(@Inject(APOLLO_CLIENT) private readonly apolloClient: Apollo) {}

    private static transformForGql(data: Partial<Omit<IQuiz, '_id'>>, includeId = false): Partial<Omit<IQuiz, '_id'>> {
        const mutationData: any = deepCopy(data)
        if (mutationData.questions?.length) {
            mutationData.questions = mutationData.questions.map((question: IQuiz | any, index: number) => {
                if (includeId) question.id = question._id ?? `${index}`

                delete question._id
                delete question.createdAt
                delete question.__typename
                return question
            })
        }
        delete mutationData.__typename
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
            variables: { id, ...SurveyService.transformForGql(data, true) },
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
        })
    }

    getCategories() {
        return this.apolloClient.watchQuery<{ quizzes: { categories: string[] }[] }>({
            query: SURVEYS.CATEGORIES,
        })
    }
}
