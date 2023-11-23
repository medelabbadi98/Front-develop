import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/Auth/auth.service';
import {ValidationFormsService} from './validation-forms.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  main_headers: any = {};
  tooltipValidated=false;
  customStylesValidated = false;
  isEn=true;
  isFr=false;
  color='danger';
  colorfill='red';
  message='';
  status='';
  position = 'top-center';
  visible = false;
  percentage = 0;

  constructor(
    private Fbuilder: FormBuilder,
    private AuthService: AuthService,
    private router: Router,
    public translateService:TranslateService
  ) {
    this.getLang();
    let language = localStorage.getItem('Language') ?? 'fr';
    translateService.addLangs(['fr','en']);
    translateService.setDefaultLang(language);
  }

  RegisterForm = this.Fbuilder.group({
    email: new FormControl('', [
      Validators.required,
      Validators.email,
      Validators.pattern('^[a-zA-Z]+([.-]?[a-zA-Z0-9]+)*@([a-zA-Z]+([.-]?[a-zA-Z]))[.]{1}[a-zA-Z]{2,}$'),
    ]),
    username: new FormControl('', [
      Validators.required,
       ]),
    password: [
      '',
      Validators.compose([
        Validators.required,
        // Validators.pattern(
        //   /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/
        // ),
        Validators.minLength(6),
      ]),
    ],
    confirmPassword: [
      '',
      Validators.compose([
        Validators.required,
        // Validators.pattern(
        //   /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/
        // ),
        Validators.minLength(6),
      ]),
    ],
    name: [
      '',
      Validators.compose([
        Validators.required,
        // Validators.pattern(
        //   /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/
        // ),
        Validators.minLength(6),
      ]),
    ],
  });

  onSubmit() {
    if (this.RegisterForm.valid) {
      this.customStylesValidated=true;
      let body: URLSearchParams = new URLSearchParams();
      body.set('email', this.RegisterForm.get('email')!.value!.trim());
      body.set('name', this.RegisterForm.get('name')!.value!);
      body.set('username', this.RegisterForm.get('username')!.value!);
      body.set('password', this.RegisterForm.get('password')!.value!.trim());
      console.log(body);
      // this.AuthService.signup(body).subscribe(
      //   (response) => {
      //     this.color='success';
      //     this.colorfill='green';
      //     this.status='Registre_page_Toast_Status_Success';
      //     this. message='Registre_page_Toast_Message_Success';
      //     this.toggleToast();
      //     this.router.navigate(['login']);
      //   },
      //   (error) => {
      //     this.router.navigate(['login']);
      //     this.color='danger';
      //     this.status='Login_page_Toast_Status_Failed';
      //     this. message='Login_page_Toast_Message_Failed';
      //     this.toggleToast();
      //   }
      // );
    }
  }

  translateSite(language: string) {
    if(language ==="en"){
      this.isFr=true;
      this.isEn=false;
      localStorage.setItem("Language",'en')
    }else{
      this.isEn=true;
      this.isFr=false;
      localStorage.setItem("Language",'fr')
    }
    this.translateService.use(language);
  }

  getLang(){
    if(localStorage.getItem("Language") == null){
      this.isEn=true;
      this.isFr=false;
      localStorage.setItem("Language",'fr')
    }else
      if(localStorage.getItem("Language") === 'en'){
        this.isEn=false;
        this.isFr=true;
      }else{
        this.isEn=true;
        this.isFr=false;
    }
  }

  toggleToast() {
    this.visible = !this.visible;
  }

  onVisibleChange($event: boolean) {
    this.visible = $event;
    this.percentage = !this.visible ? 0 : this.percentage;
  }

  onTimerChange($event: number) {
    this.percentage = $event * 20;
  }
}
