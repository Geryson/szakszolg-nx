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
        return this.apolloClient.watchQuery<{ hangmanWords: Partial<IHangmanWord>[] }>({
            query: HANGMAN_WORDS.BROWSE,
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
        return this.apolloClient.mutate<{ hangmanWord: Partial<IHangmanWord> }>({
            mutation: HANGMAN_WORDS.DESTROY,
            variables: { id },
        })
    }

    read(id: string) {
        return this.apolloClient.watchQuery<{ hangmanWord: Partial<IHangmanWord> }>({
            query: HANGMAN_WORDS.READ,
            variables: { id },
        })
    }

    browseCategories() {
        return this.apolloClient.watchQuery<{ hangmanWords: Partial<IHangmanWord>[] }>({
            query: HANGMAN_WORDS.BROWSE_CATEGORIES,
        })
    }

    add(category: string, word: string) {
        return this.apolloClient.mutate<{ hangmanWord: Partial<IHangmanWord> }>({
            mutation: HANGMAN_WORDS.ADD,
            variables: { category, word },
        })
    }
}
