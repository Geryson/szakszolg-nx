import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'

import { IonicModule } from '@ionic/angular'

import { ManageSingleHangmanWordPageRoutingModule } from './manage-single-hangman-word-routing.module'

import { ManageSingleHangmanWordPage } from './manage-single-hangman-word.page'
import { NxSharedModule } from '../../../../shared/nx-shared.module'
import { InplaceModule } from 'primeng/inplace'
import { TranslateModule } from '@ngx-translate/core'
import { SharedModule } from 'primeng/api'
import { InputTextModule } from 'primeng/inputtext'
import { AutoCompleteModule } from 'primeng/autocomplete'

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        ManageSingleHangmanWordPageRoutingModule,
        NxSharedModule,
        InplaceModule,
        TranslateModule,
        SharedModule,
        InputTextModule,
        AutoCompleteModule,
    ],
    declarations: [ManageSingleHangmanWordPage],
})
export class ManageSingleHangmanWordPageModule {}
