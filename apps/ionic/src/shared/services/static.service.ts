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
    static translatePipe: TranslatePipe

    constructor(translate: TranslatePipe) {
        StaticService.translatePipe = translate
    }

    init() {
        // do nothing
    }
}
