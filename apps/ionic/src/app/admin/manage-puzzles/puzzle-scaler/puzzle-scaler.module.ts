import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'

import { IonicModule } from '@ionic/angular'

import { PuzzleScalerPageRoutingModule } from './puzzle-scaler-routing.module'

import { PuzzleScalerPage } from './puzzle-scaler.page'
import { NxSharedModule } from '../../../../shared/nx-shared.module'

@NgModule({
    imports: [CommonModule, FormsModule, IonicModule, PuzzleScalerPageRoutingModule, NxSharedModule],
    declarations: [PuzzleScalerPage],
})
export class PuzzleScalerPageModule {}
