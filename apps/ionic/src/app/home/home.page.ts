import { Component } from '@angular/core'
import { InputEventWithTarget } from '@szakszolg-nx/ng-interfaces'
import { AlertService } from '../../shared/services/alert.service'

@Component({
    selector: 'nx12-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage {
    readonly eduIdMaxLength = 11
    readonly eduIdMinLength = this.eduIdMaxLength // This might change in the future

    eduId = ''

    constructor(private readonly alert: AlertService) {}

    change(event: InputEventWithTarget | any) {
        event = event as InputEventWithTarget
        if (!event || !event.target || !event.target.value || event.target.value == '') return

        if (event.inputType === 'insertText') event.preventDefault()

        if (!/[0-9]+/.test(event.target.value)) {
            event.target.value = ''
            return
        }
    }

    numberOnly(event: KeyboardEvent | any) {
        if (!/[0-9]/.test(event.key) && event.key !== 'Backspace') event.preventDefault()
    }

    eduIdIsValid() {
        return (
            this.eduId.length >= this.eduIdMinLength && this.eduId.length <= this.eduIdMaxLength && this.eduId[0] == '7'
        )
    }

    saveEduId() {
        if (this.eduIdIsValid()) {
            // Save the eduId
            // Navigate to survey
        } else {
            this.alert.show('ERROR_OM', ['AGAIN']).then()
        }
    }

    toAdminPage() {
        // Navigate to admin page
    }
}
