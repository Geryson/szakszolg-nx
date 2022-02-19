import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PlayMirrorWordsPage } from './play-mirror-words.page';

const routes: Routes = [
  {
    path: '',
    component: PlayMirrorWordsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlayMirrorWordsPageRoutingModule {}
