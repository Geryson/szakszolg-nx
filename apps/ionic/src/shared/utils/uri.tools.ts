import { environment } from '../../environments/environment'

export function api(path: string): string {
    return `${environment.API_SSL ? 'https' : 'http'}://${environment.API_HOST}:${environment.API_PORT}/${path}`
}
