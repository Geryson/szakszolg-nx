import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {SurveyResultsPageRoutingModule} from './survey-results-routing.module';

import {SurveyResultsPage} from './survey-results.page';
import {TranslateModule} from "@ngx-translate/core";
import {NxSharedModule} from "../../../shared/nx-shared.module";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        SurveyResultsPageRoutingModule,
        TranslateModule,
        NxSharedModule,
    ],
    declarations: [SurveyResultsPage]
})
export class SurveyResultsPageModule {
}
