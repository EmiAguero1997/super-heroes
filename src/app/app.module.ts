import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SuperHeroModule } from 'src/modules/super-hero/super-hero.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SuperHeroModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
