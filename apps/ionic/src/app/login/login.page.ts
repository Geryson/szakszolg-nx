import { Component, OnInit } from '@angular/core'
import { IonInput, LoadingController } from '@ionic/angular'
import { BehaviorSubject } from 'rxjs'
import { AuthService } from '../../shared/services/auth.service'
import { AlertService } from '../../shared/services/alert.service'
import { RedirectService } from '@szakszolg-nx/shared-module'

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
        private readonly authService: AuthService,
        private readonly redirect: RedirectService,
        private readonly alert: AlertService,
    ) {}

    get valid() {
        return this._valid
    }

    ngOnInit() {
        this.authService.check().then((isLoggedIn) => {
            if (isLoggedIn) {
                this.alert.loading('MESSAGE.LOGIN_WITH_SAVED_TOKEN').then((loading) => {
                    this.redirect.to('/admin')
                    loading.dismiss().then()
                })
            }
        })
    }

    goto(element: IonInput) {
        element.setFocus().then()
    }

    async login() {
        const loading = await this.alert.loading()
        try {
            await this.authService.login(this.email, this.password)
        } catch (error: any) {
            console.error(error)
            await this.alert.show('LOGIN_UNSUCCESSFUL')
        } finally {
            await loading.dismiss().then()
        }
    }
}
