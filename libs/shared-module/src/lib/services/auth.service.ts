import { Injectable, Injector } from '@angular/core'
import { BehaviorSubject } from 'rxjs'
import { HttpClient } from '@angular/common/http'
import { JwtHelperService } from '@auth0/angular-jwt'
import {
    api,
    APOLLO_CLIENT,
    ENVIRONMENT,
    Log,
    task,
    STORAGE_KEY,
    STORAGE_SERVICE,
    PROFILE,
} from '@szakszolg-nx/shared-module'
import { IDecodedJwt, IStorageService } from '@szakszolg-nx/ng-interfaces'
import { Apollo } from 'apollo-angular'
import { IUser } from '@szakszolg-nx/api-interfaces'

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    constructor(private readonly http: HttpClient, private readonly injector: Injector) {}

    // region Properties

    private _tokenObject = new BehaviorSubject<any | null>(null)

    get tokenObject(): Partial<IUser> {
        return this._tokenObject.value
    }

    get user(): Promise<Partial<IUser> | null> {
        return this.storage.get<Partial<IUser>>(STORAGE_KEY.PROFILE)
    }

    private _token = new BehaviorSubject<string | null>(null)

    get token(): Promise<string | null> {
        Log.debug(
            'AuthService::token@get',
            `resolving token from ${this._token.value ? 'instance' : 'storage'}`,
            this._token.value,
        )
        return Promise.resolve(this._token.value) ?? this.storage.get<string>(STORAGE_KEY.ACCESS_TOKEN)
    }

    //endregion

    // region lazy-loaded properties

    private _jwtHelper: JwtHelperService | null = null

    private get jwtHelper(): JwtHelperService {
        if (!this._jwtHelper) {
            this._jwtHelper = this.injector.get(JwtHelperService)
        }
        return this._jwtHelper
    }

    private _storage: IStorageService | null = null

    private get storage(): IStorageService {
        if (!this._storage) {
            this._storage = this.injector.get(STORAGE_SERVICE)
        }
        return this._storage
    }

    private _environment: object | null = null

    private get environment(): object {
        if (!this._environment) {
            this._environment = this.injector.get(ENVIRONMENT)
        }
        return this._environment
    }

    //endregion

    // region Public methods

    login(email: string, password: string) {
        const url = api('api/auth/login', this.environment)
        return task(this.http.post<{ access_token: string }>(url, { email, password })).then(({ access_token }) => {
            const decoded = this.decode(access_token)
            this.saveToken(access_token, decoded).then(() => {
                this._token.next(access_token)
                this._tokenObject.next(decoded)
                this.loadProfile(decoded.email)
            })
        })
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
        let token = await this.token
        return token !== null && !this.jwtHelper.isTokenExpired(token)
    }

    //endregion

    // region Private methods

    private saveToken(access_token: string, decoded: IDecodedJwt) {
        return Promise.all([
            this.storage.set(STORAGE_KEY.ACCESS_TOKEN, access_token).then(),
            this.storage.set(STORAGE_KEY.TOKEN_OBJECT, decoded).then(),
        ])
    }

    private decode(access_token: string) {
        const decoded = this.jwtHelper.decodeToken<IDecodedJwt>(access_token)
        this._token.next(access_token)
        this._tokenObject.next(decoded)
        return decoded
    }

    private loadProfile(email: string) {
        this.injector
            .get<Apollo>(APOLLO_CLIENT)
            .query<{ user: IUser }>({
                query: PROFILE.READ,
                variables: { email },
            })
            .subscribe((res) => {
                Log.debug('AuthService::loadProfile', 'result', res)
                this.storage.set(STORAGE_KEY.PROFILE, res.data.user).then()
            })
    }

    // endregion
}
