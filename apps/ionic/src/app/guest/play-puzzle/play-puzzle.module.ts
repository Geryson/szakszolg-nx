import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'

import { IonicModule } from '@ionic/angular'

import { PlayPuzzlePageRoutingModule } from './play-puzzle-routing.module'

import { PlayPuzzlePage } from './play-puzzle.page'
import { NxSharedModule } from '../../../shared/nx-shared.module'

@NgModule({
    imports: [CommonModule, FormsModule, IonicModule, PlayPuzzlePageRoutingModule, NxSharedModule],
    declarations: [PlayPuzzlePage],
})
export class PlayPuzzlePageModule {}
