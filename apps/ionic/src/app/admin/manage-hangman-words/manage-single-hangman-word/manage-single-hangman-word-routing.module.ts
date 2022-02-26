import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ManageSingleHangmanWordPage } from './manage-single-hangman-word.page';

const routes: Routes = [
  {
    path: '',
    component: ManageSingleHangmanWordPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManageSingleHangmanWordPageRoutingModule {}
