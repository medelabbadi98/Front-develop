import { NO_ERRORS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesRoutingModule } from './pages-routing.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './signup/register.component';
import { Page404Component } from './page404/page404.component';
import { Page500Component } from './page500/page500.component';
import { ButtonModule, CardModule, FormModule, GridModule } from '@coreui/angular';
import { IconModule } from '@coreui/icons-angular';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AngularCountriesFlagsModule } from 'angular-countries-flags'
import {
    AlertModule,
    BadgeModule,
    ModalModule,
    PopoverModule,
    ProgressModule,
    SharedModule,
    ToastModule,
    TooltipModule,
    UtilitiesModule,
    SpinnerModule,
    TableModule
  } from '@coreui/angular';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';
import { ProfileComponent } from './profile/profile.component';
import { SidebarModule } from '@coreui/angular';
import { AppModule } from "../../app.module";
import {SearchFilterPipe} from './../../core/searchFilter';
import { FormsModule } from '@angular/forms';
import { EmployeComponent } from './components/employes/employe.component';

@NgModule({
    declarations: [
        LoginComponent,
        Page404Component,
        Page500Component,
        ForgotpasswordComponent,
        ResetpasswordComponent,
        ProfileComponent,
        SearchFilterPipe,
        EmployeComponent,
        RegisterComponent
    ],
    imports: [
      AppModule,
        CommonModule,
        PagesRoutingModule,
        CardModule,
        ButtonModule,
        GridModule,
        IconModule,
        FormModule,
        ReactiveFormsModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: translateFactory,
                deps: [HttpClient],
            }
        }),
        AngularCountriesFlagsModule,
        AlertModule,
        BadgeModule,
        ModalModule,
        PopoverModule,
        ProgressModule,
        SharedModule,
        ToastModule,
        TooltipModule,
        UtilitiesModule,
        SidebarModule,
        TableModule,
        SpinnerModule,
        FormsModule
    ],
    schemas:[NO_ERRORS_SCHEMA]
})
export class PagesModule {
}
export function translateFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient);
}
