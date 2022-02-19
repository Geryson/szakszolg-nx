import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ManagePuzzlesPage } from './manage-puzzles.page';

const routes: Routes = [
  {
    path: '',
    component: ManagePuzzlesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManagePuzzlesPageRoutingModule {}
