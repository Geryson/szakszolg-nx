import { IApiResource } from '@szakszolg-nx/api-interfaces'

export interface IPuzzle extends IApiResource {
    url: string
    cropWidth: number
    cropHeight: number
    cropTop: number
    cropLeft: number
    pieceSize: number
    columns: number
}
