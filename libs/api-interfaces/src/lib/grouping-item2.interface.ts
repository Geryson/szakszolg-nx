import { IApiResource } from './api-resource.interface'

export interface IGroupingItem2 extends IApiResource {
    category: string
    items: string[]
    itemIsPicture: boolean[]
    groups: string[]
    groupIsPicture: boolean[]
    correct: string[]
    correctIsPicture: boolean[]
}
