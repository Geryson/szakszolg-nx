import { Inject, Injectable } from '@angular/core'
import { APOLLO_CLIENT } from '@szakszolg-nx/shared-module'
import { Apollo } from 'apollo-angular'
import { HANGMAN_WORDS } from '../../../../../libs/shared-module/src/lib/graphql/hangman-words.graphql'
import { IHangmanWord } from '@szakszolg-nx/api-interfaces'

@Injectable({
    providedIn: 'root',
})
export class HangmanWordService {
    constructor(@Inject(APOLLO_CLIENT) private readonly apolloClient: Apollo) {}

    browse() {
        return this.apolloClient.watchQuery({
            query: HANGMAN_WORDS.BROWSE,
        })
    }

    random() {
        return this.apolloClient.watchQuery({
            query: HANGMAN_WORDS.RANDOM,
        })
    }

    edit(id: string, data: Partial<Omit<IHangmanWord, '_id'>>) {
        return this.apolloClient.mutate<{ user: Partial<IHangmanWord> }>({
            mutation: HANGMAN_WORDS.EDIT,
            variables: { id, ...data },
        })
    }

    destroy(id: string) {
        return this.apolloClient.mutate<{ user: Partial<IHangmanWord> }>({
            mutation: HANGMAN_WORDS.DESTROY,
            variables: { id },
        })
    }
}
