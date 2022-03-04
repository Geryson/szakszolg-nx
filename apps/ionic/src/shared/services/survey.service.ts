import { Inject, Injectable } from '@angular/core'
import { APOLLO_CLIENT, HANGMAN_WORDS, SURVEYS } from '@szakszolg-nx/shared-module'
import { Apollo } from 'apollo-angular'
import { IHangmanWord, IQuiz } from '@szakszolg-nx/api-interfaces'

@Injectable({
    providedIn: 'root',
})
export class SurveyService {
    constructor(@Inject(APOLLO_CLIENT) private readonly apolloClient: Apollo) {}

    browse() {
        return this.apolloClient.watchQuery<{ quizzes: Partial<IQuiz>[] }>({
            query: SURVEYS.BROWSE,
        })
    }

    random() {
        return this.apolloClient.watchQuery<{ hangmanWord: Partial<IHangmanWord> }>({
            query: HANGMAN_WORDS.RANDOM,
        })
    }

    edit(id: string, data: Partial<Omit<IHangmanWord, '_id'>>) {
        return this.apolloClient.mutate<{ hangmanWord: Partial<IHangmanWord> }>({
            mutation: HANGMAN_WORDS.EDIT,
            variables: { id, ...data },
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
            variables: { ...data },
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
