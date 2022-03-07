import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'

import { IonicModule } from '@ionic/angular'

import { ManageGroupsPageRoutingModule } from './manage-groups-routing.module'

import { ManageGroupsPage } from './manage-groups.page'
import { NxSharedModule } from '../../../shared/nx-shared.module'
import { TableModule } from 'primeng/table'
import { TranslateModule } from '@ngx-translate/core'
import { InputTextModule } from 'primeng/inputtext'
import { ButtonModule } from 'primeng/button'

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        ManageGroupsPageRoutingModule,
        NxSharedModule,
        TableModule,
        TranslateModule,
        InputTextModule,
        ButtonModule,
    ],
    declarations: [ManageGroupsPage],
})
export class ManageGroupsPageModule {}
