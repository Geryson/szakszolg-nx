import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PlayGroupsPage } from './play-groups.page';

const routes: Routes = [
  {
    path: '',
    component: PlayGroupsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlayGroupsPageRoutingModule {}
