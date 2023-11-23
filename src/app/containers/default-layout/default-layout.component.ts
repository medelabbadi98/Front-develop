import { Component } from '@angular/core';

import { Permission } from './_nav';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html',
})
export class DefaultLayoutComponent {


  public navItems =this.permission.navItems;

  public perfectScrollbarConfig = {
    suppressScrollX: true,
  };

  constructor(private permission:Permission) {}
}
