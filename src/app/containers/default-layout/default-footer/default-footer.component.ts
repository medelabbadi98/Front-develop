import { Component } from '@angular/core';
import { FooterComponent } from '@coreui/angular';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-default-footer',
  templateUrl: './default-footer.component.html',
  styleUrls: ['./default-footer.component.scss'],
})
export class DefaultFooterComponent extends FooterComponent {
  
  
  isEn=true;
  isFr=false;
  constructor(public translateService:TranslateService) {
    super();
    this.getLang();
    let language = localStorage.getItem('Language') ?? 'fr';
    translateService.addLangs(['fr','en']);
    translateService.setDefaultLang(language);
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
}
