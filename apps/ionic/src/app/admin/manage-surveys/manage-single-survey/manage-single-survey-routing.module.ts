import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ManageSingleSurveyPage } from './manage-single-survey.page';

const routes: Routes = [
  {
    path: '',
    component: ManageSingleSurveyPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManageSingleSurveyPageRoutingModule {}
