import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'

import { IonicModule } from '@ionic/angular'

import { SingleUserPageRoutingModule } from './single-user-routing.module'

import { SingleUserPage } from './single-user.page'
import { InplaceModule } from 'primeng/inplace'
import { InputTextModule } from 'primeng/inputtext'
import { SharedModule } from 'primeng/api'
import { TranslateModule } from '@ngx-translate/core'
import { TooltipModule } from 'primeng/tooltip'
import { DialogModule } from 'primeng/dialog'

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        SingleUserPageRoutingModule,
        InplaceModule,
        InputTextModule,
        SharedModule,
        TranslateModule,
        TooltipModule,
        DialogModule,
    ],
    declarations: [SingleUserPage],
})
export class SingleUserPageModule {}
