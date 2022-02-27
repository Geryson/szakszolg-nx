import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ManageGroupsPage } from './manage-groups.page';

const routes: Routes = [
  {
    path: '',
    component: ManageGroupsPage
  },
  {
    path: ':id',
    loadChildren: () => import('./manage-single-group/manage-single-group.module').then( m => m.ManageSingleGroupPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManageGroupsPageRoutingModule {}
