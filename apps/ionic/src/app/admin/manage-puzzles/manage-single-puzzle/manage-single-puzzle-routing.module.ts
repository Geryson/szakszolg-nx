import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ManageSinglePuzzlePage } from './manage-single-puzzle.page';

const routes: Routes = [
  {
    path: '',
    component: ManageSinglePuzzlePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManageSinglePuzzlePageRoutingModule {}
