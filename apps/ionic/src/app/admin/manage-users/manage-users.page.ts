import { Component, Inject, OnInit } from '@angular/core'
import { link, pages } from '../../../shared/utils/pages.const'
import { AUTH_SERVICE, AuthService } from '@szakszolg-nx/shared-module'
import { UserService } from '../../../shared/services/user.service'
import { EmptyObject } from 'apollo-angular/build/types'
import { IUser } from '@szakszolg-nx/api-interfaces'
import { QueryRef } from 'apollo-angular'
import { Observable } from 'rxjs'
import { ApolloQueryResult } from '@apollo/client'

@Component({
    selector: 'nx12-manage-users',
    templateUrl: './manage-users.page.html',
    styleUrls: ['./manage-users.page.scss'],
})
export class ManageUsersPage implements OnInit {
    pages = pages
    link = link
    users: Observable<ApolloQueryResult<{ users: Partial<IUser>[] }>> = new Observable()
    private usersQueryRef?: QueryRef<{ users: Partial<IUser>[] }, EmptyObject>

    constructor(
        @Inject(AUTH_SERVICE) private readonly authService: AuthService,
        private readonly userService: UserService,
    ) {}

    onClickLogOut() {
        this.authService.logout()
    }

    ngOnInit() {
        this.usersQueryRef = this.userService.browse()
        this.users = this.usersQueryRef.valueChanges
    }
}
