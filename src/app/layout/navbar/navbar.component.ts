import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  providers : [AuthenticationService]
})
export class NavbarComponent implements OnInit {

  isCollapsed: Boolean = true;
  
  public userName:string;

  constructor(private authenticationService:AuthenticationService) { 

  }

  ngOnInit() :void{
    console.log(this+" : "+this.authenticationService.getUserName())
    this.setUserName(this.authenticationService.getUserName());
  }
  ngAfterViewInit() {
    console.log(this+" : "+this.authenticationService.getUserName())
    this.setUserName(this.authenticationService.getUserName());
  }
  logout(){
    this.authenticationService.logout();
  }


  isLoggedIn():boolean{
    return this.authenticationService.isLoggedIn();
  }
  setUserName(userName:string){
    this.userName=userName;
  }

}