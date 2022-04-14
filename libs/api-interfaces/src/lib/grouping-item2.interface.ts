import { IApiResource } from './api-resource.interface'
import {IGroupingItem2Details} from "./grouping-item2-details.interface";

export interface IGroupingItem2 extends IApiResource {
    category: string
    items: IGroupingItem2Details[]
    //itemIsPicture: boolean[]
    groups: IGroupingItem2Details[]
    //groupIsPicture: boolean[]
    correct: string[]
}
