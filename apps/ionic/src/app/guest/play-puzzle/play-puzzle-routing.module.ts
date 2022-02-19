import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PlayPuzzlePage } from './play-puzzle.page';

const routes: Routes = [
  {
    path: '',
    component: PlayPuzzlePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlayPuzzlePageRoutingModule {}
