import { IApiResource } from './api-resource.interface'

export interface IPuzzle extends IApiResource {
    url: string
    cropWidth?: number
    cropHeight?: number
    cropTop?: number
    cropLeft?: number
    pieceSize?: number
    columns?: number
}
