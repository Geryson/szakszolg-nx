import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ManageGroups2Page } from './manage-groups2.page';

const routes: Routes = [
  {
    path: '',
    component: ManageGroups2Page
  },
  {
    path: ':id',
    loadChildren: () => import('./manage-single-group2/manage-single-group2.module').then(m => m.ManageSingleGroupPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManageGroupsPageRoutingModule {}
