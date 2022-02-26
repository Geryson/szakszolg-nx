import { Component, OnDestroy, OnInit } from '@angular/core'
import { link, pages } from './pages.const'
import { NG_ICON } from './prime-icons.class'
import { QueryRef } from 'apollo-angular'
import { Subscription } from 'rxjs'
import { APP_INJECTOR } from '../../app/app.module'
import { AUTH_SERVICE, AuthService, confirmThenDelete, RedirectService } from '@szakszolg-nx/shared-module'
import { IResourceService } from '@szakszolg-nx/ng-interfaces'
import { ABILITIES, check, IApiResource, IUser } from '@szakszolg-nx/api-interfaces'

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
    private readonly authService: AuthService
    private readonly redirect: RedirectService
    private queryRef?: QueryRef<TQueryRef>
    private sub?: Subscription

    protected constructor() {
        this.authService = APP_INJECTOR.get<AuthService>(AUTH_SERVICE)
        this.redirect = APP_INJECTOR.get<RedirectService>(RedirectService)
    }

    ngOnDestroy() {
        this.sub?.unsubscribe()
    }

    ngOnInit() {
        this.checkPerms().then()
        this.queryRef = this.resourceService.browse()
        this.sub = this.queryRef.valueChanges.subscribe(
            ({ data }: any) => (this.values = data[Object.keys(data)[0]]?.map((item: object) => ({ ...item }))),
        )
    }

    editClick(obj: T) {
        this.redirect.to(`${this.editPage}/${obj._id}`)
    }

    deleteClick(obj: T) {
        confirmThenDelete(obj._id, this.resourceService, this.queryRef!)
    }

    addClick() {
        this.redirect.to(`${this.editPage}/new`)
    }

    private async checkPerms() {
        const user = await this.authService.user
        this.userCanEdit = check(user as IUser, { resource: this.resourceName, ability: ABILITIES.EDIT })
        this.userCanDelete = check(user as IUser, { resource: this.resourceName, ability: ABILITIES.DELETE })
    }
}
