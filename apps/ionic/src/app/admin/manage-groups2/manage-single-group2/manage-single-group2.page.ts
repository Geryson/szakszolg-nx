/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Component } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import {IGroupingItem2} from '@szakszolg-nx/api-interfaces'
import { GroupingItem2Service } from '../../../../shared/services/grouping-item2.service'
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
    selector: 'nx12-manage-single-group2',
    templateUrl: './manage-single-group2.page.html',
    styleUrls: ['./manage-single-group2.page.scss'],
})
export class ManageSingleGroup2Page {
    item?: Partial<IGroupingItem2>
    originalItem?: Partial<IGroupingItem2>
    NG_ICON = NG_ICON
    private readonly sub = new Subscription()
    private queryRef?: QueryRef<{ groupingItem2: Partial<IGroupingItem2> }>
    private validationErrors: { [key: string]: string } = {}
    selectedAnswerFormat: any
    selectedItemFormat: any;
    options = ['Szöveg', 'Kép']
    correctOptions: string[] = []
    uploadedFiles: any[] = []
    activeGrouping = ''
    category?: string
    correct = ''
    prefix = 'https://justnop.xyz/api/grouping-items/'

    constructor(
        private readonly activatedRoute: ActivatedRoute,
        private readonly translate: TranslatePipe,
        private readonly nav: NavController,
        private readonly toast: MessageService,
        private readonly service: GroupingItem2Service,
    ) {}

    ionViewDidEnter() {
        this.init().then()
    }

    ionViewDidLeave() {
        this.sub.unsubscribe()
    }

    check(prop: keyof IGroupingItem2, obj: IGroupingItem2) {
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
        if (!this.item?.items?.length || this.saveable() || !this.category?.length)
            return
        if (this.item?._id) {
            this.update()
            return
        }
        this.item!.category = this.category
        console.log(this.item!.category)
        this.create()
    }

    removeGroup(group: string) {
        this.item!.groups = this.item!.groups?.filter((g) => g !== group)
        this.correctOptions = this.correctOptions.filter((g) => g !== group)
    }

    removeItem(item: string) {
        const index = this.item!.items!.indexOf(item)
        this.item!.items = this.item!.items?.filter((i) => i !== item)
        this.item!.correct!.splice(index, 1)
        console.log(this.item!.correct)
    }

    add(inputElement: HTMLInputElement, type: string) {
        if (!inputElement?.value?.length || this.item?.groups?.includes(inputElement.value)) {
            if (type === 'group' && this.item!.groups!.length >= 4)
                return
            return
        }

        if (!inputElement?.value.length) return

        if (type === 'group'){
            if (this.item!.groups!.length >= 4) return
            if (!this.item?.groups) this.item!.groups = []
            if (this.item!.groups.includes(inputElement.value)) return
            this.item!.groups.push(inputElement.value)
            this.correctOptions.push(inputElement.value)
            console.log(this.correctOptions)
        }
        else {
            if (this.item!.groups!.length < 4) return
            if (!this.item?.items) this.item!.items = []
            if (this.item!.items.includes(inputElement.value)) return
            if (this.correct.trim() === '') return;

            let picture = false
            this.item!.items.push(inputElement.value)
            for (const group of this.item!.groups!)
                if (group.length >= this.prefix.length && group.substring(this.prefix.length) === this.correct) {
                    picture = true
                    break
                }
            if (picture){
                this.item!.correct!.push(this.prefix+this.correct)
                picture = false
            }
            else this.item!.correct!.push(this.correct)

            console.log(this.item?.items)
        }
        this.correct = ''
        inputElement.value = ''
    }

    async addImage(fileUpload: any, type: string) {
        if (type === 'group' && this.item!.groups!.length >= 4) return
        const loading = await presentLoading()
        try {
            const res = await this.service.addImage(this.uploadedFiles)
            for (const image of res) {
                if (type === 'group')
                {
                    this.item!.groups!.push(this.prefix+image.filename)
                    this.correctOptions.push(image.filename)
                    fileUpload.clear()
                }
                else {
                    let picture = false
                    console.log("Fájl neve")
                    console.log(image.filename)
                    this.item!.items!.push(this.prefix+image.filename) // a group feltöltését adja hozzá valamiért ?!?!?!?!?!?!
                    for (const group of this.item!.groups!)
                        if (group.length >= this.prefix.length && group.substring(this.prefix.length) === this.correct) {
                            picture = true
                            break
                        }

                    if (picture) {
                        this.item!.correct!.push(this.prefix+this.correct)
                        picture = false
                    }
                    else this.item!.correct!.push(this.correct)

                    console.log("Items")
                    console.log(this.item?.items)
                    console.log("Correct")
                    console.log(this.item?.correct)
                    fileUpload.clear()
                }
                this.correct = ''
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

    private async init() {
        const params = await firstValueFrom(this.activatedRoute.params)
        this.activeGrouping = params.id

        if (params.id !== 'new')
            this.selectedItemFormat = 'Szöveg'
        this.sub.add(
            this.activatedRoute.params.subscribe((params) => {
                if (params.id === 'new') {
                    this.item = {
                        category: '',
                        items: [],
                        groups: [],
                        correct: [],
                    }
                    this.originalItem = { ...this.item }
                    return
                }

                this.queryRef = this.service.read(params.id)
                this.sub.add(
                    this.queryRef.valueChanges.subscribe(async ({ data }) => {
                        this.item = { ...data.groupingItem2 }
                        this.originalItem = { ...this.item }
                    }),
                )
            }),
        )
    }

    private create() {
        Log.debug('ManageSingleGroupPage::Create', 'Saving item:', this.item)
        this.service
            .add({
                ...this.item,
            })
            .pipe(first())
            .subscribe(() => this.saveCallback())
    }

    private update() {
        this.service
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

    saveable() {
        for (const element of this.item!.correct!) {
            if (!this.correctOptions.includes(element)) return true
        }
        return false
    }

}

const validations: { [key: string]: (value: any, attribute: string) => boolean } = {
    category: (value: IGroupingItem2) => value.category.length > 0,
    item: (value: IGroupingItem2) => value.items.length > 0 && value.items.every((item) => item.length > 0),
    groups: (value: IGroupingItem2) => value.groups.length > 0 && value.groups.every((group) => group.length > 0),
    correct: (value: IGroupingItem2) => value.correct.length > 0 && value.correct.every((correct) =>value.groups.includes(correct)),
}

