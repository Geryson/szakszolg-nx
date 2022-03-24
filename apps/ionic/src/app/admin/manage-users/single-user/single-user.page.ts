/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { IUser } from '@szakszolg-nx/api-interfaces'
import { UserService } from '../../../../shared/services/user.service'
import { QueryRef } from 'apollo-angular'
import { NG_ICON } from '../../../../shared/utils/prime-icons.class'
import { ConfirmationService } from 'primeng/api'
import { TranslatePipe } from '@ngx-translate/core'
import { link, pages } from '../../../../shared/utils/pages.const'
import { firstValueFrom } from 'rxjs'
import { AuthService } from '../../../../shared/services/auth.service'
import { omit } from '../../../../shared/utils/object.tools'
import { Log } from '../../../../shared/utils/log.tools'
import {STORAGE_KEY} from "../../../../shared/utils/constants";
import {StorageService} from "../../../../shared/services/storage.service";

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


    constructor(
        private readonly authService: AuthService,
        private readonly activatedRoute: ActivatedRoute,
        private readonly userService: UserService,
        private readonly confirmation: ConfirmationService,
        private readonly translate: TranslatePipe,
    ) {}

    async enter(){
        this.loading = true
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
                console.log(this.user)
            }
            this.loading = false
        })
        console.log(this.user)
    }

    ngOnInit() {
        this.enter().then()
    }

    ionViewDidEnter() {
        this.enter().then()
    }

    async save(props: string[]) {
        for (const prop in props){
            console.log(this.user.password)
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
        this.userService.edit(this.user!._id, omit(this.user!, '_id')).subscribe(() => {
            Log.debug('SingleUserPage::save->subscribe', 'User updated', this.user)
            this.originalUser = { ...this.user }
            console.log(this.originalUser)
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
        {
            return
        }
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
    username: (value, __) => value.length > 3,
    email: (value, __) =>
        !!value
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            ),
    newPassword: (value, __) => value.length > 3 && !!value.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/),
    //newPasswordConfirm: (value, __) => this.newPassword().length > 0 ? value === this.newPassword() : false,
    om: (value, __) => !!value.match(/^7[0-9]{10}$/),
}
