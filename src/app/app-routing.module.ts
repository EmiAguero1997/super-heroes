import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path:'',
    pathMatch:'full',
    redirectTo:'/super-heroes/home'
  },
  {
    path:'super-heroes',
    loadChildren:()=> import('../modules/super-hero/super-hero-routing.module').then(m=>m.SuperHeroRoutingModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
