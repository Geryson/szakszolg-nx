import { Component, Inject, OnInit } from '@angular/core'
import { IonInput } from '@ionic/angular'
import { BehaviorSubject } from 'rxjs'
import { RedirectService, Log, AUTH_SERVICE, AuthService } from '@szakszolg-nx/shared-module'
import { AlertService } from '../../../shared/services/alert.service'
import { pages } from '../../../shared/utils/pages.const'

@Component({
    selector: 'nx12-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
    email = ''
    password = ''

    private readonly _valid = new BehaviorSubject(false)

    constructor(
        @Inject(AUTH_SERVICE) private readonly authService: AuthService,
        private readonly redirect: RedirectService,
        private readonly alert: AlertService,
    ) {}

    get valid() {
        return this._valid
    }

    ngOnInit() {
        // Note: ngOnInit is synchronous
        this.authService.check().then(async (isLoggedIn) => {
            if (!isLoggedIn) return

            const loading = await this.alert.loading('MESSAGE.LOGIN_WITH_SAVED_TOKEN')
            this.redirect.to(pages.admin.dashboard)
            loading.dismiss().then()
        })
    }

    focus(element: IonInput) {
        element.setFocus().then()
    }

    async login(event: any) {
        event.preventDefault()
        const loading = await this.alert.loading()
        try {
            await this.authService.login(this.email, this.password)
            this.redirect.to(pages.admin.dashboard)
        } catch (err: any) {
            Log.error('LoginPage::login->catch', err)
            await this.alert.show('LOGIN_UNSUCCESSFUL')
        } finally {
            await loading.dismiss().then()
        }
    }
}
