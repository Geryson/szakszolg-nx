import { IApiResource } from '@szakszolg-nx/api-interfaces'

export interface IUser extends IApiResource {
    username: string
    om?: string
    email: string
    password?: string
}
