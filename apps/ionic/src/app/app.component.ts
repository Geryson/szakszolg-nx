import { Component, OnInit } from '@angular/core'
import { PrimeNGConfig } from 'primeng/api'
import { TranslateService } from '@ngx-translate/core'
import { StaticService } from '../shared/services/static.service'

@Component({
    selector: 'nx12-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
    constructor(
        private readonly primengConfig: PrimeNGConfig,
        private readonly translateService: TranslateService,
        private readonly staticService: StaticService,
    ) {}

    ngOnInit() {
        this.primengConfig.ripple = true
        this.translateService.setDefaultLang('hu')
        this.translateService.use('hu')
        this.translate('hu')
        this.staticService.init()
    }

    translate(lang: string) {
        this.translateService.use(lang)
        this.translateService.get('primeng').subscribe((res) => this.primengConfig.setTranslation(res))
    }
}
