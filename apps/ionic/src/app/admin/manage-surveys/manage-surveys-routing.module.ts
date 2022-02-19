import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ManageSurveysPage } from './manage-surveys.page';

const routes: Routes = [
  {
    path: '',
    component: ManageSurveysPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManageSurveysPageRoutingModule {}
