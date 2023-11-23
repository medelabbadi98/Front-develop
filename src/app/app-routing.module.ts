import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DefaultLayoutComponent } from './containers';
import { Page404Component } from './views/pages/page404/page404.component';
import { Page500Component } from './views/pages/page500/page500.component';
import { LoginComponent } from './views/pages/login/login.component';
import {AuthGuard} from './/Guards/auth.guard';
import {ViewGuard} from './/Guards/view.guard';
import{UserComponent} from './views/user/user.component';
import { ForgotpasswordComponent } from './views/pages/forgotpassword/forgotpassword.component';
import { ResetpasswordComponent } from './views/pages/resetpassword/resetpassword.component';
import { ProfileComponent } from './views/pages/profile/profile.component';
import { RegisterComponent } from './views/pages/signup/register.component';
import { EditDepenceComponent } from './views/base/edit-depence/edit-depence.component';
const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    data: {
      title: 'Home'
    },
    canActivate:[AuthGuard],
    children: [
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./views/dashboard/dashboard.module').then((m) => m.DashboardModule),
          canActivate:[AuthGuard]

      },
      {
        path: 'theme',
        loadChildren: () =>
          import('./views/theme/theme.module').then((m) => m.ThemeModule),
          // canActivate:[AuthGuard]
      },
      {
        path: 'base',
        loadChildren: () =>
          import('./views/base/base.module').then((m) => m.BaseModule),
          canActivate:[AuthGuard]
      },
      {
        path: 'buttons',
        loadChildren: () =>
          import('./views/buttons/buttons.module').then((m) => m.ButtonsModule),
          // canActivate:[AuthGuard]
      },
      {
        path: 'forms',
        loadChildren: () =>
          import('./views/forms/forms.module').then((m) => m.CoreUIFormsModule),
          // canActivate:[AuthGuard]
      },
      {
        path: 'charts',
        loadChildren: () =>
          import('./views/charts/charts.module').then((m) => m.ChartsModule),
          // canActivate:[AuthGuard]
      },
      {
        path: 'icons',
        loadChildren: () =>
          import('./views/icons/icons.module').then((m) => m.IconsModule),
          // canActivate:[AuthGuard]
      },
      {
        path: 'notifications',
        loadChildren: () =>
          import('./views/notifications/notifications.module').then((m) => m.NotificationsModule),
          // canActivate:[AuthGuard]
      },
      {
        path: 'widgets',
        loadChildren: () =>
          import('./views/widgets/widgets.module').then((m) => m.WidgetsModule),
          // canActivate:[AuthGuard]
      },
      {
        path: 'pages',
        loadChildren: () =>
          import('./views/pages/pages.module').then((m) => m.PagesModule),
          // canActivate:[AuthGuard]
      },
      {
        path: 'user',
       component:UserComponent,
      //  canActivate:[AuthGuard],
       data: {
         title: 'User'
       }
      },
      {
        path: 'profile',
        component:ProfileComponent,

        data: {
          title: 'Profile'
        }
      },


    ]
  },
  {
    path: '404',
    component: Page404Component,
    data: {
      title: 'Page 404'
    }
  },
  {
    path: 'forgotpassword',
    component: ForgotpasswordComponent,
    data: {
      title: 'ForgotPassword'
    }
  },
  {
    path: 'resetpassword',
    component: ResetpasswordComponent,
    data: {
      title: 'ForgotPassword'
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
      title: 'register Page'
    }
  },
  // {
  //   path: 'editdepence',
  //   component: EditDepenceComponent,
  //   data: {
  //     title: 'EditDepence',
  //   },
  // },

  {path: '**', redirectTo: 'dashboard'}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'top',
      anchorScrolling: 'enabled',
      initialNavigation: 'enabledBlocking'
      // relativeLinkResolution: 'legacy'
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
