import {Component, OnInit} from '@angular/core';
import {TokenService} from "../../../shared/services/token.service";
import {RedirectService} from "../../../shared/services/redirect.service";
import {pages} from "../../../shared/utils/pages.const";
import {STORAGE_KEY} from "../../../shared/utils/constants";
import {StorageService} from "../../../shared/services/storage.service";

@Component({
    selector: 'nx12-survey-details',
    templateUrl: './survey-details.page.html',
    styleUrls: ['./survey-details.page.scss'],
})
export class SurveyDetailsPage implements OnInit {

    constructor(public readonly service: TokenService, public readonly redirect: RedirectService, private readonly storage: StorageService) {
    }

    ngOnInit() {
        this.storage.get(STORAGE_KEY.ACTIVE_QUIZ).then(aq => {
            console.log('STORAGE-ben van')
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