import { Component } from '@angular/core'
import { AlertService } from '../../../shared/services/alert.service'
import { QueryRef } from 'apollo-angular'
import { IGroupingItem } from '@szakszolg-nx/api-interfaces'
import { Subscription } from 'rxjs'
import { GroupingItemService } from '../../../shared/services/grouping-item.service'
import {CdkDragDrop, moveItemInArray, transferArrayItem} from "@angular/cdk/drag-drop";
import {log} from "util";

@Component({
    selector: 'nx12-play-groups',
    templateUrl: './play-groups.page.html',
    styleUrls: ['./play-groups.page.scss'],
})
export class PlayGroupsPage {
    correct?: string | undefined
    groups!: string[]
    word!: string
    selectedGroup?: string
    guessedAnswer?: boolean
    notCorrect?: boolean
    private queryRef?: QueryRef<{ groupingItem: Partial<IGroupingItem> }>
    private sub?: Subscription
    private draggedWord?: string | null
    previousWords: string[] = []
    noMoreWords = false

    wArray: string[] = [''];
    first: string[] = []
    second: string[] = []
    third: string[] = []
    fourth: string[] = []


    constructor(private readonly service: GroupingItemService, private readonly alert: AlertService) {}

    async init() {
        const loading = await this.alert.loading('MESSAGE.LOADING')
        this.queryRef = this.service.random()
        this.sub = this.queryRef.valueChanges.subscribe(
            (res) => (
                (this.word = res.data.groupingItem.item ?? '!'),
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

    dragStart(word: string | undefined) {
        this.draggedWord = word
    }

    drop(event: CdkDragDrop<string[]>/*group: string*/) {
            transferArrayItem(
                event.previousContainer.data,
                event.container.data,
                event.previousIndex,
                event.currentIndex,
            );

            const length = event.container.id.length
            
            const answerId = +event.container.id.substring(length-1, length) - 1
            const correctId = this.groups.findIndex(x => x === this.correct)

            if (correctId === answerId)
                console.log('Helyes')
            else
                console.log('Helytelen')


        /*if (this.draggedWord) {
            this.selectedGroup = group
            this.guessedAnswer = group === this.correct
            if (!this.guessedAnswer) {
                this.notCorrect = true
                this.correct = undefined
            }
            this.draggedWord = null
        }*/
    }

    dragEnd() {
        this.draggedWord = null
    }

    async nextWord() {
        let tries = 0

        this.selectedGroup = ""
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
                console.log('else')
                break
            }
        }

        console.log(this.previousWords)
        loading.dismiss().then()
        this.guessedAnswer = false
        this.notCorrect = false
    }
}
