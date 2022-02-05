import { Injectable, Injector } from '@angular/core'
import { BehaviorSubject, lastValueFrom } from 'rxjs'
import { HttpClient } from '@angular/common/http'
import { api } from '../utils/uri.tools'
import { StorageService } from './storage.service'
import { JwtHelperService } from '@auth0/angular-jwt'
import { Log, STORAGE_KEY } from '@szakszolg-nx/shared-module'

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    constructor(
        private readonly http: HttpClient,
        private readonly storage: StorageService,
        private readonly injector: Injector,
    ) {}

    private _tokenObject = new BehaviorSubject<any | null>(null)

    get tokenObject(): BehaviorSubject<any> {
        return this._tokenObject
    }

    private _jwtHelper: JwtHelperService | null = null

    get jwtHelper(): JwtHelperService {
        if (!this._jwtHelper) {
            this._jwtHelper = this.injector.get(JwtHelperService)
        }
        return this._jwtHelper
    }

    private _token = new BehaviorSubject<string | null>(null)

    get token(): string | null {
        return this._token.value
    }

    login(email: string, password: string) {
        const url = api('api/auth/login')
        return lastValueFrom(this.http.post<{ access_token: string }>(url, { email, password })).then(
            ({ access_token }) => {
                Log.debug('AuthService::login->lastValueFrom', 'access_token', access_token)
                this._token.next(access_token)
                const decoded = this.jwtHelper.decodeToken<any>(access_token)
                this._tokenObject.next(decoded)
                console.log(JSON.stringify(decoded))
                this.storage.set(STORAGE_KEY.ACCESS_TOKEN, access_token).then()
                this.storage.set(STORAGE_KEY.TOKEN_OBJECT, decoded).then()
            },
        )
    }

    logout() {
        this._token.next(null)
        this._tokenObject.next(null)
        this.storage.remove(STORAGE_KEY.ACCESS_TOKEN).then()
        this.storage.remove(STORAGE_KEY.TOKEN_OBJECT).then()
    }

    async check() {
        await Promise.all([
            this.storage.get(STORAGE_KEY.ACCESS_TOKEN).then((res) => this._token.next(res)),
            this.storage.get(STORAGE_KEY.TOKEN_OBJECT).then((res) => this._tokenObject.next(res)),
        ])
        return this.token !== null && !this.jwtHelper.isTokenExpired(this.token)
    }
}
