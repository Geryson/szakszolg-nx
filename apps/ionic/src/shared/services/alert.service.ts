import { Injectable } from '@angular/core'
import { AlertController, AlertOptions, LoadingController } from '@ionic/angular'
import { TranslatePipe } from '@ngx-translate/core'
import { StaticService } from './static.service'

@Injectable({
    providedIn: 'root',
})
export class AlertService {
    constructor(
        private readonly alert: AlertController,
        private readonly translate: TranslatePipe,
        private readonly loadingController: LoadingController,
    ) {}

    async show(message: string, buttons: string[] = ['OKE'], header: string = 'ALERT', options?: AlertOptions) {
        const translated = {
            buttons: Promise.all(
                buttons.map(
                    async (button): Promise<string> => this.translate.transform(`BUTTONS.${button.toUpperCase()}`),
                ),
            ),
            header: this.translate.transform(`HEADER.${header.toUpperCase()}`),
            message: this.translate.transform(`MESSAGE.${message.toUpperCase()}`),
        }

        return this.alert
            .create({
                ...options,
                header: await translated.header,
                message: await translated.message,
                buttons: await translated.buttons,
            })
            .then((alert) => alert.present())
    }

    async loading(message: string | null = null) {
        const loading = await this.loadingController.create({
            message: StaticService.translatePipe.transform(message ?? 'MESSAGE.LOADING'),
            duration: 10_000,
        })
        loading.present().then()
        return loading
    }
}
