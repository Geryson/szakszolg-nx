import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'

import { IonicModule } from '@ionic/angular'

import { ManagePuzzlesPageRoutingModule } from './manage-puzzles-routing.module'

import { ManagePuzzlesPage } from './manage-puzzles.page'
import { NxSharedModule } from '../../../shared/nx-shared.module'
import { SharedModule } from 'primeng/api'
import { DataViewModule } from 'primeng/dataview'
import { DropdownModule } from 'primeng/dropdown'
import { InputTextModule } from 'primeng/inputtext'
import { ButtonModule } from 'primeng/button'
import { TranslateModule } from '@ngx-translate/core'

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        ManagePuzzlesPageRoutingModule,
        NxSharedModule,
        SharedModule,
        DataViewModule,
        DropdownModule,
        InputTextModule,
        ButtonModule,
        TranslateModule,
    ],
    declarations: [ManagePuzzlesPage],
})
export class ManagePuzzlesPageModule {}
