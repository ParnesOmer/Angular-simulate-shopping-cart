import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing-module';
import { Login } from './pages/login/login';
import { Register } from './pages/register/register';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AuthRoutingModule,
    Login,
    Register
  ]
})
export class AuthModule { }
