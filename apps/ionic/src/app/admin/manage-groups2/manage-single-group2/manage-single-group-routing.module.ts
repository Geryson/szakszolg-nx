import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ManageSingleGroup2Page } from './manage-single-group2.page';

const routes: Routes = [
  {
    path: '',
    component: ManageSingleGroup2Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManageSingleGroupPageRoutingModule {}
