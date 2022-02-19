import { Component, Inject, OnInit } from '@angular/core'
import { link, pages } from 'apps/ionic/src/shared/utils/pages.const'
import { AUTH_SERVICE, AuthService } from '@szakszolg-nx/shared-module'

@Component({
    selector: 'nx12-dashboard',
    templateUrl: './dashboard.page.html',
    styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
    canManageUsers = false
    canManageRoles = false

    link = link
    pages = pages

    constructor(@Inject(AUTH_SERVICE) private readonly authService: AuthService) {}

    ngOnInit() {}

    onClickLogOut() {
        this.authService.logout()
    }
}
