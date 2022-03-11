import { Component } from '@angular/core'
import { AlertService } from '../../../shared/services/alert.service'
import { QueryRef } from 'apollo-angular'
import { IGroupingItem } from '@szakszolg-nx/api-interfaces'
import { Subscription } from 'rxjs'
import { GroupingItemService } from '../../../shared/services/grouping-item.service'

@Component({
    selector: 'nx12-play-groups',
    templateUrl: './play-groups.page.html',
    styleUrls: ['./play-groups.page.scss'],
})
export class PlayGroupsPage {
    correct?: string | undefined
    groups?: string[]
    word!: string
    selectedGroup?: string
    guessedAnswer?: boolean
    notCorrect?: boolean
    private queryRef?: QueryRef<{ groupingItem: Partial<IGroupingItem> }>
    private sub?: Subscription
    private draggedWord?: string | null
    previousWords: string[] = []
    noMoreWords = false
    newWord = ''

    constructor(private readonly service: GroupingItemService, private readonly alert: AlertService) {}

    async init() {
        const loading = await this.alert.loading('MESSAGE.LOADING')
        this.queryRef = this.service.random()
        this.sub = this.queryRef.valueChanges.subscribe(
            (res) => (
                (this.word = res.data.groupingItem.item ?? '!'),
                (this.correct = res.data.groupingItem.correct ?? '!'),
                (this.groups = res.data.groupingItem.groups ?? [])
            ),
        )
        loading.dismiss().then()
    }

    ionViewDidEnter(): void {
        this.init().then(() => this.newWord = this.word)
    }

    dragStart(word: string | undefined) {
        this.draggedWord = word
    }

    drop(group: string) {
        if (this.draggedWord) {
            this.selectedGroup = group
            this.guessedAnswer = group === this.correct
            if (!this.guessedAnswer) {
                this.notCorrect = true
                this.correct = undefined
            }
            this.draggedWord = null
        }
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

        this.newWord = this.word

        console.log(this.previousWords)
        loading.dismiss().then()
        this.guessedAnswer = false
        this.notCorrect = false
    }
}
