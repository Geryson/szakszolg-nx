import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GuestRoomPageRoutingModule } from './guest-room-routing.module';

import { GuestRoomPage } from './guest-room.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GuestRoomPageRoutingModule
  ],
  declarations: [GuestRoomPage]
})
export class GuestRoomPageModule {}
