import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'

import { IonicModule } from '@ionic/angular'

import { ManageSinglePuzzlePageRoutingModule } from './manage-single-puzzle-routing.module'

import { ManageSinglePuzzlePage } from './manage-single-puzzle.page'
import { NxSharedModule } from '../../../../shared/nx-shared.module'
import { FileUploadModule } from 'primeng/fileupload'
// import { ImageCropperModule } from 'ngx-image-cropper'
import { TranslateModule } from '@ngx-translate/core'

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        ManageSinglePuzzlePageRoutingModule,
        NxSharedModule,
        FileUploadModule,
        // ImageCropperModule,
        TranslateModule,
    ],
    declarations: [ManageSinglePuzzlePage],
})
export class ManageSinglePuzzlePageModule {}
