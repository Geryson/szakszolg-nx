import { Component, OnInit } from '@angular/core'
import { CrudPageClass } from '../../../shared/utils/crud-page.class'
import { IGroupingItem2, IGroupingItem, RESOURCES } from '@szakszolg-nx/api-interfaces'
import { pages } from '../../../shared/utils/pages.const'
import { GroupingItem2Service } from '../../../shared/services/grouping-item2.service'
import { GroupingItemService } from '../../../shared/services/grouping-item.service'

@Component({
    selector: 'nx12-manage-groups2',
    templateUrl: './manage-groups2.page.html',
    styleUrls: ['./manage-groups2.page.scss'],
})
export class ManageGroups2Page
    extends CrudPageClass<IGroupingItem2, { groupingItems2: Partial<IGroupingItem2>[] }>
    implements OnInit
{
    protected editPage = pages.admin.groupingItems2
    protected resourceName = RESOURCES.GROUPING_WORDS2

    constructor(protected readonly resourceService: GroupingItem2Service) {
        super()
    }
}
