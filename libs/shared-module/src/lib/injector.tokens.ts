import { InjectionToken } from '@angular/core'
import { IStorageService } from '@szakszolg-nx/ng-interfaces'

export const STORAGE_SERVICE = new InjectionToken<IStorageService>('StorageService')
export const ENVIRONMENT = new InjectionToken<object>('Environment')
export const AUTH_SERVICE = new InjectionToken<object>('AuthService')
export const REDIRECT_SERVICE = new InjectionToken<object>('RedirectService')
export const APOLLO_CLIENT = new InjectionToken<object>('ApolloClient')
