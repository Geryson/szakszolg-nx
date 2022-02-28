import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ManageSingleGroupPage } from './manage-single-group.page';

const routes: Routes = [
  {
    path: '',
    component: ManageSingleGroupPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManageSingleGroupPageRoutingModule {}
