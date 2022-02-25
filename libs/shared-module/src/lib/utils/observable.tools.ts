import { Observable } from 'rxjs'
import { catchError } from 'rxjs/operators'

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
