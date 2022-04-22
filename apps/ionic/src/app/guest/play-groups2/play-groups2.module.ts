import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PlayGroups2PageRoutingModule } from './play-groups2-routing.module';

import { PlayGroups2Page } from './play-groups2.page';
import {NxSharedModule} from "../../../shared/nx-shared.module";
//import {DragDropModule} from "primeng/dragdrop";
import {PanelModule} from "primeng/panel";
import {TableModule} from "primeng/table";
import {DialogModule} from "primeng/dialog";
import {ButtonModule} from "primeng/button";
import {ListboxModule} from "primeng/listbox";
import {DragDropModule} from "@angular/cdk/drag-drop";
import {ConfirmDialogModule} from "primeng/confirmdialog";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        PlayGroups2PageRoutingModule,
        NxSharedModule,
        DragDropModule,
        PanelModule,
        TableModule,
        DialogModule,
        ButtonModule,
        ListboxModule,
        DragDropModule,
        ConfirmDialogModule
    ],
  declarations: [PlayGroups2Page]
})
export class PlayGroupsPageModule {}
