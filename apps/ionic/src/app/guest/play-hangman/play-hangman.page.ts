/* eslint-disable @typescript-eslint/no-non-null-assertion */
import {Component} from '@angular/core';
import {HangmanWordService} from "../../../shared/services/hangman-word.service";
import {AlertService} from "../../../shared/services/alert.service";
import {QueryRef} from "apollo-angular";
import {IHangmanWord} from "@szakszolg-nx/api-interfaces";
import {EmptyObject} from "apollo-angular/build/types";
import {Subscription} from "rxjs";

@Component({
  selector: 'nx12-play-hangman',
  templateUrl: './play-hangman.page.html',
  styleUrls: ['./play-hangman.page.scss'],
})
export class PlayHangmanPage{

    private queryRef?: QueryRef<{ hangmanWords: Partial<IHangmanWord>[] }, EmptyObject>
    private sub?: Subscription
    categories?: string[]
    selectedCategory: any
    private queryRef2?: QueryRef<{ hangmanWord: Partial<IHangmanWord> }, EmptyObject>
    private sub2?: Subscription
    word?: string;
    replaced: string[] = []
    letters = ["a", "á", "b", "c", "d", "e", "é", "f", "g", "h", "i", "í", "j", "k", "l", "m", "n", "o", "ó", "ö",
        "ő", "p", "q", "r", "s", "t", "u", "ú", "ü", "ű", "v", "w", "x", "y", "z",]
    wordArray?: string[]
    counter = -1
    failed = false;
    success = false;
    selectedLetters: string[] = []

    constructor(private readonly service: HangmanWordService, private readonly alert: AlertService) { }

    async init() {
        const loading = await this.alert.loading('MESSAGE.LOADING')
        this.queryRef = this.service.browseCategories()
        this.sub = this.queryRef.valueChanges
            .subscribe(
                (res) => {
                    const result = res.data.hangmanWords.map(x => x.category!) ?? []
                    this.categories = [...(new Set(result))]
                }
            )
        loading.dismiss().then()

    }

  ionViewDidEnter() {
      this.init().then()
  }

  ionViewDidLeave() {
        this.sub?.unsubscribe()
      this.sub2?.unsubscribe()
  }

    showWord() {
        this.queryRef2 = this.service.browseByCategory(this.selectedCategory)
        this.sub2 = this.queryRef2.valueChanges
            .subscribe((res) => {
                    this.word = res.data.hangmanWord.word ?? ''
                    console.log(this.word)
                    this.replaced = this.word.replace(/[A-Za-z]/g,'_').split('')
                }
            )
    }

    checkLetter(letter: string) {
        this.selectedLetters.push(letter)
        this.wordArray = this.word?.toLowerCase().split('')
        if(this.wordArray?.includes(letter)){
            for(let i = 0; i<this.wordArray?.length ; i++){
                if(this.wordArray[i] === letter){
                        this.replaced[i] = letter
                }
            }
        }
        else{
            if(this.counter<10)
                this.counter++
            else
                this.failed = true

        }
        if(!this.replaced?.includes('_'))
            this.success = true

    }

    async nextWord() {
        this.counter = -1
        this.failed = false
        this.success = false
        this.replaced = []
        this.selectedLetters = []
        const loading = await this.alert.loading('MESSAGE.LOADING')
        await this.queryRef2?.refetch()
        loading.dismiss().then()

    }
}
