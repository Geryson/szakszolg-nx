import { Observable } from 'rxjs'
import { ConfirmationService, MessageService } from 'primeng/api'
import { TranslatePipe } from '@ngx-translate/core'
import { AlertController, LoadingController } from '@ionic/angular'
import { APP_INJECTOR } from '../../app/app.module'
import { translate } from './translation.tools'

export function confirmThenDelete(
    id: string,
    resourceService: { destroy: (id: string) => Observable<any> },
    queryRef: { refetch: () => any },
    translationKey: string,
) {
    translationKey = translationKey.toUpperCase()
    const confirmation = APP_INJECTOR.get(ConfirmationService)
    const translate = APP_INJECTOR.get(TranslatePipe)
    const loadingController = APP_INJECTOR.get(LoadingController)
    const toast = APP_INJECTOR.get(MessageService)

    confirmation.confirm({
        message: translate.transform(`${translationKey}.DELETE_CONFIRM`),
        closeOnEscape: true,
        accept: () => {
            resourceService.destroy(id).subscribe(async () => {
                const loading = await loadingController.create()
                loading.present().then()
                await queryRef?.refetch()
                toast.add({
                    severity: 'success',
                    summary: translate.transform(`${translationKey}.DELETED`),
                    detail: translate.transform(`${translationKey}.DELETED_DETAIL`),
                })
                loading.dismiss().then()
            })
        },
    })
}

export async function presentConfirmation(message: string, header: string = ''): Promise<boolean> {
    const confirmation = APP_INJECTOR.get(ConfirmationService)
    await Promise.all([
        async () => (message = await translate(message)),
        async () => (header = header === '' ? '' : await translate(header)),
    ])
    return new Promise((resolve) => {
        confirmation.confirm({
            message,
            header,
            closeOnEscape: false,
            accept: () => resolve(true),
            reject: () => resolve(false),
        })
    })
}

export async function presentAlert(message: string, header: string = ''): Promise<void> {
    const alert = APP_INJECTOR.get(AlertController)

    await Promise.all([
        async () => (message = await translate(message)),
        async () => (header = header === '' ? '' : await translate(header)),
    ])

    return new Promise((resolve) => {
        alert
            .create({
                header,
                message,
                buttons: ['OK'],
            })
            .then((d) => d.present().then(() => resolve()))
    })
}

export async function presentLoading(translationKey = '') {
    const loadingController = APP_INJECTOR.get(LoadingController)

    const l = await loadingController.create(
        translationKey
            ? {
                  message: await translate(`${translationKey}.LOADING`),
              }
            : {},
    )
    l.present().then()
    return l
}
