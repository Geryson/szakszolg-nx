import { Component } from '@angular/core'
import { MirrorWordService } from '../../../shared/services/mirror-word.service'
import { IMirrorWord } from '@szakszolg-nx/api-interfaces'
import { QueryRef } from 'apollo-angular'
import { Subscription } from 'rxjs'
import { AlertService } from '../../../shared/services/alert.service'

@Component({
    selector: 'nx12-play-mirror-words',
    templateUrl: './play-mirror-words.page.html',
    styleUrls: ['./play-mirror-words.page.scss'],
})
export class PlayMirrorWordsPage {
    inputValue = ''
    word!: string
    counter = 5
    correctAnswers = 0
    value: number | null = null
    found = false
    answer?: string
    mistake = false
    end = false
    private queryRef?: QueryRef<{ mirrorWord: Partial<IMirrorWord> }>
    private sub?: Subscription
    previousWords: string[] = []
    noMoreWords = false

    loading = false
    rule = true;

    constructor(private readonly service: MirrorWordService, private readonly alert: AlertService) {}

    async init() {
        const loading = await this.alert.loading('MESSAGE.LOADING')
        this.value = Math.floor(Math.random() * 2)
        this.queryRef = this.service.random()
        this.sub = this.queryRef.valueChanges.subscribe((res) => (this.word = res.data.mirrorWord.word ?? '!'))
        loading.dismiss().then()
    }

    async check() {
        if (this.inputValue === '')
            return
        if (this.inputValue?.toLowerCase() === this.word?.toLowerCase()) {
            this.found = true
            this.inputValue = ''
            this.correctAnswers++
        } else if (this.counter !== 1) {
            this.counter--
            this.inputValue = ''
            this.mistake = true
        } else {
            this.end = true
            this.mistake = false
            this.answer = this.word
            this.inputValue = ''
        }
    }
    async nextWord() {
        this.loading = true
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

        this.loading = false
        loading.dismiss().then()
        this.end = false
        this.found = false
        this.inputValue = ''
    }
    newGame() {
        this.nextWord().then()
        this.counter = 5
        this.correctAnswers = 0
    }
    ionViewDidEnter(): void {
        this.init().then()
    }

    ionViewDidLeave() {
        this.sub?.unsubscribe()
    }
}
