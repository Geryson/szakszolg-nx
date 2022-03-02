import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PlayGroupsPageRoutingModule } from './play-groups-routing.module';

import { PlayGroupsPage } from './play-groups.page';
import {NxSharedModule} from "../../../shared/nx-shared.module";
import {DragDropModule} from "primeng/dragdrop";
import {PanelModule} from "primeng/panel";
import {TableModule} from "primeng/table";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        PlayGroupsPageRoutingModule,
        NxSharedModule,
        DragDropModule,
        PanelModule,
        TableModule
    ],
  declarations: [PlayGroupsPage]
})
export class PlayGroupsPageModule {}
