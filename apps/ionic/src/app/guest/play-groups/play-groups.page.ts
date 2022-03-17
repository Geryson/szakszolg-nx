import { Component } from '@angular/core'
import { AlertService } from '../../../shared/services/alert.service'
import { QueryRef } from 'apollo-angular'
import { IGroupingItem } from '@szakszolg-nx/api-interfaces'
import { Subscription } from 'rxjs'
import { GroupingItemService } from '../../../shared/services/grouping-item.service'
import {CdkDragDrop, moveItemInArray, transferArrayItem} from "@angular/cdk/drag-drop";
import {RedirectService} from "../../../shared/services/redirect.service";
import {pages} from "../../../shared/utils/pages.const";
import {ConfirmationService} from "primeng/api";

@Component({
    selector: 'nx12-play-groups',
    templateUrl: './play-groups.page.html',
    styleUrls: ['./play-groups.page.scss'],
})
export class PlayGroupsPage {
    correct?: string | undefined
    groups!: string[]
    word!: string
    guessedAnswer?: boolean
    notCorrect?: boolean
    private queryRef?: QueryRef<{ groupingItem: Partial<IGroupingItem> }>
    private sub?: Subscription
    previousWords: string[] = []
    noMoreWords = false

    wArray: string[] = []

    answerId = -1
    correctId = -1

    counter = 0

    private readonly prefix = 'http'

    constructor(private readonly service: GroupingItemService, private readonly alert: AlertService,
                private readonly redirect: RedirectService, private confirmationService: ConfirmationService) {}

    async init() {
        const loading = await this.alert.loading('MESSAGE.LOADING')
        this.queryRef = this.service.random()
        this.sub = this.queryRef.valueChanges.subscribe(
            (res) => (
                (this.wArray = [] ,this.word = res.data.groupingItem.item ?? '!'),
                (console.log(this.word), this.wArray.push(this.word)),
                (this.correct = res.data.groupingItem.correct ?? '!', console.log('correct: '+this.correct)),
                (this.groups = res.data.groupingItem.groups ?? [])
            ),
        )

        loading.dismiss().then()
    }

    ionViewDidEnter(): void {
        this.init().then()
    }

    drop(event: CdkDragDrop<string[]>/*group: string*/) {
        if (event.container.id !== 'cdk-drop-list-0'){

            console.log(event.container.id)
            const length = event.container.id.length

            this.answerId = +event.container.id.substring(length-1, length) - 1
            this.correctId = this.groups.findIndex(x => x === this.correct)

            if (this.correctId === this.answerId)
            {
                this.guessedAnswer = true
                this.counter += 1
            }
            else{
                this.notCorrect = true
            }
        }
    }

    async nextWord() {
        let tries = 0
        this.previousWords.push(this.word)

        const loading = await this.alert.loading('MESSAGE.LOADING')
        await this.queryRef?.refetch()

        while (this.previousWords.includes(this.word)){
            if (tries < 5){
                await this.queryRef?.refetch()
                tries++
            }
            else
            {
                this.noMoreWords = true
                break
            }
        }

        this.answerId = - 1
        this.correctId = - 1

        console.log(this.previousWords)
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
            message: 'Biztos hogy ki akarsz lépni?',
            header: 'Kilépés',
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
        await this.queryRef?.refetch().then()
    }

    check(word: string): boolean {
        if (word.substring(0, this.prefix.length) === this.prefix){
            return true
        }
        return false
    }
}
