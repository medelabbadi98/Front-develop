import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { DepenseDTO } from 'src/app/models/DepenceDTO';
import { DepenseService } from 'src/app/services/depense.service';

@Component({
  selector: 'app-accordions',
  templateUrl: './accordions.component.html',
  styleUrls: ['./accordions.component.scss']
})
export class AccordionsComponent implements OnInit {
  DepenceList!:DepenseDTO[];


  constructor(private DepenceService:DepenseService ) { }

  myFunc(value:any,item:any):void{
    console.log(item);
    sessionStorage.setItem("id",item);
  }

  ngOnInit(): void {
    this.DepenceService.getAllDepense().subscribe(items=>{
      console.log(items);
      this.DepenceList=items;
    })
  }
}
