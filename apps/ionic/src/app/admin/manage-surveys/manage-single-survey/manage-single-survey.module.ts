import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'

import { IonicModule } from '@ionic/angular'

import { ManageSingleSurveyPageRoutingModule } from './manage-single-survey-routing.module'

import { ManageSingleSurveyPage } from './manage-single-survey.page'
import { InputTextModule } from 'primeng/inputtext'
import { InputTextareaModule } from 'primeng/inputtextarea'
import { AutoCompleteModule } from 'primeng/autocomplete'
import { NxSharedModule } from '../../../../shared/nx-shared.module'
import { TableModule } from 'primeng/table'
import { TranslateModule } from '@ngx-translate/core'
import { ButtonModule } from 'primeng/button'

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        ManageSingleSurveyPageRoutingModule,
        InputTextModule,
        InputTextareaModule,
        AutoCompleteModule,
        NxSharedModule,
        TableModule,
        TranslateModule,
        ButtonModule,
    ],
    declarations: [ManageSingleSurveyPage],
})
export class ManageSingleSurveyPageModule {}
