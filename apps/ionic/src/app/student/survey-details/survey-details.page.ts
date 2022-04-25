import {Component, OnInit} from '@angular/core';
import {TokenService} from "../../../shared/services/token.service";
import {RedirectService} from "../../../shared/services/redirect.service";
import {pages} from "../../../shared/utils/pages.const";
import {STORAGE_KEY} from "../../../shared/utils/constants";
import {StorageService} from "../../../shared/services/storage.service";
import {TranslatePipe} from "@ngx-translate/core";

@Component({
    selector: 'nx12-survey-details',
    templateUrl: './survey-details.page.html',
    styleUrls: ['./survey-details.page.scss'],
})
export class SurveyDetailsPage implements OnInit {
    pages=pages

    constructor(public readonly service: TokenService,
                public readonly redirect: RedirectService,
                private readonly storage: StorageService,
                public readonly translate: TranslatePipe) {
    }

    ngOnInit() {
        this.storage.get(STORAGE_KEY.ACTIVE_QUIZ).then(aq => {
            this.service.activeQuiz = aq
        })
    }

    ionViewDidLeave() {
        this.storage.remove(STORAGE_KEY.ACTIVE_QUIZ).then()
    }

    redirectTo() {
        this.redirect.to(pages.student.fillSurvey)
    }
}
