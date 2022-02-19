import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ManageHangmanWordsPageRoutingModule } from './manage-hangman-words-routing.module';

import { ManageHangmanWordsPage } from './manage-hangman-words.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ManageHangmanWordsPageRoutingModule
  ],
  declarations: [ManageHangmanWordsPage]
})
export class ManageHangmanWordsPageModule {}
