import { IApiResource } from './api-resource.interface'

export interface ISchool extends IApiResource {
    om: string
    name: string
    address: string
    county: string
    types: string[]
}
