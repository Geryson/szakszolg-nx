import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PuzzlePickerPageRoutingModule } from './puzzle-picker-routing.module';

import { PuzzlePickerPage } from './puzzle-picker.page';
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PuzzlePickerPageRoutingModule,
    TranslateModule
  ],
  declarations: [PuzzlePickerPage]
})
export class PuzzlePickerPageModule {}
