import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AppComponent} from "./app.component";
import {provideRouter, RouterOutlet} from "@angular/router";
import {MainModule} from "./modules/main-module";
import {routes} from "./app.routes";
import {provideHttpClient, withFetch} from "@angular/common/http";
import { StoreModule } from '@ngrx/store';

import {BrowserModule, DomSanitizer} from "@angular/platform-browser";
import {StoreDevtoolsModule} from "@ngrx/store-devtools";
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {MatIconRegistry} from "@angular/material/icon";
import {cardReducer, oneCardReducer} from "./store/reducers/card.reducer";
import {EffectsModule} from "@ngrx/effects";
import {CardEffects} from "./store/effects/card.effects";


@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    RouterOutlet,
    MainModule,
    StoreModule.forRoot({ cards: cardReducer, oneCard:oneCardReducer }),
    EffectsModule.forRoot([CardEffects]),
    StoreDevtoolsModule.instrument({ maxAge: 25 })
  ],
  providers: [
    provideRouter(routes),
    provideHttpClient(withFetch()),
    provideAnimationsAsync()
  ],
  bootstrap:[AppComponent]
})
export class AppModule {
  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
  ) {
    this.matIconRegistry.addSvgIcon(
      'custom-search',
      this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/img/searchIcon.svg')
    );
  }
}
