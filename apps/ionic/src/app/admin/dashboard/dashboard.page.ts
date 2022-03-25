import { Component, OnInit } from '@angular/core'
import { link, pages } from '../../../shared/utils/pages.const'
import { ABILITIES, check, IUser, RESOURCES } from '@szakszolg-nx/api-interfaces'
import { AuthService } from '../../../shared/services/auth.service'

@Component({
    selector: 'nx12-dashboard',
    templateUrl: './dashboard.page.html',
    styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage {
    canManageUsers = false
    canManageRoles = false

    link = link
    pages = pages
    user: Partial<IUser> | null = null

    constructor(private readonly authService: AuthService) {}

    async ionViewDidEnter() {
        this.user = await this.authService.user
        this.checkPermissions().then()
    }

    onClickLogOut() {
        this.authService.logout()
    }

    private async checkPermissions() {
        /*const user = await this.authService.user
        this.user = user
        console.log(user)*/
        console.log(this.user)
        if (!this.user) {
            return
        }
        this.canManageUsers = check(this.user as IUser, { resource: RESOURCES.USERS, ability: ABILITIES.EDIT })
        this.canManageRoles = check(this.user as IUser, { resource: RESOURCES.ROLES, ability: ABILITIES.EDIT })
    }
}
