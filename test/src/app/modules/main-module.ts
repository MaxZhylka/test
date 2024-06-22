
import { NgModule } from '@angular/core';

import {HomePageComponent} from "../components/home-page/home-page.component";
import {CommonModule} from "@angular/common";
import {MatFormField, MatFormFieldModule} from "@angular/material/form-field";
import {MatInput, MatInputModule} from "@angular/material/input";
import {FormsModule} from "@angular/forms";
import {MatIcon} from "@angular/material/icon";
import {CardComponent} from "../components/card/card.component";


@NgModule({
  declarations: [
    HomePageComponent,
    CardComponent
  ],
  imports: [
    CommonModule,
    MatInputModule,
    MatFormFieldModule,
    MatFormField,
    MatInput,
    FormsModule,
    MatIcon,


  ],
  exports: [
    HomePageComponent
  ],
  providers: []
})
export class MainModule { }
