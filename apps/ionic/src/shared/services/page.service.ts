import { Injectable } from '@angular/core'
import { IPageRecord } from '@szakszolg-nx/ng-interfaces'
// import { GuestGuard } from '../auth/guest.guard'
// import { UserGuard } from '../auth/user.guard'

@Injectable({
    providedIn: 'root',
})
export class PageService {
    #appPages: IPageRecord[] = [
        // { title: 'Bejelentkezés', url: '/login', guards: [GuestGuard] },
        // { title: 'Regisztráció', url: '/register', guards: [GuestGuard] },
        // { title: 'Profil', url: '/profile', guards: [UserGuard] },
        { title: 'Kapcsolat', url: '/contact_us' },
        { title: 'Névjegy', url: '/about' },
        // { title: 'Kijelentkezés', url: '/auth/logout', guards: [UserGuard] }
    ]

    constructor() {}

    get appPages() {
        return this.#appPages
    }
}
