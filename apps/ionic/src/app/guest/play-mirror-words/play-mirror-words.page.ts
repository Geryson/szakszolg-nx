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
    value: number | null = null

    private queryRef?: QueryRef<{ mirrorWord: Partial<IMirrorWord> }, EmptyObject>
    private sub?: Subscription
    found = false;
    notFound = false;
    answer?: string;

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
            this.found = true
        else
            if(this.counter !== 0){
                this.counter--
            }
            else{
                this.notFound = true
                this.answer = this.word
            }


    }
    async nextWord(){
        const loading = await this.alert.loading('MESSAGE.LOADING')
        await this.queryRef?.refetch()
        loading.dismiss().then()
        this.notFound = false
        this.found = false
        this.counter = 5
        this.inputValue = ''
    }

    ionViewDidEnter(): void {
        this.init().then()
    }

    ionViewDidLeave() {
        this.sub?.unsubscribe()
    }
}
