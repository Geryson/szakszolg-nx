import { IApiResource } from './api-resource.interface'

export interface IGroupingItem extends IApiResource {
    item: string
    groups: string[]
    correct: string
}
