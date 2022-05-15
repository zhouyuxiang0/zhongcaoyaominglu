import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ShareModule } from '../share/share.module';
import { LoginFormComponent } from './login-form/login-form.component';
import { LoginComponent } from './login.component';

@NgModule({
  declarations: [LoginComponent, LoginFormComponent],
  imports: [CommonModule, ShareModule],
})
export class LoginModule {}
