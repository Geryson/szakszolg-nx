/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { APP_INJECTOR } from '../../app/app.module'
import { TranslateService } from '@ngx-translate/core'
import { firstValueFrom } from 'rxjs'
import { IQuiz } from '@szakszolg-nx/api-interfaces'
import { Log } from './log.tools'
import { debounce } from './object.tools'

export function translate(key: string, params?: any): Promise<string> {
    const translate = APP_INJECTOR.get(TranslateService)
    return firstValueFrom(translate.get(key, { ...params }))
}
export interface IValidatorOptions<T> {
    initialDebounceTime?: number
    debounceTime?: number
    bufferTime?: number
    subject?: Partial<T>
    subjectFactory?: (prop: string) => Partial<T>
    attributeFactory?: (prop: string) => any
    translationKey: string
    validChecker?: (validator: Validator<T>) => boolean
    rules: { [key: string]: (survey: Partial<T>, attribute: any) => boolean }
    properties: string[]
}
export class Validator<T> {
    valid = false
    validationErrors: { [key: string]: string } = {}
    options: IValidatorOptions<T> = { translationKey: '', rules: {}, properties: [] }

    init(options: IValidatorOptions<T>) {
        debounce(() => this.debouncedInit(options), options.initialDebounceTime || 50).then()
    }

    getSubject(prop = ''): Partial<T> {
        return (this.options.subject ?? this.options.subjectFactory?.(prop))!
    }

    check(prop: string | null = null, addError = true): Promise<boolean> {
        return debounce(() => this.debouncedCheck(prop, addError), this.options.debounceTime || 300)
    }

    private debouncedCheck(prop: string | null, addError: boolean) {
        if (!prop) {
            Log.debug('Validator::check', 'check all')
            for (const str of this.options.properties) {
                this.check(str as keyof IQuiz)
            }
            return false
        }

        if (!this.options.rules[prop]) return true

        const validation = this.options.rules[prop](
            this.getSubject(prop),
            this.options.attributeFactory
                ? this.options.attributeFactory(prop)
                : this.getSubject(prop)[prop as keyof T],
        )
        setTimeout(async () => {
            if (!validation) {
                if (addError) {
                    this.validationErrors[prop] = await translate(
                        `${this.options.translationKey}.ERROR.${prop.toUpperCase()}`,
                    )
                }
            } else delete this.validationErrors[prop]
            this.valid = this.options.validChecker?.(this) ?? Object.keys(this.validationErrors).length === 0
            Log.debug('Validator::check', `${prop} is ${validation ? 'valid' : 'invalid'}`, this.validationErrors)
        }, this.options.bufferTime ?? 100)

        return validation
    }

    private debouncedInit(options: IValidatorOptions<T>) {
        if (!options.subject && !options.subjectFactory) throw 'Either subject or subjectFactory must be defined'
        this.options = options
        setTimeout(() => {
            Log.debug('Validator::init', 'options', options)
            for (const str of this.options.properties) {
                if (!this.check(str, false)) {
                    this.validationErrors[str] = ''
                }
            }
        }, options.bufferTime || 100)
    }
}
