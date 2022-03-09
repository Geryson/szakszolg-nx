import {IApiResource} from "@szakszolg-nx/api-interfaces";

export interface IQuizAnswerOption extends IApiResource {
    text: string
    isCorrect?: boolean
    categoryIndex?: number
}
