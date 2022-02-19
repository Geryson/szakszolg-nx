import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PlayHangmanPage } from './play-hangman.page';

const routes: Routes = [
  {
    path: '',
    component: PlayHangmanPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlayHangmanPageRoutingModule {}
