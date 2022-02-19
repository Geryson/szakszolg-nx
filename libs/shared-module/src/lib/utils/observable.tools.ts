import { Observable } from 'rxjs'
import { catchError } from 'rxjs/operators'

export function execute<T>(observable: Observable<T>): Promise<T> {
    return new Promise((resolve, reject) => {
        observable
            .pipe(
                catchError((err, caught) => {
                    reject(err)
                    return caught
                }),
            )
            .subscribe((value) => resolve(value))
    })
}
