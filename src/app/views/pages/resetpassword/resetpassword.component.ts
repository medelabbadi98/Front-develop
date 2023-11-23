import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { cilCheck } from '@coreui/icons';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'src/app/services/Auth/auth.service';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.scss']
})
export class ResetpasswordComponent implements OnInit{

  main_headers: any = {};
  tooltipValidated = false;
  customStylesValidated = false;
  isEn = true;
  isFr = false;
  color = 'danger';
  colorfill = 'red';
  message = '';
  status = '';
  position = 'top-center';
  visible = false;
  percentage = 0;
  icons = { cilCheck };
  tokenValue:string | undefined;
  constructor(
    private Fbuilder: FormBuilder,
    private AuthService: AuthService,
    private router: Router,
    public translateService: TranslateService,
    private route: ActivatedRoute
  ) {
    this.getLang();
    let language = localStorage.getItem('Language') ?? 'fr';
    translateService.addLangs(['fr', 'en']);
    translateService.setDefaultLang(language);
    this.route.queryParams
    .subscribe(params => {
      if(params.token !== null){
        this.tokenValue=params.token;
      }
    }
  );
  }

  ngOnInit(): void {
   
    let body={ token : this.tokenValue};
    this.AuthService.checkTokenIsExpired(body).subscribe(res=>{
      if(res || this.tokenValue == null)
      {
        this.router.navigate(['404']);
      }
    });
  }

  LoginForm = this.Fbuilder.group({
    password: [
      '',
      Validators.compose([
        Validators.required,
        Validators.pattern(
          /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/
        ),
        Validators.minLength(8),
      ]),
    ],
    confirmpassword: [
      '',
      Validators.compose([
        Validators.required,
        Validators.pattern(
          /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/
        ),
        Validators.minLength(8),
      ]),
    ],
  },
    {
      validator: this.ConfirmedValidator('password', 'confirmpassword'),
    }
  );

  onSubmit() {

    if (this.LoginForm.valid) {
      this.customStylesValidated = true;
      let body = {
        token:this.tokenValue,
        password:this.LoginForm.get('password')!.value!.trim()
      }
      this.AuthService.updatePassword(body).subscribe(
        (response) => {
          if (response) {
            this.color = 'success';
            this.colorfill = 'green';
            this.status = 'Forgotpassword_page_Status_Success';
            this.message = 'UpdatePassword_page_Message_Success';

            this.toggleToast();
           

          } else {
            this.color = 'danger';
            this.colorfill = 'red';
            this.status = 'Forgotpassword_page_Status_Failed';
            this.message = 'UpdatePassword_page_Message_Failed';
            this.toggleToast();

          }
        },
        (error) => {

        }
      );
    }
  }

  translateSite(language: string) {
    if (language === "en") {
      this.isFr = true;
      this.isEn = false;
      localStorage.setItem("Language", 'en')
    } else {
      this.isEn = true;
      this.isFr = false;
      localStorage.setItem("Language", 'fr')
    }
    this.translateService.use(language);
  }

  getLang() {
    if (localStorage.getItem("Language") == null) {
      this.isEn = true;
      this.isFr = false;
      localStorage.setItem("Language", 'fr')
    } else if (localStorage.getItem("Language") === 'en') {
      this.isEn = false;
      this.isFr = true;
    } else {
      this.isEn = true;
      this.isFr = false;
    }
  }

  toggleToast() {
    this.visible = !this.visible;
    setTimeout(() => {
      this.visible = false;
      this.router.navigate(['login']);
    }, 6000);
  }

  ConfirmedValidator(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];
      if (
        matchingControl.errors &&
        !matchingControl.errors.confirmedValidator
      ) {
        return;
      }
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ confirmedValidator: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }
}
