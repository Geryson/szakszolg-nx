import { IApiResource } from './api-resource.interface'

export interface IHangmanWord extends IApiResource {
    word: string
    category: string
}
