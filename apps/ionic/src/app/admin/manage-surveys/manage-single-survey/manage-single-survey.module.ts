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
import { QuestionEditFormComponent } from './question-edit-form/question-edit-form.component'
import { DialogModule } from 'primeng/dialog'
import { DropdownModule } from 'primeng/dropdown'
import { ListboxModule } from 'primeng/listbox'

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
        DialogModule,
        DropdownModule,
        ListboxModule,
    ],
    declarations: [ManageSingleSurveyPage, QuestionEditFormComponent],
})
export class ManageSingleSurveyPageModule {}
