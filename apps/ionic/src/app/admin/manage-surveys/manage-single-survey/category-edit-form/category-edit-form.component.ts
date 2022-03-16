import { Component, EventEmitter, Input, Output } from '@angular/core'
import { IQuiz } from '@szakszolg-nx/api-interfaces'
import { translate } from '../../../../../shared/utils/translation.tools'

@Component({
    selector: 'nx12-category-edit-form',
    templateUrl: './category-edit-form.component.html',
    styleUrls: ['./category-edit-form.component.scss'],
})
export class CategoryEditFormComponent {
    @Input() survey: Partial<IQuiz> = {}
    @Output() surveyChange = new EventEmitter<Partial<IQuiz>>()
    @Output() closing = new EventEmitter<void>()
    nothing = ''

    constructor() {
        this.init().then()
    }

    async init() {
        this.nothing = await translate('FORM_OPERATION.NOTHING')
    }

    remove(item: string) {
        this.survey.categories = this.survey.categories?.filter((category) => category !== item)
        this.surveyChange.emit(this.survey)
    }

    add(inputElement: HTMLInputElement) {
        if (!inputElement.value) return

        if (!this.survey.categories) {
            this.survey.categories = []
        }
        this.survey.categories.push(inputElement.value)
        inputElement.value = ''
        inputElement.focus()
        this.surveyChange.emit(this.survey)
    }

    save() {
        this.closing.emit()
    }

    cancel() {
        this.closing.emit()
    }
}
