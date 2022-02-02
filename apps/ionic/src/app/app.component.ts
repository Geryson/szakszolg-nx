import { Component } from '@angular/core'
import { PrimeNGConfig } from 'primeng/api'

@Component({
    selector: 'nx12-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss'],
})
export class AppComponent {
    constructor(private primengConfig: PrimeNGConfig) {}

    ngOnInit() {
        this.primengConfig.ripple = true
    }
}
