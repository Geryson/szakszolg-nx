import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'

import { IonicModule } from '@ionic/angular'

import { SchoolFinderPageRoutingModule } from './school-finder-routing.module'

import { SchoolFinderPage } from './school-finder.page'
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
        SchoolFinderPageRoutingModule,
        TranslateModule,
        TableModule,
        InputTextModule,
        ButtonModule,
        NxSharedModule,
    ],
    declarations: [SchoolFinderPage],
})
export class SchoolFinderPageModule {}
