import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FillSurveyPageRoutingModule } from './fill-survey-routing.module';

import { FillSurveyPage } from './fill-survey.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FillSurveyPageRoutingModule
  ],
  declarations: [FillSurveyPage]
})
export class FillSurveyPageModule {}
