import { Inject, Injectable } from '@angular/core'
import { Apollo, MutationResult } from 'apollo-angular'
import { Observable } from 'rxjs'
import { APOLLO_CLIENT } from '../injector.tokens'
import { TOKENS } from '../graphql/tokens.graphql'
import {IQuiz, IQuizAnswer, IQuizQuestion, IToken} from "@szakszolg-nx/api-interfaces";
import {STORAGE_KEY} from "../utils/constants";
import {pages} from "../utils/pages.const";
import {StorageService} from "./storage.service";
import {ConfirmationService, MessageService} from "primeng/api";
import {RedirectService} from "./redirect.service";

@Injectable({
    providedIn: 'root',
})
export class TokenService {
    activeQuiz?: IQuiz;
    answers:IQuizAnswer[] = [];
    questions: IQuizQuestion[] = []
    index = 0
    token?:string // delete this.tokenService.token
    activeOM = ''
    id: number

    constructor(@Inject(APOLLO_CLIENT) private readonly apolloClient: Apollo,
                private readonly storage: StorageService, private confirmationService: ConfirmationService,
                private messageService: MessageService, private readonly redirect: RedirectService,) {
        this.id = Math.random()
        console.log(this.id)
    }

    create(quizId: string): Observable<MutationResult<{ createToken: { token: string; __typename: 'Token' } }>> {
        return this.apolloClient.mutate<{ createToken: { token: string; __typename: 'Token' } }>({
            mutation: TOKENS.ADD,
            variables: {
                quizId,
            },
        })
    }
    read(token: string){
        return this.apolloClient.watchQuery<{token: Partial<IToken>}>({
            query: TOKENS.READ,
            variables: {token}
        })
    }

    async cancel() {

        this.index = 0
        this.answers = this.answers.map(ans => ({
            ...ans,
            answer: ''
        }))
        await this.storage.remove(STORAGE_KEY.SURVEY_TOKEN).then(() => delete this.token)
        await this.storage.remove(STORAGE_KEY.SURVEY_INDEX).then()
        await this.storage.remove(STORAGE_KEY.SURVEY_ANSWER).then()
        await this.storage.remove(STORAGE_KEY.SURVEY_QUESTIONS).then()
        this.redirect.to(pages.student.enterToken)
    }

    confirm(message: string, header: string) {
        this.confirmationService.confirm({
            message: message,
            header: header,
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.cancel().then()
            },
            reject: (type: any) => {
                return
            }

        });
    }
}
