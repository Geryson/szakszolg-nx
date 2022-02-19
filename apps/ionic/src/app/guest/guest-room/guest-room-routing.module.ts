import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GuestRoomPage } from './guest-room.page';

const routes: Routes = [
  {
    path: '',
    component: GuestRoomPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GuestRoomPageRoutingModule {}
