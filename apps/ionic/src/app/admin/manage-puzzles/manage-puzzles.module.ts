import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ManagePuzzlesPageRoutingModule } from './manage-puzzles-routing.module';

import { ManagePuzzlesPage } from './manage-puzzles.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ManagePuzzlesPageRoutingModule
  ],
  declarations: [ManagePuzzlesPage]
})
export class ManagePuzzlesPageModule {}
