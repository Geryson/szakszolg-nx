import { Inject, Injectable } from '@angular/core'
import { Apollo } from 'apollo-angular'
import { IMirrorWord } from '@szakszolg-nx/api-interfaces'
import { APOLLO_CLIENT, MIRROR_WORDS } from '@szakszolg-nx/shared-module'

@Injectable({
    providedIn: 'root',
})
export class MirrorWordService {
    constructor(@Inject(APOLLO_CLIENT) private readonly apolloClient: Apollo) {}

    browse() {
        return this.apolloClient.watchQuery<{ mirrorWords: Partial<IMirrorWord>[] }>({
            query: MIRROR_WORDS.BROWSE,
        })
    }

    random() {
        return this.apolloClient.watchQuery<{ mirrorWord: Partial<IMirrorWord> }>({
            query: MIRROR_WORDS.RANDOM,
        })
    }

    edit(id: string, word: string) {
        return this.apolloClient.mutate<{ mirrorWord: Partial<IMirrorWord> }>({
            mutation: MIRROR_WORDS.EDIT,
            variables: {
                id,
                word,
            },
        })
    }

    add(word: string) {
        return this.apolloClient.mutate<{ mirrorWord: Partial<IMirrorWord> }>({
            mutation: MIRROR_WORDS.ADD,
            variables: {
                word,
            },
        })
    }

    destroy(id: string) {
        return this.apolloClient.mutate<{ mirrorWord: Partial<IMirrorWord> }>({
            mutation: MIRROR_WORDS.DESTROY,
            variables: {
                id,
            },
        })
    }
}
