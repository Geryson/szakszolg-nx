import { IApiResource } from './api-resource.interface'

export interface IGroupingItem2 extends IApiResource {
    category: string
    items: string[]
    groups: string[]
    correct: string[]
}
