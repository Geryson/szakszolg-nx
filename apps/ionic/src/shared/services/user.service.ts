import { Inject, Injectable } from '@angular/core'
import { Apollo } from 'apollo-angular'
import { IUser } from '@szakszolg-nx/api-interfaces'
import { APOLLO_CLIENT } from '../injector.tokens'
import { USERS } from '../graphql/users.graphql'
import { Log } from '../utils/log.tools'

@Injectable({
    providedIn: 'root',
})
export class UserService {
    constructor(@Inject(APOLLO_CLIENT) readonly apolloClient: Apollo) {}

    browse() {
        return this.apolloClient.watchQuery<{ users: Partial<IUser>[] }>({
            query: USERS.BROWSE,
        })
    }

    read(id: string) {
        return this.apolloClient.watchQuery<{ user: Partial<IUser> }>({
            query: USERS.READ,
            variables: { id },
        })
    }

    edit(id: string, data: Partial<Omit<IUser, '_id'>>) {
        if (data.roles && typeof data.roles[0] !== 'string') {
            data.roles = data.roles.map((role) => role._id)
        }
        return this.apolloClient.mutate<{ user: Partial<IUser> }>({
            mutation: USERS.EDIT,
            variables: { id, ...data },
        })
    }

    destroy(id: string) {
        return this.apolloClient.mutate<{ user: Partial<Omit<IUser, '_id'>> }>({
            mutation: USERS.DESTROY,
            variables: { id },
        })
    }
}
