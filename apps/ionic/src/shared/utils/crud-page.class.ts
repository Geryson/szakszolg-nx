/* eslint-disable @angular-eslint/component-class-suffix,@typescript-eslint/no-non-null-assertion */
import { Component, OnDestroy, OnInit } from '@angular/core'
import { link, pages } from './pages.const'
import { NG_ICON } from './prime-icons.class'
import { QueryRef } from 'apollo-angular'
import { Subscription } from 'rxjs'
import { APP_INJECTOR } from '../../app/app.module'
import { IResourceService } from '@szakszolg-nx/ng-interfaces'
import { ABILITIES, check, IApiResource, IUser } from '@szakszolg-nx/api-interfaces'
import { confirmThenDelete } from './observable.tools'
import { LoadingController } from '@ionic/angular'
import { AuthService } from '../services/auth.service'
import { RedirectService } from '../services/redirect.service'
import { Log } from './log.tools'

@Component({ selector: 'nx12-abstract-crud-page', template: `<div></div>` })
export abstract class CrudPageClass<T extends IApiResource, TQueryRef> implements OnInit, OnDestroy {
    pages = pages
    link = link
    NG_ICON = NG_ICON

    values: Partial<T>[] = []
    userCanEdit = false
    userCanDelete = false
    protected abstract resourceService: IResourceService<T, TQueryRef, any>
    protected abstract editPage: string
    protected abstract resourceName: string
    protected readonly loadingController: LoadingController
    private readonly authService: AuthService
    private readonly redirect: RedirectService
    private queryRef?: QueryRef<TQueryRef>
    private sub?: Subscription

    protected constructor() {
        this.authService = APP_INJECTOR.get<AuthService>(AuthService)
        this.loadingController = APP_INJECTOR.get<LoadingController>(LoadingController)
        this.redirect = APP_INJECTOR.get<RedirectService>(RedirectService)
    }

    ngOnDestroy() {
        this.sub?.unsubscribe()
    }

    ionViewDidEnter() {
        this.queryRef?.refetch().then()
    }

    ngOnInit() {
        this.init()
    }

    editClick(obj: T) {
        this.redirect.to(`${this.editPage}/${obj._id}`)
    }

    deleteClick(obj: T) {
        confirmThenDelete(obj._id, this.resourceService, this.queryRef!, `MANAGE_${this.resourceName.replace('-','_').toUpperCase()}`)
    }

    addClick() {
        this.redirect.to(`${this.editPage}/new`)
    }

    private async checkPerms() {
        const user = await this.authService.user
        this.userCanEdit = check(user as IUser, { resource: this.resourceName, ability: ABILITIES.EDIT })
        this.userCanDelete = check(user as IUser, { resource: this.resourceName, ability: ABILITIES.DELETE })
    }

    private init() {
        Log.debug('CrudPageClass.init()', 'HIT')
        this.checkPerms().then()
        this.queryRef = this.resourceService.browse()
        this.sub = this.queryRef.valueChanges.subscribe(
            ({ data }: any) => (this.values = data[Object.keys(data)[0]]?.map((item: object) => ({ ...item }))),
        )
    }
}
