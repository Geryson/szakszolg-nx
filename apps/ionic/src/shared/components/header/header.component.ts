import { Component, Inject, Input, OnInit } from '@angular/core'
import { NavController } from '@ionic/angular'
import { AUTH_SERVICE, AuthService } from '@szakszolg-nx/shared-module'
import { ConfirmationService } from 'primeng/api'
import { TranslatePipe } from '@ngx-translate/core'

@Component({
    selector: 'nx12-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
    @Input() title = ''
    @Input() changed = false

    constructor(
        @Inject(AUTH_SERVICE) private readonly authService: AuthService,
        private readonly nav: NavController,
        private readonly confirm: ConfirmationService,
        private readonly translate: TranslatePipe,
    ) {}

    ngOnInit() {}

    back() {
        if (this.changed) {
            this.confirm.confirm({
                closeOnEscape: true,
                header: this.translate.transform('SHARED.LEAVE_PAGE_CONFIRM_HEADER'),
                message: this.translate.transform('SHARED.LEAVE_PAGE_CONFIRM'),
                accept: () => {
                    this.nav.back()
                },
            })
        } else {
            this.nav.back()
        }
    }

    onClickLogOut() {
        this.authService.logout()
    }
}
