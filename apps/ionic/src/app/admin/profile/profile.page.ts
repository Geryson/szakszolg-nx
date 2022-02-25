import { Component, OnInit } from '@angular/core'
import { AuthService, Log, RedirectService } from '@szakszolg-nx/shared-module'
import { link, pages } from '../../../shared/utils/pages.const'

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
