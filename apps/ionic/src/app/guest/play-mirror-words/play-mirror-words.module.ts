import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PlayMirrorWordsPageRoutingModule } from './play-mirror-words-routing.module';

import { PlayMirrorWordsPage } from './play-mirror-words.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PlayMirrorWordsPageRoutingModule
  ],
  declarations: [PlayMirrorWordsPage]
})
export class PlayMirrorWordsPageModule {}
