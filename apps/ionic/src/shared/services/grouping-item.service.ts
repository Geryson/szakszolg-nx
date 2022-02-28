import { Inject, Injectable } from '@angular/core'
import { IGroupingItem } from '@szakszolg-nx/api-interfaces'
import { IResourceService } from '@szakszolg-nx/ng-interfaces'
import { Apollo } from 'apollo-angular'
import { APOLLO_CLIENT, GROUPING_ITEMS } from '@szakszolg-nx/shared-module'

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
    constructor(@Inject(APOLLO_CLIENT) private readonly apolloClient: Apollo) {}

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
}
