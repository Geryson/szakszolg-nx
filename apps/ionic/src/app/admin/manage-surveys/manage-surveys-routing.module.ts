import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ManageSurveysPage } from './manage-surveys.page';

const routes: Routes = [
  {
    path: '',
    component: ManageSurveysPage
  },
  {
    path: ':id',
    loadChildren: () => import('./manage-single-survey/manage-single-survey.module').then( m => m.ManageSingleSurveyPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManageSurveysPageRoutingModule {}
