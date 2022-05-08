import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PuzzlePickerPage } from './puzzle-picker.page';

const routes: Routes = [
  {
    path: '',
    component: PuzzlePickerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PuzzlePickerPageRoutingModule {}
