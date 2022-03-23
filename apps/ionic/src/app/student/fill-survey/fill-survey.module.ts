import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FillSurveyPageRoutingModule } from './fill-survey-routing.module';

import { FillSurveyPage } from './fill-survey.page';
import {AnswerTrueFalseComponent} from "./answer-true-false/answer-true-false.component";
import {SliderModule} from "primeng/slider";
import {ButtonModule} from "primeng/button";
import {AnswerRatingComponent} from "./answer-rating/answer-rating.component";
import {RadioButtonModule} from "primeng/radiobutton";
import {NxSharedModule} from "../../../shared/nx-shared.module";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {DialogModule} from "primeng/dialog";


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        FillSurveyPageRoutingModule,
        SliderModule,
        ButtonModule,
        RadioButtonModule,
        NxSharedModule,
        ConfirmDialogModule,
        DialogModule,
    ],
    declarations: [FillSurveyPage, AnswerTrueFalseComponent, AnswerRatingComponent]
})
export class FillSurveyPageModule {}
