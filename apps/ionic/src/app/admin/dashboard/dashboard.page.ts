import { Component, Inject, OnInit } from '@angular/core'
import { link, pages } from '../../../shared/utils/pages.const'
import { AUTH_SERVICE, AuthService, Log } from '@szakszolg-nx/shared-module'
import { ABILITIES, check, IRole, IUser, permission, RESOURCES } from '@szakszolg-nx/api-interfaces'

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

    ngOnInit() {
        this.checkPermissions().then()
    }

    onClickLogOut() {
        this.authService.logout()
    }

    private async checkPermissions() {
        const user = await this.authService.user
        if (!user) {
            return
        }
        this.canManageUsers = check(user as IUser, { resource: RESOURCES.USERS, ability: ABILITIES.EDIT })
        this.canManageRoles = check(user as IUser, { resource: RESOURCES.ROLES, ability: ABILITIES.EDIT })
    }
}
