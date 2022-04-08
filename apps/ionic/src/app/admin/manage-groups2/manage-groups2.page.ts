import { Component, OnInit } from '@angular/core'
import { CrudPageClass } from '../../../shared/utils/crud-page.class'
import { IGroupingItem, RESOURCES } from '@szakszolg-nx/api-interfaces'
import { pages } from '../../../shared/utils/pages.const'
import { GroupingItemService } from '../../../shared/services/grouping-item.service'

@Component({
    selector: 'nx12-manage-groups2',
    templateUrl: './manage-groups2.page.html',
    styleUrls: ['./manage-groups2.page.scss'],
})
export class ManageGroups2Page
    extends CrudPageClass<IGroupingItem, { groupingItems: Partial<IGroupingItem>[] }>
    implements OnInit
{
    protected editPage = pages.admin.groupingItems2
    protected resourceName = RESOURCES.GROUPING_WORDS

    constructor(protected readonly resourceService: GroupingItemService) {
        super()
    }
}
