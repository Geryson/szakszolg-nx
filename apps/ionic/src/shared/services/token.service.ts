import { Inject, Injectable } from '@angular/core'
import { Apollo, MutationResult } from 'apollo-angular'
import { Observable } from 'rxjs'
import { APOLLO_CLIENT } from '../injector.tokens'
import { TOKENS } from '../graphql/tokens.graphql'
import {IQuiz, IToken} from "@szakszolg-nx/api-interfaces";

@Injectable({
    providedIn: 'root',
})
export class TokenService {
    activeQuiz?: IQuiz;
    constructor(@Inject(APOLLO_CLIENT) private readonly apolloClient: Apollo) {}

    create(quizId: string): Observable<MutationResult<{ createToken: { token: string; __typename: 'Token' } }>> {
        return this.apolloClient.mutate<{ createToken: { token: string; __typename: 'Token' } }>({
            mutation: TOKENS.ADD,
            variables: {
                quizId,
            },
        })
    }
    read(token: string){
        return this.apolloClient.watchQuery<{token: Partial<IToken>}>({
            query: TOKENS.READ,
            variables: {token}
        })
    }
}
