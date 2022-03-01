import { Component, Inject, Input, OnInit } from '@angular/core'
import { NavController } from '@ionic/angular'
import { AUTH_SERVICE, AuthService } from '@szakszolg-nx/shared-module'

@Component({
    selector: 'nx12-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
    @Input() title = ''

    constructor(@Inject(AUTH_SERVICE) private readonly authService: AuthService, private readonly nav: NavController) {}

    ngOnInit() {}

    back() {
        this.nav.back()
    }

    onClickLogOut() {
        this.authService.logout()
    }
}
