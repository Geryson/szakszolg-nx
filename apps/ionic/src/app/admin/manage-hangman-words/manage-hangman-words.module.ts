import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'

import { IonicModule } from '@ionic/angular'

import { ManageHangmanWordsPageRoutingModule } from './manage-hangman-words-routing.module'

import { ManageHangmanWordsPage } from './manage-hangman-words.page'
import { NxSharedModule } from '../../../shared/nx-shared.module'
import { TableModule } from 'primeng/table'
import { TranslateModule } from '@ngx-translate/core'
import { ButtonModule } from 'primeng/button'
import { InputTextModule } from 'primeng/inputtext'

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        ManageHangmanWordsPageRoutingModule,
        NxSharedModule,
        TableModule,
        TranslateModule,
        ButtonModule,
        InputTextModule,
    ],
    declarations: [ManageHangmanWordsPage],
})
export class ManageHangmanWordsPageModule {}
