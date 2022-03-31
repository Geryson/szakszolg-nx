/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Component } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { IGroupingItem } from '@szakszolg-nx/api-interfaces'
import { GroupingItemService } from '../../../../shared/services/grouping-item.service'
import { TranslatePipe } from '@ngx-translate/core'
import { MessageService } from 'primeng/api'
import { NavController } from '@ionic/angular'
import {first, firstValueFrom, Subscription} from 'rxjs'
import { QueryRef } from 'apollo-angular'
import { NG_ICON } from '../../../../shared/utils/prime-icons.class'
import { Log } from '../../../../shared/utils/log.tools'
import { omit } from '../../../../shared/utils/object.tools'
import {presentLoading} from "../../../../shared/utils/observable.tools";

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
    private queryRef?: QueryRef<{ groupingItem: Partial<IGroupingItem> }>
    private validationErrors: { [key: string]: string } = {}
    selectedAnswerFormat: any
    selectedItemFormat: any;
    options = ['Szöveg', 'Kép']
    uploadedFiles: any[] = []
    activeGrouping = ''

    constructor(
        private readonly activatedRoute: ActivatedRoute,
        private readonly groupingItemService: GroupingItemService,
        private readonly translate: TranslatePipe,
        private readonly nav: NavController,
        private readonly toast: MessageService,
        private readonly service: GroupingItemService,
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

    onSelect($event: any) {
        this.uploadedFiles = $event.currentFiles
    }

    async save() {
        if (!this.item?.item?.length || !this.item?.groups?.length || !this.item?.correct?.length)
            return
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
        if (!inputElement?.value?.length || this.item?.groups?.includes(inputElement.value) || this.item!.groups!.length >= 4)
            return

        if (!inputElement?.value.length) return
        if (!this.item?.groups) this.item!.groups = []
        if (this.item!.groups.includes(inputElement.value)) return
        this.item!.groups.push(inputElement.value)
        inputElement.value = ''
        inputElement.focus()
    }

    async addImage(fileUpload: any, type: string) {
        if (type === 'group' && this.item!.groups!.length >= 4) {
            return
        }
        const loading = await presentLoading()
        try {
            const res = await this.service.addImage(this.uploadedFiles)
            for (const image of res) {
                if (type === 'group')
                {
                    this.item!.groups!.push(image.filename)
                    fileUpload.clear()
                }
                else
                    this.item!.item = image.filename
            }
            Log.debug('ManageGroupPage::save', 'res', res)
        } catch (e: any) {
            Log.error('ManageGroupPage::save', e)
            if (e.status == 0) {
                this.toast.add({ severity: 'error', summary: 'Error', detail: 'Túl nagy a kép(ek) mérete, összesen 1Mb lehet!' })
            }else {
                this.toast.add({ severity: 'error', summary: 'Error', detail: e.message })
            }
        } finally {
            loading.dismiss().then()
        }


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
        const params = await firstValueFrom(this.activatedRoute.params)
        this.activeGrouping = params.id

        if (params.id !== 'new')
            this.selectedItemFormat = 'Szöveg'
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
