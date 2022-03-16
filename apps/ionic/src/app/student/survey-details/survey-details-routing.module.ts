import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SurveyDetailsPage } from './survey-details.page';

const routes: Routes = [
  {
    path: '',
    component: SurveyDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SurveyDetailsPageRoutingModule {}
