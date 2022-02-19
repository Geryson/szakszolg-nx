import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SchoolFinderPage } from './school-finder.page';

const routes: Routes = [
  {
    path: '',
    component: SchoolFinderPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SchoolFinderPageRoutingModule {}
