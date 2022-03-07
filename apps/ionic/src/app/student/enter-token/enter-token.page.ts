import {Component, Output, EventEmitter} from '@angular/core';
import {TokenService} from "../../../shared/services/token.service";
import {Subscription} from "rxjs";
import {QueryRef} from "apollo-angular";
import {IQuiz, IToken} from "@szakszolg-nx/api-interfaces";
import {EmptyObject} from "apollo-angular/build/types";
import {deepCopy} from "../../../shared/utils/object.tools";
import {RedirectService} from "../../../shared/services/redirect.service";
import {pages} from "../../../shared/utils/pages.const";
import {catchError} from "rxjs/operators";
import {MessageService} from "primeng/api";

@Component({
    selector: 'nx12-enter-token',
    templateUrl: './enter-token.page.html',
    styleUrls: ['./enter-token.page.scss'],
})
export class EnterTokenPage {
    token = ""
    private sub?: Subscription
    private queryRef?: QueryRef<{ token: Partial<IToken> }, EmptyObject>;
    private quiz?: any

    constructor(protected readonly service: TokenService, private readonly redirect: RedirectService,
                private readonly toast: MessageService) {
    }

    send() {
        this.queryRef = this.service.read(this.token)
        this.sub = this.queryRef?.valueChanges.pipe(
            catchError((err, caught) => {
                this.toast.add({summary: 'Ez a token már lejárt!', severity: 'error'})
                throw "Expired token"
        })).subscribe((res) => {
            if(!res.data.token){
                this.toast.add({summary: 'Ez a token nem létezik!', severity: 'error'})
                return
            }
            this.quiz = res.data.token.quiz ?? []
            this.service.activeQuiz = deepCopy(res.data.token.quiz as IQuiz)
            console.log(this.service.activeQuiz)
            this.redirect.to(pages.student.fillSurvey)
        })
    }

    ionViewDidLeave() {
        this.sub?.unsubscribe()
    }
}
