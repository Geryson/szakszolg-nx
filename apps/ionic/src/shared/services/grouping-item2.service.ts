import { Inject, Injectable } from '@angular/core'
import {IGroupingItem2, IHangmanWord} from '@szakszolg-nx/api-interfaces'
import { IResourceService } from '@szakszolg-nx/ng-interfaces'
import { Apollo } from 'apollo-angular'
import { APOLLO_CLIENT } from '../injector.tokens'
import {GROUPING_ITEMS2} from '../graphql/grouping-items2.graphql'
import {firstValueFrom} from "rxjs"
import {api} from "../utils/uri.tools"
import {HttpClient} from "@angular/common/http"
import {HANGMAN_WORDS} from "../graphql/hangman-words.graphql";

@Injectable({
    providedIn: 'root',
})
export class GroupingItem2Service
    implements
        IResourceService<
            IGroupingItem2,
            { groupingItems2: Partial<IGroupingItem2>[] },
            { groupingItem2: Partial<IGroupingItem2> }
        >
{
    constructor(@Inject(APOLLO_CLIENT) private readonly apolloClient: Apollo, private readonly http: HttpClient) {}

    browse() {
        return this.apolloClient.watchQuery<{ groupingItems2: Partial<IGroupingItem2>[] }>({
            query: GROUPING_ITEMS2.BROWSE,
        })
    }

    browseByCategory(category: string){
        return this.apolloClient.watchQuery<{ groupingItem2: Partial<IGroupingItem2> }>({
            query: GROUPING_ITEMS2.BROWSE_BY_CATEGORY,
            variables: { category },
        })
    }

    browseCategories() {
        return this.apolloClient.watchQuery<{ groupingItem2: Partial<IGroupingItem2> }>({
            query: GROUPING_ITEMS2.BROWSE_CATEGORIES,
        })
    }

    destroy(id: string) {
        return this.apolloClient.mutate<{ groupingItem2: Partial<IGroupingItem2> }>({
            mutation: GROUPING_ITEMS2.DESTROY,
            variables: { id },
        })
    }

    edit(id: string, data: Partial<Omit<IGroupingItem2, '_id'>>) {
        return this.apolloClient.mutate<{ groupingItem2: Partial<IGroupingItem2> }>({
            mutation: GROUPING_ITEMS2.EDIT,
            variables: { id, ...data },
        })
    }

    random() {
        return this.apolloClient.watchQuery<{ groupingItem2: Partial<IGroupingItem2> }>({
            query: GROUPING_ITEMS2.RANDOM,
        })
    }

    read(id: string) {
        return this.apolloClient.watchQuery<{ groupingItem2: Partial<IGroupingItem2> }>({
            query: GROUPING_ITEMS2.READ,
            variables: { id },
        })
    }

    add(data: Partial<Omit<IGroupingItem2, '_id'>>) {
        return this.apolloClient.mutate<{ groupingItem2: Partial<IGroupingItem2> }>({
            mutation: GROUPING_ITEMS2.ADD,
            variables: { ...data },
        })
    }

    async addImage(uploadedFiles: File[]) {
        const formData = new FormData()
        uploadedFiles.forEach((file) => formData.append('image', file))
        return firstValueFrom(
            this.http.post<
                {
                    originalName: string
                    filename: string
                }[]
                >(api('api/grouping-items2'), formData),
        )
    }
}
