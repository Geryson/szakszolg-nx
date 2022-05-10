import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PlayHangmanPageRoutingModule } from './play-hangman-routing.module';

import { PlayHangmanPage } from './play-hangman.page';
import {NxSharedModule} from "../../../shared/nx-shared.module";
import {ListboxModule} from "primeng/listbox";
import {DialogModule} from "primeng/dialog";
import {ButtonModule} from "primeng/button";
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        PlayHangmanPageRoutingModule,
        NxSharedModule,
        ListboxModule,
        DialogModule,
        ButtonModule,
        TranslateModule
    ],
  declarations: [PlayHangmanPage]
})
export class PlayHangmanPageModule {}
