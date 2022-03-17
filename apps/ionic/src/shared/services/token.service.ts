import {Inject, Injectable, OnDestroy} from '@angular/core'
import { Apollo, MutationResult } from 'apollo-angular'
import {firstValueFrom, Observable} from 'rxjs'
import { APOLLO_CLIENT } from '../injector.tokens'
import { TOKENS } from '../graphql/tokens.graphql'
import {ICreateQuizAnswerInput, IQuiz, IQuizAnswer, IQuizQuestion, IToken} from "@szakszolg-nx/api-interfaces";
import {STORAGE_KEY} from "../utils/constants";
import {pages} from "../utils/pages.const";
import {StorageService} from "./storage.service";
import {ConfirmationService, MessageService} from "primeng/api";
import {RedirectService} from "./redirect.service";
import {showLoading} from "../utils/observable.tools";
import {AnswerService} from "./answer.service";
import {omit} from "../utils/object.tools";

@Injectable({
    providedIn: 'root',
})
export class TokenService{
    activeQuiz?: IQuiz;
    answers:IQuizAnswer[] = [];
    questions: IQuizQuestion[] = []
    index = 0
    token?:string
    activeOM = ''
    end = false;
    save= false;

    constructor(@Inject(APOLLO_CLIENT) private readonly apolloClient: Apollo,
                private readonly storage: StorageService, private confirmationService: ConfirmationService,
                private messageService: MessageService, private readonly redirect: RedirectService,
                protected readonly sendData: AnswerService) {
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
        const l = await showLoading()
        console.log("SAVE ELŐTT: "+ this.save)
        if(this.save){
            console.log('SAVING')
            this.answers = this.answers.filter(x=> x.answer!=='')
            await firstValueFrom(this.sendData.create2(this.answers.map(item => omit(item, '_id', 'createdAt'))))
            /*for (const answerElement of this.answers) {
                console.log(answerElement.questionId)
                promises.push(firstValueFrom(this.sendData.create(
                        answerElement.answer,
                        answerElement.quizId,
                        answerElement.questionId,
                        answerElement.createdAt,
                        answerElement.om,
                        answerElement.isCorrect!,
                        this.token!

                    ))
                )
            }
            await Promise.all(promises)*/

        }
        l.dismiss().then()
        this.index = 0
        this.answers = this.answers.map(ans => ({
            ...ans,
            answer: ''
        }))
        await this.clearStorage()
    }
    clearStorage(){
        this.storage.remove(STORAGE_KEY.SURVEY_TOKEN).then(() => {delete this.token})
        this.storage.remove(STORAGE_KEY.SURVEY_INDEX).then()
        this.storage.remove(STORAGE_KEY.SURVEY_ANSWER).then()
        this.storage.remove(STORAGE_KEY.ACTIVE_QUIZ).then()
        this.storage.remove(STORAGE_KEY.SURVEY_QUESTIONS).then()
        this.storage.remove(STORAGE_KEY.EDU_ID).then()
    }
    async accept(){
        this.save=true
        this.end = false
        await this.cancel().then()
        this.redirect.to(pages.home)
    }

    reject(){
        this.end = false
        return
    }
     confirm(message: string, header: string) {
        this.confirmationService.confirm({
            message: message,
            header: header,
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.save=false
                this.cancel().then()
                this.redirect.to(pages.home)
            },
            reject: (type: any) => {
                this.reject()
            }

        });
    }
}
