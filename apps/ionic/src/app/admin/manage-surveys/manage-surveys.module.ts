import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'

import { IonicModule } from '@ionic/angular'

import { ManageSurveysPageRoutingModule } from './manage-surveys-routing.module'

import { ManageSurveysPage } from './manage-surveys.page'
import { NxSharedModule } from '../../../shared/nx-shared.module'
import { TableModule } from 'primeng/table'
import { TranslateModule } from '@ngx-translate/core'
import { ButtonModule } from 'primeng/button'
import { InputTextModule } from 'primeng/inputtext'
import { SharedModule } from '@szakszolg-nx/shared-module'
import { DialogModule } from 'primeng/dialog'

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        ManageSurveysPageRoutingModule,
        NxSharedModule,
        SharedModule,
        TableModule,
        TranslateModule,
        ButtonModule,
        InputTextModule,
        DialogModule,
    ],
    declarations: [ManageSurveysPage],
})
export class ManageSurveysPageModule {}
