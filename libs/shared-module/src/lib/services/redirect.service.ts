import { Injectable } from '@angular/core'
import { Route } from '@angular/router'
import { Location } from '@angular/common'
import { IPageRecord, IRedirectService } from '@szakszolg-nx/ng-interfaces'
import { NavController } from '@ionic/angular'

export const HOME = '/'

@Injectable({
    providedIn: 'root',
})
export class RedirectService implements IRedirectService {
    urls: string[] = []

    constructor(public router: NavController, public location: Location) {}

    get next() {
        return this.urls[this.urls.length - 1]
    }

    push(url: string) {
        this.urls.push(url)
    }

    to(
        url: string | undefined | (IPageRecord & Route),
        extra: any = {},
        hardJump = false,
        callback: ((r: boolean) => void) | null = null,
    ) {
        if (!(typeof url === 'string')) url = url?.path || HOME
        if (hardJump) window.location.replace(url)
        else this.router.navigateForward(url, { state: extra }).then((r) => callback?.(r))
    }

    intendedOr(defaultTarget: string = HOME, hardJump = false) {
        const url = this.urls.pop() ?? defaultTarget
        if (hardJump) window.location.replace(url)
        else this.router.navigateForward(url).then()
    }

    back() {
        return this.location.back()
    }
}
