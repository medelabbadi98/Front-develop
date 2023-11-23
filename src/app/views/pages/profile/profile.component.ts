import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/Auth/auth.service'
import { TranslateService } from '@ngx-translate/core';
import { UserService } from 'src/app/services/User/user.service';
import { User } from 'src/app/models/user';
import {Utils}from 'src/app/core/utils';




@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit{

  user = new User;
  colorStatus:string;
  Status:string;
  searchText:string ="";

  visible=true;


  constructor(
    private Fbuilder: FormBuilder,
    private userService:UserService,
    private router: Router,
    public translateService:TranslateService
  ) {

  }

  async ngOnInit(): Promise<void> {
   this.user =  await this.userService.getProfileUser();
   this.userService.getAllUsers().subscribe( response => {
    // Handle success
  },
  error => {
    // Handle error
  },
  () => {
    setTimeout(() => {
      this.visible=false;
    }, 1000);
  })
  //  this.Status=Utils.getStatusProfile(this.user.status);
  //  this.user.status != true ? this.colorStatus="danger":this.colorStatus="success"

  }


}
