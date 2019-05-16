import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AXTabularLayoutComponent } from 'acorex-spa';
import { LoginPageComponent } from './pages/login/login.page';

const routes: Routes = [
  {
    path: "",
    component: LoginPageComponent
  },
  {
    path: "home",
    component: AXTabularLayoutComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
