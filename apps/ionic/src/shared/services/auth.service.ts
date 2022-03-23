import { Injectable } from '@angular/core'
import { BehaviorSubject, firstValueFrom } from 'rxjs'
import { HttpClient } from '@angular/common/http'
import { JwtHelperService } from '@auth0/angular-jwt'
import { IDecodedJwt, IStorageService } from '@szakszolg-nx/ng-interfaces'
import { Apollo } from 'apollo-angular'
import { IUser } from '@szakszolg-nx/api-interfaces'
import { STORAGE_KEY } from '../utils/constants'
import { Log } from '../utils/log.tools'
import { APOLLO_CLIENT, STORAGE_SERVICE } from '../injector.tokens'
import { api } from '../utils/uri.tools'
import { PROFILE } from '../graphql/profile.graphql'
import { APP_INJECTOR } from '../../app/app.module'
import {USERS} from "../graphql/users.graphql";

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    constructor(private readonly http: HttpClient) {}

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
            this._jwtHelper = APP_INJECTOR.get(JwtHelperService)
        }
        return this._jwtHelper
    }

    private _storage: IStorageService | null = null

    private get storage(): IStorageService {
        if (!this._storage) {
            this._storage = APP_INJECTOR.get(STORAGE_SERVICE)
        }
        return this._storage
    }

    //endregion

    // region Public methods

    login(email: string, password: string) {
        const url = api('api/auth/login')
        return firstValueFrom(this.http.post<{ access_token: string }>(url, { email, password })).then(
            ({ access_token }) => {
                const decoded = this.decode(access_token)
                Log.debug('AuthService::login', 'decoded', decoded)
                this.saveToken(access_token, decoded).then(() => {
                    this._token.next(access_token)
                    this._tokenObject.next(decoded)
                    this.loadProfile(decoded.email)
                })
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
        const token = await this.token
        return token !== null && !this.jwtHelper.isTokenExpired(token)
    }

    //endregion

    // region Private methods

    private saveToken(access_token: string, decoded: IDecodedJwt) {
        return Promise.all([
            this.storage
                .set(STORAGE_KEY.ACCESS_TOKEN, access_token)
                .then(() => Log.debug('AuthService::saveToken', 'access_token')),
            this.storage
                .set(STORAGE_KEY.TOKEN_OBJECT, decoded)
                .then(() => Log.debug('AuthService::saveToken', 'token_object')),
        ])
    }

    private decode(access_token: string) {
        const decoded = this.jwtHelper.decodeToken<IDecodedJwt>(access_token)
        this._token.next(access_token)
        this._tokenObject.next(decoded)
        return decoded
    }

    private loadProfile(email: string) {
        APP_INJECTOR.get<Apollo>(APOLLO_CLIENT)
            .query<{ profile: IUser }>({
                query: USERS.PROFILE,
                fetchPolicy: 'no-cache'
            })
            .subscribe((res) => {
                Log.debug('AuthService::loadProfile', 'result', res)
                this.storage.set(STORAGE_KEY.PROFILE, res.data.profile).then()
            })
    }

    // endregion
}
