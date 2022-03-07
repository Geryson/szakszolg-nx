import { Inject, Injectable } from '@angular/core'
import { Apollo } from 'apollo-angular'
import { ISchool } from '@szakszolg-nx/api-interfaces'
import { APOLLO_CLIENT } from '../injector.tokens'
import { SCHOOLS } from '../graphql/schools.graphql'

@Injectable()
export class SchoolService {
    constructor(@Inject(APOLLO_CLIENT) private readonly apolloClient: Apollo) {}

    browse() {
        return this.apolloClient.watchQuery<{ schools: Partial<ISchool>[] }>({
            query: SCHOOLS.BROWSE,
        })
    }

    edit(id: string, data: Partial<Omit<ISchool, '_id'>>) {
        return this.apolloClient.mutate<{ school: Partial<ISchool> }>({
            mutation: SCHOOLS.EDIT,
            variables: { id, ...data },
        })
    }

    destroy(id: string) {
        return this.apolloClient.mutate<{ school: Partial<ISchool> }>({
            mutation: SCHOOLS.DESTROY,
            variables: { id },
        })
    }

    read(id: string) {
        return this.apolloClient.watchQuery<{ school: Partial<ISchool> }>({
            query: SCHOOLS.READ,
            variables: { id },
        })
    }

    add(om: string, name: string, address: string, county: string, types: [string]) {
        return this.apolloClient.mutate<{ school: Partial<ISchool> }>({
            mutation: SCHOOLS.ADD,
            variables: { om, name, address, county, types },
        })
    }
}
