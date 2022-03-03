import { Component, OnInit } from '@angular/core';
import {AlertService} from "../../../shared/services/alert.service";
import {QueryRef} from "apollo-angular";
import {IGroupingItem, IMirrorWord} from "@szakszolg-nx/api-interfaces";
import {EmptyObject} from "apollo-angular/build/types";
import {Subscription} from "rxjs";
import {GroupingItemService} from "../../../shared/services/grouping-item.service";

@Component({
  selector: 'nx12-play-groups',
  templateUrl: './play-groups.page.html',
  styleUrls: ['./play-groups.page.scss'],
})
export class PlayGroupsPage {

    correct?: string
    groups?: string[]
    word?: string
    private queryRef?: QueryRef<{ groupingItem: Partial<IGroupingItem> }, EmptyObject>
    private sub?: Subscription
    selectedGroup?: string
    private draggedWord?: string | null;
    guessedAnswer?: boolean;
    notCorrect?: boolean;

    constructor(private readonly service: GroupingItemService,private readonly alert: AlertService) { }

    async init() {
        const loading = await this.alert.loading('MESSAGE.LOADING')
        this.queryRef = this.service.random()
        this.sub = this.queryRef.valueChanges
            .subscribe(
                (res) =>
                    (this.word = res.data.groupingItem.item ?? '!',
                    this.correct = res.data.groupingItem.correct ?? '!',
                    this.groups = res.data.groupingItem.groups ?? [])
            )
        loading.dismiss().then()
    }

    ionViewDidEnter(): void {
        this.init().then()
    }

    dragStart(word: string | undefined) {
        this.draggedWord = word
    }

    drop(group: string) {
        if(this.draggedWord){
            this.selectedGroup = group
            this.guessedAnswer = group === this.correct
            if(!this.guessedAnswer){
                this.notCorrect = true
            }
            this.draggedWord = null
        }
    }

    dragEnd() {
        this.draggedWord = null
    }

    async nextWord() {
        const loading = await this.alert.loading('MESSAGE.LOADING')
        await this.queryRef?.refetch()
        loading.dismiss().then()
        this.guessedAnswer = false
        this.notCorrect = false
    }
}
