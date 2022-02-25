import { Component, Inject, OnDestroy, OnInit } from '@angular/core'
import { link, pages } from '../../../shared/utils/pages.const'
import { AUTH_SERVICE, AuthService, Log, RedirectService } from '@szakszolg-nx/shared-module'
import { UserService } from '../../../shared/services/user.service'
import { EmptyObject } from 'apollo-angular/build/types'
import { ABILITIES, check, IUser, RESOURCES } from '@szakszolg-nx/api-interfaces'
import { QueryRef } from 'apollo-angular'
import { Subscription } from 'rxjs'
import { NG_ICON } from '../../../shared/utils/prime-icons.class'
import { ConfirmationService, MessageService } from 'primeng/api'
import { LoadingController } from '@ionic/angular'
import { TranslatePipe } from '@ngx-translate/core'

@Component({
    selector: 'nx12-manage-users',
    templateUrl: './manage-users.page.html',
    styleUrls: ['./manage-users.page.scss'],
})
export class ManageUsersPage implements OnInit, OnDestroy {
    pages = pages
    link = link
    users: Partial<IUser>[] = []
    NG_ICON = NG_ICON
    userCanEditUsers = false
    userCanDeleteUsers = false
    private usersQueryRef?: QueryRef<{ users: Partial<IUser>[] }, EmptyObject>
    private sub?: Subscription

    constructor(
        @Inject(AUTH_SERVICE) private readonly authService: AuthService,
        private readonly redirect: RedirectService,
        private readonly userService: UserService,
        private readonly confirmation: ConfirmationService,
        private readonly toast: MessageService,
        private readonly loading: LoadingController,
        private readonly translate: TranslatePipe,
    ) {}

    onClickLogOut() {
        this.authService.logout()
    }

    ngOnInit() {
        this.checkPerms().then()
        this.usersQueryRef = this.userService.browse()
        this.sub = this.usersQueryRef.valueChanges.subscribe(
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
        this.confirmation.confirm({
            message: this.translate.transform('MANAGE_USERS.DELETE_USER_CONFIRM'),
            closeOnEscape: true,
            accept: () => {
                this.userService.destroy(user._id).subscribe(async () => {
                    const loading = await this.loading.create()
                    loading.present().then()
                    await this.usersQueryRef?.refetch()
                    this.toast.add({
                        severity: 'success',
                        summary: this.translate.transform('MANAGE_USERS.USER_DELETED'),
                        detail: this.translate.transform('MANAGE_USERS.USER_DELETED_DETAIL'),
                    })
                    loading.dismiss().then()
                })
            },
        })
    }

    private async checkPerms() {
        const user = await this.authService.user
        this.userCanEditUsers = check(user as IUser, { resource: RESOURCES.USERS, ability: ABILITIES.EDIT })
        this.userCanDeleteUsers = check(user as IUser, { resource: RESOURCES.USERS, ability: ABILITIES.DELETE })
    }
}
