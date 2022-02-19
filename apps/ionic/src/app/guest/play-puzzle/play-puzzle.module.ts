import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PlayPuzzlePageRoutingModule } from './play-puzzle-routing.module';

import { PlayPuzzlePage } from './play-puzzle.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PlayPuzzlePageRoutingModule
  ],
  declarations: [PlayPuzzlePage]
})
export class PlayPuzzlePageModule {}
