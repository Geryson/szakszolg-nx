import { Observable } from 'rxjs'
import { catchError } from 'rxjs/operators'
import { ConfirmationService, MessageService } from 'primeng/api'
import { APP_INJECTOR } from '../../../../../apps/ionic/src/app/app.module'
import { TranslatePipe } from '@ngx-translate/core'
import { LoadingController } from '@ionic/angular'

/**
 * Helper function to execute an observable once and return the result. Then the observable is disposed.
 * @param observable The observable to execute once.
 * @returns A promise that resolves to the first result of the observable. Then the observable is disposed.
 */
export function task<T>(observable: Observable<T>): Promise<T> {
    return new Promise((resolve, reject) => {
        const obs = observable
            .pipe(
                catchError((err, caught) => {
                    reject(err)
                    return caught
                }),
            )
            .subscribe((value) => resolve(value))
        return obs
    })
}

export function confirmThenDelete(
    id: string,
    resourceService: { destroy: (id: string) => Observable<any> },
    queryRef: { refetch: () => any },
) {
    const confirmation = APP_INJECTOR.get(ConfirmationService)
    const translate = APP_INJECTOR.get(TranslatePipe)
    const loadingController = APP_INJECTOR.get(LoadingController)
    const toast = APP_INJECTOR.get(MessageService)

    confirmation.confirm({
        message: translate.transform('MANAGE_HANGMAN_WORDS.DELETE_WORD_CONFIRM'),
        closeOnEscape: true,
        accept: () => {
            resourceService.destroy(id).subscribe(async () => {
                const loading = await loadingController.create()
                loading.present().then()
                await queryRef?.refetch()
                toast.add({
                    severity: 'success',
                    summary: translate.transform('MANAGE_HANGMAN_WORDS.WORD_DELETED'),
                    detail: translate.transform('MANAGE_HANGMAN_WORDS.WORD_DELETED_DETAIL'),
                })
                loading.dismiss().then()
            })
        },
    })
}
