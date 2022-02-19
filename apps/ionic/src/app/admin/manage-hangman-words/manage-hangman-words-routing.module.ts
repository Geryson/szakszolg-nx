import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ManageHangmanWordsPage } from './manage-hangman-words.page';

const routes: Routes = [
  {
    path: '',
    component: ManageHangmanWordsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManageHangmanWordsPageRoutingModule {}
