import { Location } from '@angular/common'
import { NavController } from '@ionic/angular'

export interface IRedirectService {
    urls: string[]
    router: NavController
    location: Location
    readonly next: string

    push(url: string): void

    to(url: string, extra: any, hardJump: boolean, callback: (success: boolean) => any): void

    intendedOr(defaultTarget: string, hardJump: boolean): void

    back(): any
}
