import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ManageGroupsPage } from './manage-groups.page';

const routes: Routes = [
  {
    path: '',
    component: ManageGroupsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManageGroupsPageRoutingModule {}
