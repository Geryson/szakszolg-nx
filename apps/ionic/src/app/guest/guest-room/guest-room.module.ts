import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GuestRoomPageRoutingModule } from './guest-room-routing.module';

import { GuestRoomPage } from './guest-room.page';
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        GuestRoomPageRoutingModule,
        TranslateModule
    ],
  declarations: [GuestRoomPage]
})
export class GuestRoomPageModule {}
