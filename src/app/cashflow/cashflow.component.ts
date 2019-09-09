import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cashflow',
  templateUrl: './cashflow.component.html',
  styleUrls: ['./cashflow.component.css']
})
export class CashflowComponent implements OnInit {

  constructor( private router: Router) { }

  ngOnInit() {
  }
  showDetails($event){
    this.router.navigateByUrl("cashflow/"+$event.srcElement.id);
    for(var i=0;i<event.srcElement.parentElement.children.length;i++){
      event.srcElement.parentElement.children[i].className="";
    }
    event.srcElement.className="Active";
    return false;
  }

}
