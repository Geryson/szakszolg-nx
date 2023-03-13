/* eslint-disable @typescript-eslint/no-non-null-assertion */

import { Component } from '@angular/core'
import { AlertService } from '../../../shared/services/alert.service'
import { QueryRef } from 'apollo-angular'
import { IGroupingItem2 } from '@szakszolg-nx/api-interfaces'
import { Subscription } from 'rxjs'
import { GroupingItem2Service } from '../../../shared/services/grouping-item2.service'
import {CdkDragDrop} from "@angular/cdk/drag-drop";
import {RedirectService} from "../../../shared/services/redirect.service";
import {pages} from "../../../shared/utils/pages.const";
import {ConfirmationService} from "primeng/api";
import {getGroupImageUrl} from "../../../shared/utils/uri.tools";
import {TranslatePipe} from "@ngx-translate/core";

@Component({
    selector: 'nx12-play-groups2',
    templateUrl: './play-groups2.page.html',
    styleUrls: ['./play-groups2.page.scss'],
})
export class PlayGroups2Page {
    getGroupImageUrl = getGroupImageUrl

    corrects?: string[]
    correct?: string | undefined
    groups!: string[]
    words!: string[]
    word!: string
    loading = false
    categories?: string[]
    selectedCategory: any

    itemIsPicture: boolean[] = []
    groupIsPicture: boolean[] = []

    guessedAnswer?: boolean
    notCorrect?: boolean
    private queryRef?: QueryRef<{ groupingItems2: Partial<IGroupingItem2>[] }>
    private queryRef2?: QueryRef<{ groupingItem2: Partial<IGroupingItem2> }>
    private sub?: Subscription
    private sub2?: Subscription
    previousWords: string[] = []
    noMoreWords = false

    wArray: string[] = []

    answerId = -1
    correctId = -1

    counter = 0
    rule = true;

    myScreenOrientation = window.screen.orientation;

    constructor(private readonly service: GroupingItem2Service,
                private readonly alert: AlertService,
                private readonly redirect: RedirectService,
                private confirmationService: ConfirmationService,
                private readonly translate: TranslatePipe) {}

    async init() {
        const loading = await this.alert.loading('MESSAGE.LOADING')
        this.queryRef = this.service.browseCategories()
        this.sub = this.queryRef.valueChanges.subscribe(
            (res) => {
                const result =  res.data.groupingItems2.map(x => x.category!) ?? []
                this.categories = [...(new Set(result))]
            }
        )
        loading.dismiss().then()
    }

    getWords() {
        this.queryRef2 = this.service.browseByCategory(this.selectedCategory)
        this.sub2 = this.queryRef2.valueChanges
            .subscribe((res) => {
                this.words = res.data.groupingItem2.items ?? []
                this.corrects = res.data.groupingItem2.correct ?? []
                this.groups = res.data.groupingItem2.groups ?? []
                this.itemIsPicture = res.data.groupingItem2.itemIsPicture ?? []
                this.groupIsPicture = res.data.groupingItem2.groupIsPicture ?? []
                this.showWord()
            }
        )
    }

    showWord() {
        const randomIndex = Math.floor(Math.random() * this.words.length)
        this.word = this.words[randomIndex]
        this.correct = this.corrects![randomIndex]
    }

    ionViewDidEnter(): void {
        this.myScreenOrientation.lock("portrait");
        this.init().then()
    }

    ionViewDidLeave(): void
    {
        this.myScreenOrientation.unlock();
    }

    drop(event: CdkDragDrop<string[]>) {
        if (event.container.id !== 'cdk-drop-list-0'){

            const length = event.container.id.length

            this.answerId = +event.container.id.substring(length-1, length) - 1
            this.correctId = this.groups.findIndex(x => x === this.correct)

            if (this.correctId === this.answerId)
            {
                this.guessedAnswer = true
                this.counter += 1
            }
            else if (this.answerId !== -1) {
                this.notCorrect = true
            }
        }
    }

    async nextWord() {
        this.loading = true
        let tries = 0
        this.previousWords.push(this.word)

        const loading = await this.alert.loading('MESSAGE.LOADING')
        await this.showWord()

        while (this.previousWords.includes(this.word)){
            if (tries < 5){
                await this.showWord()
                tries++
            }
            else
            {
                this.noMoreWords = true
                break
            }
        }
        this.loading = false

        this.answerId = - 1
        this.correctId = - 1

        loading.dismiss().then()
        this.guessedAnswer = false
        this.notCorrect = false
    }

    duplicates() {
        this.counter = 0
        this.guessedAnswer = false
        this.notCorrect = false
        this.noMoreWords = false

        this.answerId = - 1
        this.correctId = - 1

        this.previousWords = []
    }

    quit() {
        this.duplicates()
        this.redirect.to(pages.guest.guestRoom)
    }

    quitConfirm() {
        this.confirmationService.confirm({
            message: this.translate.transform(`MESSAGE.QUIT`),
            header: this.translate.transform(`HEADER.EXIT`),
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.quit()
            },
            reject: (type: any) => {
                return
            }

        });
    }

    async refresh() {
        this.duplicates()
        await this.showWord()
    }

    checkItem(word: string): boolean {
        return this.itemIsPicture[this.words.indexOf(word)]
    }

    checkGroup(group: string): boolean {
        return this.groupIsPicture[this.groups.indexOf(group)]
    }
}
