import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'

import { IonicModule } from '@ionic/angular'

import { PuzzleScalerPageRoutingModule } from './puzzle-scaler-routing.module'

import { PuzzleScalerPage } from './puzzle-scaler.page'
import { NxSharedModule } from '../../../../shared/nx-shared.module'
import { AngularCropperjsModule } from 'angular-cropperjs'
import { TranslateModule } from '@ngx-translate/core'
import { OrientationDialogComponent } from './orientation-dialog/orientation-dialog.component'
import { DialogModule } from 'primeng/dialog'

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        PuzzleScalerPageRoutingModule,
        NxSharedModule,
        AngularCropperjsModule,
        TranslateModule,
        DialogModule,
    ],
    declarations: [PuzzleScalerPage, OrientationDialogComponent],
})
export class PuzzleScalerPageModule {}
