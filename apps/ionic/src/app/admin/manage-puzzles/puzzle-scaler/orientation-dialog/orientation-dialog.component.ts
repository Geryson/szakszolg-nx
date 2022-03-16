import { Component, Input, OnDestroy, OnInit } from '@angular/core'
import { Platform } from '@ionic/angular'
import { Log } from '../../../../../shared/utils/log.tools'

@Component({
    selector: 'nx12-orientation-dialog',
    templateUrl: './orientation-dialog.component.html',
    styleUrls: ['./orientation-dialog.component.scss'],
})
export class OrientationDialogComponent implements OnInit, OnDestroy {
    @Input() failedOrientationLock!: boolean
    @Input() requiredOrientation!: 'portrait' | 'landscape' | 'any'

    currentOrientation: 'portrait' | 'landscape' = 'portrait'
    wrongOrientation = false
    private polling?: NodeJS.Timer

    constructor(private readonly platform: Platform) {}

    ngOnInit() {
        this.platform.ready().then((p) => {
            if (p !== 'cordova') {
                Log.warn(
                    'OrientationDialogComponent::ngOnInit',
                    'Not running on mobile device. Skipping orientation lock.',
                )
                return
            }

            this.handleOrientationLock()
        })
    }

    ngOnDestroy() {
        if (!this.polling) return
        clearTimeout(this.polling)
    }

    private handleOrientationLock() {
        this.polling = setInterval(() => {
            this.currentOrientation = this.platform.isPortrait() ? 'portrait' : 'landscape'
            this.wrongOrientation =
                this.requiredOrientation === 'any' || this.requiredOrientation !== this.currentOrientation
        }, 500)
    }
}
