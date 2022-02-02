import { Router } from '@angular/router'
import { Location } from '@angular/common'

export interface IRedirectService {
    urls: string[]
    router: Router
    location: Location
    readonly next: string

    push(url: string): void

    login(): any

    to(url: string, extra: any, hardJump: boolean, callback: (success: boolean) => any): void

    intendedOr(defaultTarget: string, hardJump: boolean): void

    back(): any
}
