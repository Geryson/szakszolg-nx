import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RedirectService } from './services/redirect.service'
import { MapPipe } from './pipes/map.pipe'
import { JoinPipe } from './pipes/join.pipe'
import { NumberOnlyDirective } from './directives/number-only.directive'
import { AuthService } from './services/auth.service'
import { AUTH_SERVICE, REDIRECT_SERVICE } from './injector.tokens'

@NgModule({
    imports: [CommonModule],
    providers: [
        RedirectService,
        AuthService,
        { provide: AUTH_SERVICE, useClass: AuthService },
        { provide: REDIRECT_SERVICE, useClass: RedirectService },
    ],
    declarations: [MapPipe, JoinPipe, NumberOnlyDirective],
    exports: [MapPipe, JoinPipe, NumberOnlyDirective],
})
export class SharedModule {}
