import { IApiResource } from './api-resource.interface'
import { Types } from 'mongoose'
import { IRole } from './role.interface'

export interface IUser extends IApiResource {
    username: string
    om?: string
    email: string
    password?: string
    roles: Types.ObjectId[] | IRole[]
}
