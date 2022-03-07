import { Component, OnInit } from '@angular/core'
import { link, pages } from '../../../shared/utils/pages.const'
import { RedirectService } from '../../../shared/services/redirect.service'
import { AuthService } from '../../../shared/services/auth.service'
import { Log } from '../../../shared/utils/log.tools'

@Component({
    selector: 'nx12-profile',
    templateUrl: './profile.page.html',
    styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
    constructor(private readonly redirect: RedirectService, private readonly auth: AuthService) {}

    async ngOnInit() {
        const user = await this.auth.user
        this.redirect.push(`${link(pages.admin.users)}/${user?._id}`)
        if (!user) {
            Log.error('ProfilePage::ngOnInit', 'User not found')
            this.redirect.to(link(pages.admin.login))
        }
        this.redirect.intendedOr()
    }
}
