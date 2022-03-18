/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Component, Inject, OnDestroy, OnInit } from '@angular/core'
import { link, pages } from '../../../shared/utils/pages.const'
import { UserService } from '../../../shared/services/user.service'
import { ABILITIES, check, IUser, RESOURCES } from '@szakszolg-nx/api-interfaces'
import { QueryRef } from 'apollo-angular'
import { Subscription } from 'rxjs'
import { NG_ICON } from '../../../shared/utils/prime-icons.class'
import { confirmThenDelete } from '../../../shared/utils/observable.tools'
import { AuthService } from '../../../shared/services/auth.service'
import { RedirectService } from '../../../shared/services/redirect.service'
import { Log } from '../../../shared/utils/log.tools'

@Component({
    selector: 'nx12-manage-users',
    templateUrl: './manage-users.page.html',
    styleUrls: ['./manage-users.page.scss'],
})
export class ManageUsersPage implements OnInit, OnDestroy {
    pages = pages
    link = link
    NG_ICON = NG_ICON
    users: Partial<IUser>[] = []
    userCanEditUsers = false
    userCanDeleteUsers = false
    private queryRef?: QueryRef<{ users: Partial<IUser>[] }>
    private sub?: Subscription

    constructor(
        private readonly authService: AuthService,
        private readonly userService: UserService,
        private readonly redirect: RedirectService,
    ) {}

    onClickLogOut() {
        this.authService.logout()
    }

    ngOnInit() {
        this.checkPerms().then()
        this.queryRef = this.userService.browse()
        this.sub = this.queryRef.valueChanges.subscribe(
            (res) => (this.users = res.data.users.map((user) => ({ ...user }))),
        )
    }

    ngOnDestroy() {
        this.sub?.unsubscribe()
    }

    editClick(user: IUser) {
        this.redirect.to(`${pages.admin.users}/${user._id}`)
    }

    deleteClick(user: IUser) {
        confirmThenDelete(user._id, this.userService, this.queryRef!, 'MANAGE_USERS')
    }

    private async checkPerms() {
        const user = await this.authService.user
        this.userCanEditUsers = check(user as IUser, { resource: RESOURCES.USERS, ability: ABILITIES.EDIT })
        this.userCanDeleteUsers = check(user as IUser, { resource: RESOURCES.USERS, ability: ABILITIES.DELETE })
    }
}
