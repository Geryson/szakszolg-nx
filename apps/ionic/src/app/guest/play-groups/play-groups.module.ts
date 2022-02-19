import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PlayGroupsPageRoutingModule } from './play-groups-routing.module';

import { PlayGroupsPage } from './play-groups.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PlayGroupsPageRoutingModule
  ],
  declarations: [PlayGroupsPage]
})
export class PlayGroupsPageModule {}
