
import { NgModule } from '@angular/core';

import {HomePageComponent} from "../components/home-page/home-page.component";
import {CommonModule} from "@angular/common";
import {MatFormField, MatFormFieldModule} from "@angular/material/form-field";
import {MatInput, MatInputModule} from "@angular/material/input";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatIcon} from "@angular/material/icon";
import {CardComponent} from "../components/card/card.component";
import {HighlightPipe} from "../pipes/highlight.pipe";


@NgModule({
  declarations: [
    HomePageComponent,
    CardComponent,
    HighlightPipe
  ],
    imports: [
        CommonModule,
        MatInputModule,
        MatFormFieldModule,
        MatFormField,
        MatInput,
        FormsModule,
        MatIcon,
        ReactiveFormsModule,


    ],
  exports: [
    HomePageComponent
  ],
  providers: []
})
export class MainModule { }
