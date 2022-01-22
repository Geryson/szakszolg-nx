import { IApiResource } from './api-resource.interface'

export interface IRole extends IApiResource {
    name: string
    description: string
    permissions: string[]
}
