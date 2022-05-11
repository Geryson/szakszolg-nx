import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'

import { IonicModule } from '@ionic/angular'
import { AngularCropperjsModule } from "angular-cropperjs"

import { PlayPuzzlePageRoutingModule } from './play-puzzle-routing.module'

import { PlayPuzzlePage } from './play-puzzle.page'
import { NxSharedModule } from '../../../shared/nx-shared.module'
import {TranslateModule} from "@ngx-translate/core"
import {DialogModule} from "primeng/dialog";

@NgModule({
    imports: [CommonModule, FormsModule, IonicModule, PlayPuzzlePageRoutingModule, NxSharedModule, AngularCropperjsModule, TranslateModule, DialogModule],
    declarations: [PlayPuzzlePage]
})
export class PlayPuzzlePageModule {}
