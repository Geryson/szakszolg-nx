import {Component, OnInit} from '@angular/core';
import {IonTabs} from '@ionic/angular'
import {MirrorWordService} from "../../../shared/services/mirror-word.service";
import {EmptyObject} from "apollo-angular/build/types";
import {IMirrorWord} from "@szakszolg-nx/api-interfaces";
import {QueryRef} from "apollo-angular";
import {Subscription} from "rxjs";

@Component({
  selector: 'nx12-play-mirror-words',
  templateUrl: './play-mirror-words.page.html',
  styleUrls: ['./play-mirror-words.page.scss'],
})
export class PlayMirrorWordsPage{

    word = "megszentségteleníthetetlenségeskedéseitekért"

    value: number | null = null
    private queryRef?: QueryRef<{ mirrorWord: Partial<IMirrorWord> }, EmptyObject>
    private sub?: Subscription

  constructor(private readonly service: MirrorWordService) { }

    async init() {
        this.value = Math.floor(Math.random()*2)
        this.queryRef = this.service.random()
        this.sub = this.queryRef.valueChanges
            .subscribe(
                (res) =>
                    (this.word = res.data.mirrorWord.word ?? '!')
            )
    }

    async check() {
        await this.queryRef?.refetch()
    }

    ionViewDidEnter(): void {
        this.init().then()
    }

    ionViewDidLeave() {
        this.sub?.unsubscribe()
    }
}
