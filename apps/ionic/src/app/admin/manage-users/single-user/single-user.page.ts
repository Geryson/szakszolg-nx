import { Component, Inject, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { IUser } from '@szakszolg-nx/api-interfaces'
import { UserService } from '../../../../shared/services/user.service'
import { EmptyObject } from 'apollo-angular/build/types'
import { QueryRef } from 'apollo-angular'
import { AUTH_SERVICE, AuthService, Log, omit, task } from '@szakszolg-nx/shared-module'
import { NG_ICON } from '../../../../shared/utils/prime-icons.class'
import { ConfirmationService } from 'primeng/api'
import { TranslatePipe } from '@ngx-translate/core'
import { link, pages } from '../../../../shared/utils/pages.const'

@Component({
    selector: 'nx12-single-user',
    templateUrl: './single-user.page.html',
    styleUrls: ['./single-user.page.scss'],
})
export class SingleUserPage implements OnInit {
    NG_ICON = NG_ICON
    link = link
    pages = pages
    user: Partial<IUser> | null | any = null
    originalUser: Partial<IUser> | null | any = null
    editing: Record<string, boolean> = {}
    validationErrors: Record<string, string> = {}
    password: string = ''
    passwordDialog = false
    dialogCallback: (() => void) | null = null
    private queryRef?: QueryRef<{ user: Partial<IUser> }, EmptyObject>
    private loading = false

    constructor(
        @Inject(AUTH_SERVICE) private readonly authService: AuthService,
        private readonly activatedRoute: ActivatedRoute,
        private readonly userService: UserService,
        private readonly confirmation: ConfirmationService,
        private readonly translate: TranslatePipe,
    ) {}

    async ngOnInit() {
        this.loading = true
        const params = await task(this.activatedRoute.params)
        this.queryRef = this.userService.read(params.id)
        this.queryRef.valueChanges.subscribe(({ data }) => {
            this.user = { ...data.user }
            this.originalUser = { ...data.user }
            this.loading = false
        })
    }

    async save(prop: string) {
        this.loading = true
        if (this.user.password) {
            this.saveLogic(prop)
            return
        }
        this.passwordDialog = true
        this.dialogCallback = () => this.saveLogic(prop)
    }

    saveLogic(prop: string) {
        this.editing[prop] = false
        this.validationErrors[prop] = ''
        this.userService.edit(this.user!._id, omit(this.user!, '_id')).subscribe(() => {
            Log.debug('SingleUserPage::save->subscribe', 'User updated', this.user)
            this.originalUser = { ...this.user }
            this.loading = false
        })
    }

    cancel(prop: string = '') {
        if (prop) {
            this.editing[prop] = false
            this.validationErrors[prop] = ''
        }
        this.user = { ...this.originalUser }
        this.passwordDialog = false
    }

    check(prop: string) {
        const validation = validations[prop](this.user![prop], prop)
        setTimeout(() => {
            if (!validation) this.validationErrors[prop] = this.translate.transform(`USER_EDIT.ERROR.${prop}`)
            else this.validationErrors[prop] = ''
        }, 50)
        return !validation
    }

    savePassword() {
        this.passwordDialog = false
        this.dialogCallback?.()
        this.dialogCallback = null
    }

    onClickLogOut() {
        this.authService.logout()
    }
}

const validations: { [key: string]: (value: string, attribute: string) => boolean } = {
    username: (value, _) => value.length > 3,
    email: (value, _) =>
        !!value
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            ),
    newPassword: (value, _) => value.length > 3 && !!value.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/),
    om: (value, _) => !!value.match(/^7[0-9]{10}$/),
}
