import { Component, OnDestroy, OnInit } from '@angular/core'
import { IHangmanWord, RESOURCES } from '@szakszolg-nx/api-interfaces'
import { HangmanWordService } from '../../../shared/services/hangman-word.service'
import { pages } from '../../../shared/utils/pages.const'
import { CrudPageClass } from '../../../shared/utils/crud-page.class'

@Component({
    selector: 'nx12-manage-hangman-words',
    templateUrl: './manage-hangman-words.page.html',
    styleUrls: ['./manage-hangman-words.page.scss'],
})
export class ManageHangmanWordsPage
    extends CrudPageClass<IHangmanWord, { hangmanWords: Partial<IHangmanWord>[] }>
    implements OnInit, OnDestroy
{
    protected editPage = pages.admin.hangmanWords
    protected resourceName = RESOURCES.HANGMAN_WORDS

    constructor(protected readonly resourceService: HangmanWordService) {
        super()
    }
}
