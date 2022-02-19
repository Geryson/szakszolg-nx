import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ManageMirrorWordsPage } from './manage-mirror-words.page';

const routes: Routes = [
  {
    path: '',
    component: ManageMirrorWordsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManageMirrorWordsPageRoutingModule {}
