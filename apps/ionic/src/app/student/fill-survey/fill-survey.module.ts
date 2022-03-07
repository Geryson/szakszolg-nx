import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FillSurveyPageRoutingModule } from './fill-survey-routing.module';

import { FillSurveyPage } from './fill-survey.page';
import {AnswerTrueFalseComponent} from "./answer-true-false/answer-true-false.component";


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FillSurveyPageRoutingModule,
  ],
  declarations: [FillSurveyPage, AnswerTrueFalseComponent]
})
export class FillSurveyPageModule {}
