import { Component, OnInit } from '@angular/core';
import {TokenService} from "../../../shared/services/token.service";
import {RedirectService} from "../../../shared/services/redirect.service";
import {pages} from "../../../shared/utils/pages.const";

@Component({
  selector: 'nx12-survey-details',
  templateUrl: './survey-details.page.html',
  styleUrls: ['./survey-details.page.scss'],
})
export class SurveyDetailsPage implements OnInit {

  constructor(public readonly service: TokenService, public readonly redirect: RedirectService) { }

  ngOnInit() {
  }

    redirectTo() {
        this.redirect.to(pages.student.fillSurvey)
    }
}
