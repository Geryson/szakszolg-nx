import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext'
import { ButtonModule } from 'primeng/button'
import { IonicModule } from '@ionic/angular';

import { PlayMirrorWordsPageRoutingModule } from './play-mirror-words-routing.module';

import { PlayMirrorWordsPage } from './play-mirror-words.page';
import {NxSharedModule} from "../../../shared/nx-shared.module";
import {DialogModule} from "primeng/dialog";
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        PlayMirrorWordsPageRoutingModule,
        ButtonModule,
        InputTextModule,
        NxSharedModule,
        DialogModule,
        TranslateModule
    ],
  declarations: [PlayMirrorWordsPage]
})
export class PlayMirrorWordsPageModule {}
