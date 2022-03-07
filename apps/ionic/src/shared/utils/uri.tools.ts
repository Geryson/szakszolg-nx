export function api(path: string, environment: any): string {
    return `${environment.API_SSL ? 'https' : 'http'}://${environment.API_HOST}:${environment.API_PORT}/${path}`
}
