import { Component } from '@angular/core';

@Component({
  selector: 'app-employe',
  templateUrl: './employe.component.html',
  styleUrls: ['./employe.component.scss']
})
export class EmployeComponent {
  searchText:string ="";
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
}
