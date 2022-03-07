import { Component, OnInit } from '@angular/core'
import { AlertService } from '../../shared/services/alert.service'
import { link, pages } from '../../shared/utils/pages.const'
import { RedirectService } from '../../shared/services/redirect.service'

@Component({
    selector: 'nx12-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
    readonly eduIdMaxLength = 11
    readonly eduIdMinLength = this.eduIdMaxLength // This might change in the future

    eduId = ''
    pages = pages
    link = link

    constructor(private readonly alert: AlertService, private readonly redirect: RedirectService) {}

    ngOnInit() {}

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
}
