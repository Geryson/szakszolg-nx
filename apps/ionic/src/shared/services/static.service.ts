import { Injectable } from '@angular/core'
import { TranslatePipe } from '@ngx-translate/core'

/**
 * This service provides static references to be used across the app, even outside of Angular DI containers.
 * Important: **ALWAYS** use getters instead of direct access to the properties, or you might corrupt the DI tree
 */
@Injectable({
    providedIn: 'root',
})
export class StaticService {
    constructor(translate: TranslatePipe) {
        StaticService._translatePipe = translate
    }

    private static _translatePipe: TranslatePipe

    static get translatePipe(): TranslatePipe {
        return StaticService._translatePipe
    }
}
