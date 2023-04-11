import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SuperHeroRoutingModule } from './super-hero-routing.module';
import { HomeComponent } from './containers/home/home.component';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    SuperHeroRoutingModule,
    HttpClientModule
  ]
})
export class SuperHeroModule { }
