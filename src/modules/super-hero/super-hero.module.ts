import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SuperHeroRoutingModule } from './super-hero-routing.module';
import { HomeComponent } from './containers/home/home.component';


@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    SuperHeroRoutingModule
  ]
})
export class SuperHeroModule { }
