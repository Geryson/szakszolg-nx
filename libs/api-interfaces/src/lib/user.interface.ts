import { IApiResource } from './api-resource.interface'

export interface IUser extends IApiResource {
    username: string
    om?: string
    email: string
    password?: string
}
