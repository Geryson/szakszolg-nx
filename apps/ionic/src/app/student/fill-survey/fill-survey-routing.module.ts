import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FillSurveyPage } from './fill-survey.page';

const routes: Routes = [
  {
    path: '',
    component: FillSurveyPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FillSurveyPageRoutingModule {}
