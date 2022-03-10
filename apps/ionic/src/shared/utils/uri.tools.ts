import { environment } from '../../environments/environment'

export function api(path: string): string {
    return `${environment.API_SSL ? 'https' : 'http'}://${environment.API_HOST}:${environment.API_PORT}/${path}`
}

export function getImageID(file: string) {
    return file.replace(/uploads/g, '').replace(/\/\//g, '/')
}

export function getImageUrl(file: string) {
    return api(`api/puzzle/${getImageID(file)}?size=thumbnail`)
}

export function getImageName(file: string) {
    return file
        .replace(/uploads/g, '')
        .replace(/\/\//g, '/')
        .replace(/--.+\./g, '.')
        .substring(2)
}
