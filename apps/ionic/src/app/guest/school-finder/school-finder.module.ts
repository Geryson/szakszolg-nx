import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SchoolFinderPageRoutingModule } from './school-finder-routing.module';

import { SchoolFinderPage } from './school-finder.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SchoolFinderPageRoutingModule
  ],
  declarations: [SchoolFinderPage]
})
export class SchoolFinderPageModule {}
