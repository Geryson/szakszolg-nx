import { Component, Input } from '@angular/core'
import { NavController } from '@ionic/angular'
import { ConfirmationService } from 'primeng/api'
import { TranslatePipe } from '@ngx-translate/core'
import { AuthService } from '../../services/auth.service'

@Component({
    selector: 'nx12-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
    @Input() title = ''
    @Input() logoutButton = false
    @Input() target = ''
    @Input() changed = false

    constructor(
        private readonly authService: AuthService,
        private readonly nav: NavController,
        private readonly confirm: ConfirmationService,
        private readonly translate: TranslatePipe,
    ) {}

    back() {
        if (this.changed) {
            this.confirm.confirm({
                closeOnEscape: true,
                header: this.translate.transform('SHARED.LEAVE_PAGE_CONFIRM_HEADER'),
                message: this.translate.transform('SHARED.LEAVE_PAGE_CONFIRM'),
                accept: () => this.navigate(),
            })
        } else {
            this.navigate()
        }
    }

    onClickLogOut() {
        this.authService.logout()
    }

    private navigate() {
        if (this.target) {
            this.nav.navigateBack(this.target).then()
        } else {
            this.nav.back()
        }
    }
}
