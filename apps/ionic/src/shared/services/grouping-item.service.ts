import { Inject, Injectable } from '@angular/core'
import { IGroupingItem } from '@szakszolg-nx/api-interfaces'
import { IResourceService } from '@szakszolg-nx/ng-interfaces'
import { Apollo } from 'apollo-angular'
import { APOLLO_CLIENT } from '../injector.tokens'
import { GROUPING_ITEMS } from '../graphql/grouping-items.graphql'
import {firstValueFrom} from "rxjs";
import {api} from "../utils/uri.tools";
import {HttpClient} from "@angular/common/http";

@Injectable({
    providedIn: 'root',
})
export class GroupingItemService
    implements
        IResourceService<
            IGroupingItem,
            { groupingItems: Partial<IGroupingItem>[] },
            { groupingItem: Partial<IGroupingItem> }
        >
{
    constructor(@Inject(APOLLO_CLIENT) private readonly apolloClient: Apollo, private readonly http: HttpClient) {}

    browse() {
        return this.apolloClient.watchQuery<{ groupingItems: Partial<IGroupingItem>[] }>({
            query: GROUPING_ITEMS.BROWSE,
        })
    }

    destroy(id: string) {
        return this.apolloClient.mutate<{ groupingItem: Partial<IGroupingItem> }>({
            mutation: GROUPING_ITEMS.DESTROY,
            variables: { id },
        })
    }

    edit(id: string, data: Partial<Omit<IGroupingItem, '_id'>>) {
        return this.apolloClient.mutate<{ groupingItem: Partial<IGroupingItem> }>({
            mutation: GROUPING_ITEMS.EDIT,
            variables: { id, ...data },
        })
    }

    random() {
        return this.apolloClient.watchQuery<{ groupingItem: Partial<IGroupingItem> }>({
            query: GROUPING_ITEMS.RANDOM,
        })
    }

    read(id: string) {
        return this.apolloClient.watchQuery<{ groupingItem: Partial<IGroupingItem> }>({
            query: GROUPING_ITEMS.READ,
            variables: { id },
        })
    }

    add(data: Partial<Omit<IGroupingItem, '_id'>>) {
        return this.apolloClient.mutate<{ groupingItem: Partial<IGroupingItem> }>({
            mutation: GROUPING_ITEMS.ADD,
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
                >(api('api/grouping-items'), formData),
        )
    }
}
