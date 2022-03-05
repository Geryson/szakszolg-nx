import { Inject, Injectable } from '@angular/core'
import { APOLLO_CLIENT, TOKENS } from '@szakszolg-nx/shared-module'
import { Apollo, MutationResult } from 'apollo-angular'
import { Observable } from 'rxjs'

@Injectable({
    providedIn: 'root',
})
export class TokenService {
    constructor(@Inject(APOLLO_CLIENT) private readonly apolloClient: Apollo) {}

    create(quizId: string): Observable<MutationResult<{ createToken: { token: string; __typename: 'Token' } }>> {
        return this.apolloClient.mutate<{ createToken: { token: string; __typename: 'Token' } }>({
            mutation: TOKENS.ADD,
            variables: {
                quizId,
            },
        })
    }
}
