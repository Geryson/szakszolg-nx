import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Params } from '@angular/router'
import { IGroupingItem, IHangmanWord } from '@szakszolg-nx/api-interfaces'
import { GroupingItemService } from '../../../../shared/services/grouping-item.service'
import { TranslatePipe } from '@ngx-translate/core'
import { MessageService } from 'primeng/api'
import { NavController } from '@ionic/angular'
import { first, Subscription } from 'rxjs'
import { EmptyObject } from 'apollo-angular/build/types'
import { QueryRef } from 'apollo-angular'
import { Log, omit } from '@szakszolg-nx/shared-module'
import { NG_ICON } from '../../../../shared/utils/prime-icons.class'

@Component({
    selector: 'nx12-manage-single-group',
    templateUrl: './manage-single-group.page.html',
    styleUrls: ['./manage-single-group.page.scss'],
})
export class ManageSingleGroupPage {
    item?: Partial<IGroupingItem>
    originalItem?: Partial<IGroupingItem>
    NG_ICON = NG_ICON
    private readonly sub = new Subscription()
    private queryRef?: QueryRef<{ groupingItem: Partial<IGroupingItem> }, EmptyObject>
    private validationErrors: { [key: string]: string } = {}

    constructor(
        private readonly activatedRoute: ActivatedRoute,
        private readonly groupingItemService: GroupingItemService,
        private readonly translate: TranslatePipe,
        private readonly nav: NavController,
        private readonly toast: MessageService,
    ) {}

    ionViewDidEnter() {
        this.init().then()
    }

    ionViewDidLeave() {
        this.sub.unsubscribe()
    }

    check(prop: keyof IGroupingItem, obj: IGroupingItem) {
        const validation = validations[prop](obj, prop)
        setTimeout(() => {
            if (!validation) this.validationErrors[prop] = this.translate.transform(`USER_EDIT.ERROR.${prop}`)
            // TODO: translate and show on UI
            else this.validationErrors[prop] = ''
        }, 50)
        return !validation
    }

    save() {
        if (this.item?._id) {
            this.update()
            return
        }
        this.create()
    }

    remove(group: string) {
        this.item!.groups = this.item!.groups?.filter((g) => g !== group)
    }

    add(inputElement: HTMLInputElement) {
        if (!inputElement?.value.length) return
        if (!this.item?.groups) this.item!.groups = []
        if (this.item!.groups.includes(inputElement.value)) return
        this.item!.groups.push(inputElement.value)
        inputElement.value = ''
        inputElement.focus()
    }

    markCorrect(group: string) {
        this.item!.correct = group
        this.toast.add({
            severity: 'success',
            summary: group,
            detail: this.translate.transform('MANAGE_GROUPINGS.MARKED_CORRECT'),
        })
    }

    private async init() {
        this.sub.add(
            this.activatedRoute.params.subscribe((params) => {
                if (params.id === 'new') {
                    this.item = {
                        item: '',
                        groups: [],
                        correct: '',
                    }
                    this.originalItem = { ...this.item }
                    return
                }

                this.queryRef = this.groupingItemService.read(params.id)
                this.sub.add(
                    this.queryRef.valueChanges.subscribe(async ({ data }) => {
                        this.item = { ...data.groupingItem }
                        this.originalItem = { ...this.item }
                    }),
                )
            }),
        )
    }

    private create() {
        Log.debug('ManageSingleGroupPage::Create', 'Saving item:', this.item)
        this.groupingItemService
            .add({
                ...this.item,
            })
            .pipe(first())
            .subscribe(() => this.saveCallback())
    }

    private update() {
        this.groupingItemService
            .edit(this.item!._id, omit(this.item!, '_id'))
            .pipe(first())
            .subscribe(() => this.saveCallback())
    }

    private saveCallback() {
        this.originalItem = { ...this.item }
        this.toast.add({
            severity: 'success',
            summary: this.translate.transform('FORM_OPERATION.SUCCESS'),
            detail: this.translate.transform('FORM_OPERATION.SUCCESS_DETAIL'),
        })
        this.nav.back()
    }
}

const validations: { [key: string]: (value: any, attribute: string) => boolean } = {
    item: (value: IGroupingItem) => value.item.length > 0,
    groups: (value: IGroupingItem) => value.groups.length > 0 && value.groups.every((group) => group.length > 0),
    correct: (value: IGroupingItem) => value.correct.length > 0 && value.groups.includes(value.correct),
}
