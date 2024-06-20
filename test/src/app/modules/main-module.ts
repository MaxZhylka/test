
import { NgModule } from '@angular/core';

import {HomePageComponent} from "../components/home-page/home-page.component";
import {CommonModule} from "@angular/common";


@NgModule({
  declarations: [
    HomePageComponent
  ],
  imports: [
    CommonModule,

  ],
  exports: [
    HomePageComponent
  ],
  providers: []
})
export class MainModule { }
