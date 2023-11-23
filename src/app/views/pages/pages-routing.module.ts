import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Page404Component } from './page404/page404.component';
import { Page500Component } from './page500/page500.component';
import { LoginComponent } from './login/login.component';

import {AuthGuard} from './../../Guards/auth.guard'
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './signup/register.component';
const routes: Routes = [
  {
    path: '404',
    component: Page404Component,
    data: {
      title: 'Page 404'
    }
  },
  {
    path: '500',
    component: Page500Component,
    data: {
      title: 'Page 500'
    }
  },
  {
    path: 'forgotpassword',
    component: ForgotpasswordComponent,
    data: {
      title: 'ForgotPassword'
    },
  },
  {
    path: 'resetpassword',
    component:ResetpasswordComponent,
    data: {
      title: 'ForgotPassword'
    }
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Login Page'
    }

  },
  {
    path: 'signup',
    component: RegisterComponent,
    data: {
      title: 'Regitre Page'
    }

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule {
}
