import { Component, OnDestroy, OnInit } from '@angular/core'
import { IPuzzle } from '@szakszolg-nx/api-interfaces'
import { ConfirmationService, SelectItem } from 'primeng/api'
import { TranslatePipe } from '@ngx-translate/core'
import { NG_ICON } from '../../../shared/utils/prime-icons.class'
import { pages } from '../../../shared/utils/pages.const'
import { getImageName, getImageUrl } from '../../../shared/utils/uri.tools'
import { PuzzleService } from '../../../shared/services/puzzle.service'
import { QueryRef } from 'apollo-angular'
import { deepCopy } from '../../../shared/utils/object.tools'
import { firstValueFrom, Subscription } from 'rxjs'
import { presentLoading } from '../../../shared/utils/observable.tools'
import { RedirectService } from '../../../shared/services/redirect.service'

@Component({
    selector: 'nx12-manage-puzzles',
    templateUrl: './manage-puzzles.page.html',
    styleUrls: ['./manage-puzzles.page.scss'],
})
export class ManagePuzzlesPage implements OnInit, OnDestroy {
    getImageUrl = getImageUrl
    getImageName = getImageName
    NG_ICON = NG_ICON
    pages = pages

    puzzles: Partial<IPuzzle>[] = []
    sortOptions: SelectItem[] = []
    sortOrder = 0
    sortField = 'url'

    private queryRef?: QueryRef<{ puzzles: Partial<IPuzzle>[] }>
    private sub?: Subscription

    constructor(
        private readonly service: PuzzleService,
        private readonly translate: TranslatePipe,
        private readonly redirect: RedirectService,
        private readonly confirm: ConfirmationService,
    ) {
        setTimeout(() => {
            ;[
                { label: this.translate.transform('PUZZLE_MANAGEMENT.CREATED_AT'), value: '!createdAt' },
                { label: this.translate.transform('PUZZLE_MANAGEMENT.CREATED_AT_DESC'), value: 'createdAt' },
                { label: this.translate.transform('PUZZLE_MANAGEMENT.NAME'), value: '!path' },
                { label: this.translate.transform('PUZZLE_MANAGEMENT.NAME_DESC'), value: 'path' },
                { label: this.translate.transform('PUZZLE_MANAGEMENT.SIZE'), value: '!size' },
                { label: this.translate.transform('PUZZLE_MANAGEMENT.SIZE_DESC'), value: 'size' },
            ].forEach((o) => this.sortOptions.push(o))
        }, 1000)
    }

    ngOnInit() {
        this.queryRef = this.service.browse()
        this.sub = this.queryRef.valueChanges.subscribe((res) => {
            this.puzzles = deepCopy(res.data.puzzles)
        })
    }

    ionViewDidEnter() {
        this.queryRef?.refetch().then()
    }

    onSortChange(event: any) {
        const value = event.value

        if (value.indexOf('!') === 0) {
            this.sortOrder = -1
            this.sortField = value.substring(1, value.length)
        } else {
            this.sortOrder = 1
            this.sortField = value
        }
    }

    async destroy(item: Partial<IPuzzle>) {
        const loading = await presentLoading()
        firstValueFrom(this.service.destroy(item._id)).then(async () => {
            await this.queryRef?.refetch()
            loading.dismiss().then()
        })
    }

    ngOnDestroy() {
        this.sub?.unsubscribe()
    }

    navigateToScaler(item: IPuzzle) {
        this.service.activePuzzle = deepCopy(item)
        this.redirect.to(`${pages.admin.puzzleImages}/scaler`)
    }
}
