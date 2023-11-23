import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/User/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  searchText:string ="";

  constructor(private userService:UserService){}

  employeList=[
    {
      class:"h1",
      heading1:"h1",
      heading2:"h1"
    },
    {
      class:"h2",
      heading1:"h2",
      heading2:"h2"
    },
    {
      class:"h3",
      heading1:"h3",
      heading2:"h3"
    }
  ]



  ngOnInit(): void {
    this.userService.getAllUsers().subscribe(item=>{
      console.log(item);
    })
  }

  
}
