/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Component } from '@angular/core'
import { IHangmanWord } from '@szakszolg-nx/api-interfaces'
import { NG_ICON } from '../../../../shared/utils/prime-icons.class'
import { ActivatedRoute } from '@angular/router'
import { ConfirmationService, MessageService } from 'primeng/api'
import { TranslatePipe } from '@ngx-translate/core'
import { first, Subscription } from 'rxjs'
import { HangmanWordService } from '../../../../shared/services/hangman-word.service'
import { QueryRef } from 'apollo-angular'
import { omit } from '@szakszolg-nx/shared-module'
import { NavController } from '@ionic/angular'
@Component({
    selector: 'nx12-manage-single-hangman-word',
    templateUrl: './manage-single-hangman-word.page.html',
    styleUrls: ['./manage-single-hangman-word.page.scss'],
})
export class ManageSingleHangmanWordPage {
    word?: Partial<IHangmanWord>
    originalWord?: Partial<IHangmanWord>
    NG_ICON = NG_ICON
    validationErrors: { [key: string]: string } = {}
    categories: string[] = []
    filteredCategories: string[] = []
    private queryRef?: QueryRef<{ hangmanWord: Partial<IHangmanWord> }>
    private sub = new Subscription()
    private categoryQueryRef?: QueryRef<{ hangmanWords: Partial<IHangmanWord>[] }>

    constructor(
        private readonly activatedRoute: ActivatedRoute,
        private readonly hangmanWordService: HangmanWordService,
        private readonly confirmation: ConfirmationService,
        private readonly translate: TranslatePipe,
        private readonly nav: NavController,
        private readonly toast: MessageService,
    ) {}

    ionViewDidEnter() {
        this.init().then()
    }

    check(prop: keyof IHangmanWord) {
        const validation = validations[prop](this.word![prop as keyof IHangmanWord], prop)
        setTimeout(() => {
            if (!validation) this.validationErrors[prop] = this.translate.transform(`USER_EDIT.ERROR.${prop}`)
            // TODO: translate and show on UI
            else this.validationErrors[prop] = ''
        }, 50)
        return !validation
    }

    save() {
        if (this.word?._id) {
            this.update()
            return
        }
        this.create()
    }

    search($event: any) {
        this.filteredCategories = this.categories.filter((category) =>
            category.toLowerCase().includes($event.query.toLowerCase()),
        )
    }

    ionViewDidLeave() {
        this.sub?.unsubscribe()
    }

    private create() {
        this.hangmanWordService
            .add(this.word!.category!, this.word!.word!)
            .pipe(first())
            .subscribe(() => this.saveCallback())
    }

    private update() {
        this.hangmanWordService
            .edit(this.word!._id, omit(this.word!, '_id'))
            .pipe(first())
            .subscribe(() => this.saveCallback())
    }

    private saveCallback() {
        this.originalWord = { ...this.word }
        this.toast.add({
            severity: 'success',
            summary: this.translate.transform('FORM_OPERATION.SUCCESS'),
            detail: this.translate.transform('FORM_OPERATION.SUCCESS_DETAIL'),
        })
        this.nav.back()
        this.getCategories().then()
    }

    private async init() {
        this.sub.add(
            this.activatedRoute.params.subscribe((params) => {
                if (params.id === 'new') {
                    this.word = {
                        word: '',
                        category: '',
                    }
                    this.originalWord = { ...this.word }
                    this.getCategories().then()
                    return
                }
                this.queryRef = this.hangmanWordService.read(params.id)
                this.sub?.add(
                    this.queryRef.valueChanges.subscribe(async ({ data }) => {
                        this.getCategories().then()
                        this.word = { ...data.hangmanWord }
                        this.originalWord = { ...data.hangmanWord }
                    }),
                )
            }),
        )
    }

    private async getCategories() {
        this.categoryQueryRef = this.hangmanWordService.browseCategories()
        this.categoryQueryRef.valueChanges.subscribe((res) => {
            this.categories = [...new Set(res.data?.hangmanWords.map((word) => word.category!))]
            this.filteredCategories = [...this.categories]
        })
    }
}
const validations: { [key: string]: (value: string, attribute: string) => boolean } = {
    word: (value: string) => value.length > 0,
    category: (value: string) => value.length > 0,
}
