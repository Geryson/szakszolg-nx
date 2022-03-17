import { Observable } from 'rxjs'
import { ConfirmationService, MessageService } from 'primeng/api'
import { TranslatePipe } from '@ngx-translate/core'
import { LoadingController } from '@ionic/angular'
import { APP_INJECTOR } from '../../app/app.module'

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

export async function showLoading(translationKey = '') {
    const loadingController = APP_INJECTOR.get(LoadingController)
    const translate = APP_INJECTOR.get(TranslatePipe)

    const l = await loadingController.create(
        translationKey
            ? {
                  message: translate.transform(`${translationKey}.LOADING`),
              }
            : {},
    )
    l.present().then()
    return l
}
