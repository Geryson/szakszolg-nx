import {Component, OnInit} from '@angular/core';
import {IonTabs} from '@ionic/angular'
import {MirrorWordService} from "../../../shared/services/mirror-word.service";
import {EmptyObject} from "apollo-angular/build/types";
import {IMirrorWord} from "@szakszolg-nx/api-interfaces";
import {QueryRef} from "apollo-angular";
import {Subscription} from "rxjs";
import {AlertService} from "../../../shared/services/alert.service";

@Component({
  selector: 'nx12-play-mirror-words',
  templateUrl: './play-mirror-words.page.html',
  styleUrls: ['./play-mirror-words.page.scss'],
})
export class PlayMirrorWordsPage{

    inputValue?: string
    word?: string
    counter = 5
    correctAnswers=0
    value: number | null = null

    private queryRef?: QueryRef<{ mirrorWord: Partial<IMirrorWord> }, EmptyObject>
    private sub?: Subscription
    found = false
    answer?: string
    mistake = false
    end=false

  constructor(private readonly service: MirrorWordService, private readonly alert: AlertService,
  ) { }

    async init() {
        const loading = await this.alert.loading('MESSAGE.LOADING')
        this.value = Math.floor(Math.random()*2)
        this.queryRef = this.service.random()
        this.sub = this.queryRef.valueChanges
            .subscribe(
                (res) =>
                    (this.word = res.data.mirrorWord.word ?? '!')
            )
        loading.dismiss().then()
    }

    async check() {
        if(this.inputValue?.toLowerCase() === this.word?.toLowerCase())
        {
            this.found = true
            this.inputValue=''
            this.correctAnswers++
        }
        else
            if(this.counter !== 1){
                this.counter--
                this.mistake = true
            }
            else{
                this.end = true
                this.mistake = false
                this.answer = this.word
            }


    }
    async nextWord(){
        const loading = await this.alert.loading('MESSAGE.LOADING')
        await this.queryRef?.refetch()
        loading.dismiss().then()
        this.end = false
        this.found = false
        this.inputValue = ''
    }
     newGame(){
        this.nextWord().then()
         this.counter=5
         this.correctAnswers=0

    }
    ionViewDidEnter(): void {
        this.init().then()
    }

    ionViewDidLeave() {
        this.sub?.unsubscribe()
    }
}
