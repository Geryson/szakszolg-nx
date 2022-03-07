import { Component, OnInit } from '@angular/core';
import {SurveyService} from "../../../shared/services/survey.service";
import {TokenService} from "../../../shared/services/token.service";
import {IQuizQuestion} from "@szakszolg-nx/api-interfaces";

@Component({
  selector: 'nx12-fill-survey',
  templateUrl: './fill-survey.page.html',
  styleUrls: ['./fill-survey.page.scss'],
})
export class FillSurveyPage{

    public index = [1,2,3,4,5]
    public questions?: IQuizQuestion[] | undefined
  constructor(protected readonly service: TokenService) { }

    ionViewDidEnter(){
        this.questions = this.service.activeQuiz?.questions
    }
}
