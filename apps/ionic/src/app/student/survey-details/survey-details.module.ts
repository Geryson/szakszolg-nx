import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SurveyDetailsPageRoutingModule } from './survey-details-routing.module';

import { SurveyDetailsPage } from './survey-details.page';
import {NxSharedModule} from "../../../shared/nx-shared.module";
import {ButtonModule} from "primeng/button";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        SurveyDetailsPageRoutingModule,
        NxSharedModule,
        ButtonModule
    ],
  declarations: [SurveyDetailsPage]
})
export class SurveyDetailsPageModule {}
