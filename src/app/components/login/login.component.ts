import { Component, OnInit, ViewChild } from '@angular/core';

import { User } from '../../entity/user';
import { AuthenticationService } from '../../services/authentication.service';
import { Route, Router } from '@angular/router';
import { NavbarComponent } from '../../layout/navbar/navbar.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers:[AuthenticationService,NavbarComponent]
})
export class LoginComponent implements OnInit {

  @ViewChild("userName")
  public userName:string; 

  @ViewChild("password")
  public password:string; 
  

  constructor(private authenticationService: AuthenticationService,
    private navbarComponent:NavbarComponent,
    private router: Router) { }

  ngOnInit() {
   
  }
 
  login(){    
    this.authenticationService.login(new User(this.userName,this.password)).subscribe
    (
      (res: any) => {
        if(res['access_token']!=null && res['access_token']!=undefined){
          this.authenticationService.setDetails(res['user'],res['access_token']);
          this.navbarComponent.ngOnInit();
          this.router.navigateByUrl("cashflow/expense");
        }
      }
    );

  }

}
