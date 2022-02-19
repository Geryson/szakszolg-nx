import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PlayHangmanPageRoutingModule } from './play-hangman-routing.module';

import { PlayHangmanPage } from './play-hangman.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PlayHangmanPageRoutingModule
  ],
  declarations: [PlayHangmanPage]
})
export class PlayHangmanPageModule {}
