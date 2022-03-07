import { Directive, ElementRef, HostListener } from '@angular/core'

@Directive({
    selector: '[nxNumberOnly]',
})
export class NumberOnlyDirective {
    inputElement: HTMLElement
    private readonly navigationKeys = [
        'Backspace',
        'Delete',
        'Tab',
        'Escape',
        'Enter',
        'Home',
        'End',
        'ArrowLeft',
        'ArrowRight',
        'Clear',
        'Copy',
        'Paste',
    ]

    private readonly combinationKeys = ['a', 'c', 'v', 'x'] // Ctrl + a, Ctrl + c, etc.

    constructor(public el: ElementRef) {
        this.inputElement = el.nativeElement
    }

    @HostListener('keydown', ['$event'])
    onKeyDown(e: KeyboardEvent) {
        console.log('keydown', e.key)
        const key = e.key
        if (
            this.navigationKeys.indexOf(key) > -1 ||
            (this.combinationKeys.indexOf(key) > -1 && e.ctrlKey) ||
            (this.combinationKeys.indexOf(key) > -1 && e.metaKey) // Allow: Cmd+X (Mac)
        )
            return
        if (!/[0-9]/.test(key)) e.preventDefault()
    }

    @HostListener('paste', ['$event'])
    onPaste(event: ClipboardEvent) {
        event.preventDefault()
        const pastedInput = event.clipboardData?.getData('text/plain').replace(/\D/g, '') ?? '' // get a digit-only string
        document.execCommand('insertText', false, pastedInput)
    }

    @HostListener('drop', ['$event'])
    onDrop(event: DragEvent) {
        event.preventDefault()
        const textData = event.dataTransfer?.getData('text').replace(/\D/g, '') ?? ''
        this.inputElement.focus()
        document.execCommand('insertText', false, textData)
    }
}
