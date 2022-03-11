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
import {DialogModule} from "primeng/dialog";
import {ButtonModule} from "primeng/button";
import {ListboxModule} from "primeng/listbox";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        PlayGroupsPageRoutingModule,
        NxSharedModule,
        DragDropModule,
        PanelModule,
        TableModule,
        DialogModule,
        ButtonModule,
        ListboxModule
    ],
  declarations: [PlayGroupsPage]
})
export class PlayGroupsPageModule {}
