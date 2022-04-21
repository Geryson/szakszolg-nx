import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PlayGroups2Page } from './play-groups2.page';

const routes: Routes = [
  {
    path: '',
    component: PlayGroups2Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlayGroups2PageRoutingModule {}
