import { Component, OnInit } from '@angular/core';
import { Direction } from '@angular/cdk/bidi';


@Component({
  selector: 'app-chef',
  templateUrl: './chef.component.html',
  styleUrls: ['./chef.component.css']
})
export class ChefComponent implements OnInit {
  renderViewControler:string = "pending";
  originalDirection: Direction = "ltr";

  constructor(  ) { }

  ngOnInit(): void {  }

  
  renderViewPending(){
    this.renderViewControler = "pending"
  }
  renderViewdelivering(){
    this.renderViewControler = "delivered"
  }

  logOut(){
    localStorage.clear();
  }
}
