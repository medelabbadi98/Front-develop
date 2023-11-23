import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'src/app/services/Auth/auth.service';


@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.scss']
})
export class ForgotpasswordComponent {
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

  LoginForm = this.Fbuilder.group({
    email: new FormControl('', [
      Validators.required,
      Validators.email,
      Validators.pattern('^[a-zA-Z]+([.-]?[a-zA-Z0-9]+)*@([a-zA-Z]+([.-]?[a-zA-Z]))[.]{1}[a-zA-Z]{2,}$'),
    ]),
  });

  onSubmit() {


    if (this.LoginForm.valid) {
      this.customStylesValidated=true;
      this.AuthService.checkMail(this.LoginForm.get('email')!.value!.trim()).subscribe(
        (response) => {
          if(response){
          this.color='success';
          this.colorfill='green';
          this.status='Forgotpassword_page_Status_Success';
          this. message='Forgotpassword_page_Message_Success';
          this.toggleToast();
          }else{
            this.color='danger';
            this.colorfill='red';
            this.status='Forgotpassword_page_Status_Failed';
            this. message='Forgotpassword_page_Message_Failed';

            this.toggleToast();

          }
        },
        (error) => {

        }
      );
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
    }else if(localStorage.getItem("Language") === 'en'){
      this.isEn=false;
      this.isFr=true;
    }else{
      this.isEn=true;
      this.isFr=false;
    }
  }

  toggleToast() {
    this.visible = !this.visible;
    setTimeout(() => {
      this.visible = false;
    }, 10000);
  }


}
