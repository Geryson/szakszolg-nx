import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ManageSingleHangmanWordPageRoutingModule } from './manage-single-hangman-word-routing.module';

import { ManageSingleHangmanWordPage } from './manage-single-hangman-word.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ManageSingleHangmanWordPageRoutingModule
  ],
  declarations: [ManageSingleHangmanWordPage]
})
export class ManageSingleHangmanWordPageModule {}
