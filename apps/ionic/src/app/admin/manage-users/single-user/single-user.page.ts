/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { IUser } from '@szakszolg-nx/api-interfaces'
import { UserService } from '../../../../shared/services/user.service'
import { QueryRef } from 'apollo-angular'
import { NG_ICON } from '../../../../shared/utils/prime-icons.class'
import {ConfirmationService, MessageService} from 'primeng/api'
import { TranslatePipe } from '@ngx-translate/core'
import { link, pages } from '../../../../shared/utils/pages.const'
import { firstValueFrom } from 'rxjs'
import { AuthService } from '../../../../shared/services/auth.service'
import { omit } from '../../../../shared/utils/object.tools'
import { Log } from '../../../../shared/utils/log.tools'
import {STORAGE_KEY} from "../../../../shared/utils/constants";
import {StorageService} from "../../../../shared/services/storage.service";
import { translate } from 'apps/ionic/src/shared/utils/translation.tools'
import {RedirectService} from "../../../../shared/services/redirect.service";
import {Toast} from "primeng/toast";

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
    password = ''
    passwordDialog = false
    dialogCallback: (() => void) | null = null
    private queryRef?: QueryRef<any>
    private loading = false
    activeUser = ''
    newPasswordConfirm = ''

    constructor(
        private readonly authService: AuthService,
        private readonly activatedRoute: ActivatedRoute,
        private readonly userService: UserService,
        private readonly confirmation: ConfirmationService,
        private readonly translate: TranslatePipe,
        private readonly redirect: RedirectService,
        private readonly toast: MessageService,
    ) {}

    async enter(){
        this.loading = true
        this.newPasswordConfirm = ''
        const params = await firstValueFrom(this.activatedRoute.params)
        this.activeUser = params.id
        this.queryRef = params.id === 'me' ? this.userService.profile() : this.userService.read(params.id)
        this.queryRef.valueChanges.subscribe(({ data }) => {
            if(data.user) {
                this.user = { ...data.user }
                this.originalUser = { ...data.user }
            } else {
                this.user = {...data.profile}
                this.originalUser = {...data.profile}
            }
            this.loading = false
        })
    }

    ngOnInit() {
        this.enter().then()
    }

    ionViewDidEnter() {
        this.enter().then()
    }

    async save(props: string[]) {
        if(this.user['newPassword'] !== this.newPasswordConfirm && this.newPasswordConfirm.length > 0){
            this.validationErrors['newPasswordConfirm'] = await translate(`USER_EDIT.ERROR.newPasswordConfirm`)
            return
        }
        this.validationErrors['newPasswordConfirm'] = ''
        for (const prop in props){
            this.loading = true
            if (this.user.password) {

                this.saveLogic(prop)
                return
            }
            this.passwordDialog = true
            this.dialogCallback = () => this.saveLogic(prop)
        }

    }

    saveLogic(prop: string) {
        this.editing[prop] = false
        this.validationErrors[prop] = ''
        this.user['newPasswordConfirm'] = this.newPasswordConfirm
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
        if (prop === 'newPasswordConfirm')
            return

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

    async onClickLogout() {
        await this.savePassword()

        this.authService.logout()
        this.redirect.to(pages.admin.login)
        this.toast.add({summary: 'Sikeres adatmódosítás, kérlek jelentkezz be újra!', severity: 'success'})
    }

}

const validations: { [key: string]: (value: string, attribute: string) => boolean } = {
    username: (value, __) => value.length > 3,
    email: (value, __) =>
        !!value
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            ),
    newPassword: (value, __) => value.length > 3 && !!value.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/),
    om: (value, __) => !!value.match(/^7[0-9]{10}$/),
}
