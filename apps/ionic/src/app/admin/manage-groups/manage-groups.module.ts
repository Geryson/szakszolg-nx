import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ManageGroupsPageRoutingModule } from './manage-groups-routing.module';

import { ManageGroupsPage } from './manage-groups.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ManageGroupsPageRoutingModule
  ],
  declarations: [ManageGroupsPage]
})
export class ManageGroupsPageModule {}
