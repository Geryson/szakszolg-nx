/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { APP_INJECTOR } from '../../app/app.module'
import { TranslateService } from '@ngx-translate/core'
import { firstValueFrom } from 'rxjs'
import { IQuiz } from '@szakszolg-nx/api-interfaces'

export function translate(key: string, params?: any): Promise<string> {
    const translate = APP_INJECTOR.get(TranslateService)
    return firstValueFrom(translate.get(key, { ...params }))
}
export interface IValidatorOptions<T> {
    bufferTime?: number
    subject?: Partial<T>
    subjectFactory?: (prop: string) => Partial<T>
    attributeFactory?: (prop: string) => any
    translationKey: string
    validChecker?: (validator: Validator<T>) => boolean
    rules: { [key: string]: (survey: Partial<T>, attribute: unknown) => boolean }
    properties: string[]
}
export class Validator<T> {
    valid = false
    validationErrors: { [key: string]: string } = {}

    constructor(public readonly options: IValidatorOptions<T>) {
        for (const str of this.options.properties) this.validationErrors[str] = ''
        if (!options.subject && !options.subjectFactory) throw new Error('subject or subjectFactory must be defined')
    }

    getSubject(prop = ''): Partial<T> {
        return (this.options.subject ?? this.options.subjectFactory?.(prop))!
    }

    check(prop: string | null = null) {
        if (!prop) {
            for (const str of this.options.properties) {
                this.check(str as keyof IQuiz)
            }
            return
        }

        if (!this.options.rules[prop]) return

        const validation = this.options.rules[prop](
            this.getSubject(prop),
            this.options.attributeFactory
                ? this.options.attributeFactory(prop)
                : this.getSubject(prop)[prop as keyof T],
        )
        setTimeout(async () => {
            if (!validation) {
                this.validationErrors[prop] = await translate(
                    `${this.options.translationKey}.ERROR.${prop.toUpperCase()}`,
                )
            } else delete this.validationErrors[prop]
        }, this.options.bufferTime ?? 50)
        this.valid = this.options.validChecker?.(this) ?? Object.keys(this.validationErrors).length === 0
    }
}
