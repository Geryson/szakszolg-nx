import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'

import { IonicModule } from '@ionic/angular'

import { ManageUsersPageRoutingModule } from './manage-users-routing.module'

import { ManageUsersPage } from './manage-users.page'
import { TranslateModule } from '@ngx-translate/core'
import { TableModule } from 'primeng/table'
import { InputTextModule } from 'primeng/inputtext'
import { ButtonModule } from 'primeng/button'
import { NxSharedModule } from '../../../shared/nx-shared.module'

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        ManageUsersPageRoutingModule,
        TranslateModule,
        TableModule,
        InputTextModule,
        ButtonModule,
        NxSharedModule,
    ],
    declarations: [ManageUsersPage],
})
export class ManageUsersPageModule {}
