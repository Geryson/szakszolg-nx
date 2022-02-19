import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'

import { IonicModule } from '@ionic/angular'

import { ManageMirrorWordsPageRoutingModule } from './manage-mirror-words-routing.module'

import { ManageMirrorWordsPage } from './manage-mirror-words.page'
import { TranslateModule } from '@ngx-translate/core'
import { TableModule } from 'primeng/table'
import { InputTextModule } from 'primeng/inputtext'
import { ButtonModule } from 'primeng/button'
import { DialogModule } from 'primeng/dialog'

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        ManageMirrorWordsPageRoutingModule,
        TranslateModule,
        TableModule,
        InputTextModule,
        ButtonModule,
        DialogModule,
    ],
    declarations: [ManageMirrorWordsPage],
})
export class ManageMirrorWordsPageModule {}
