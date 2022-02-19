import { Component, OnDestroy, OnInit } from '@angular/core'
import { MirrorWordService } from '../../../shared/services/mirror-word.service'
import { IMirrorWord } from '@szakszolg-nx/api-interfaces'
import { BehaviorSubject, Subscription } from 'rxjs'
import { NG_ICON } from '../../../shared/utils/prime-icons.class'
import { EmptyObject } from 'apollo-angular/build/types'
import { QueryRef } from 'apollo-angular'
import { execute } from '@szakszolg-nx/shared-module'
import { link, pages } from '../../../shared/utils/pages.const'

@Component({
    selector: 'nx12-manage-mirror-words',
    templateUrl: './manage-mirror-words.page.html',
    styleUrls: ['./manage-mirror-words.page.scss'],
})
export class ManageMirrorWordsPage implements OnInit, OnDestroy {
    link = link
    NG_ICON = NG_ICON
    pages = pages

    dialog: 'add' | 'edit' | null = null
    loading = false

    readonly filteredMirrorWords$ = new BehaviorSubject<Partial<IMirrorWord>[]>([])
    wordUnderEdit = ''
    private readonly mirrorWords$ = new BehaviorSubject<Partial<IMirrorWord>[]>([])
    private wordIdUnderEdit = ''
    private queryRef?: QueryRef<{ mirrorWords: Partial<IMirrorWord>[] }, EmptyObject>
    private subscription?: Subscription

    constructor(private readonly mirrorWordService: MirrorWordService) {}

    ngOnInit() {
        this.loading = true
        this.queryRef = this.mirrorWordService.browse()
        this.subscription = this.queryRef.valueChanges.subscribe((res) => {
            this.mirrorWords$.next(res.data.mirrorWords)
            this.filteredMirrorWords$.next(res.data.mirrorWords)
            this.loading = false
        })
    }

    clear(searchInput: HTMLInputElement) {
        searchInput.value = ''
        this.filteredMirrorWords$.next(this.mirrorWords$.value)
    }

    filter(searchInput: HTMLInputElement) {
        this.loading = true
        if (!searchInput.value || searchInput.value.trim() === '') {
            this.clear(searchInput)
            return
        }
        const searchTerm = searchInput.value.toLowerCase()
        this.filteredMirrorWords$.next(
            this.mirrorWords$.value.filter((mirrorWord) => mirrorWord?.word?.toLowerCase().includes(searchTerm)),
        )
        this.loading = false
    }

    openAddDialogue() {
        this.dialog = 'add'
    }

    async save() {
        this.loading = true
        if (this.wordIdUnderEdit) await execute(this.mirrorWordService.edit(this.wordIdUnderEdit, this.wordUnderEdit))
        else await execute(this.mirrorWordService.add(this.wordUnderEdit))
        this.closeDialogue()
        this.queryRef?.refetch().then(() => (this.loading = false))
    }

    openEditDialogue(word: Partial<IMirrorWord>) {
        this.wordUnderEdit = word.word ?? ''
        this.wordIdUnderEdit = word._id
        this.dialog = 'edit'
    }

    deleteWord(word: Partial<IMirrorWord>) {
        this.loading = true
        execute(this.mirrorWordService.destroy(word._id)).then(() =>
            this.queryRef?.refetch().then(() => (this.loading = false)),
        )
    }

    closeDialogue() {
        this.dialog = null
        this.wordIdUnderEdit = ''
        this.wordUnderEdit = ''
    }

    ngOnDestroy() {
        this.subscription?.unsubscribe()
    }
}
