import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SurveyResultsPage } from './survey-results.page';

const routes: Routes = [
  {
    path: '',
    component: SurveyResultsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SurveyResultsPageRoutingModule {}
