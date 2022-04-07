import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'

import { IonicModule } from '@ionic/angular'

import { ManageSingleGroupPageRoutingModule } from './manage-single-group-routing.module'

import { ManageSingleGroupPage } from './manage-single-group.page'
import { NxSharedModule } from '../../../../shared/nx-shared.module'
import { InputTextModule } from 'primeng/inputtext'
import { TranslateModule } from '@ngx-translate/core'
import { TableModule } from 'primeng/table'
import { ButtonModule } from 'primeng/button'
import {TreeSelectModule} from "primeng/treeselect";
import {DropdownModule} from "primeng/dropdown";
import {FileUploadModule} from "primeng/fileupload";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        ManageSingleGroupPageRoutingModule,
        NxSharedModule,
        InputTextModule,
        TranslateModule,
        TableModule,
        ButtonModule,
        TreeSelectModule,
        DropdownModule,
        FileUploadModule,
    ],
    declarations: [ManageSingleGroupPage],
})
export class ManageSingleGroupPageModule {}
