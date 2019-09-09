import { Component, OnInit } from '@angular/core';
import { PasswordService } from '../../services/password.service';
import { Password } from '../../entity/password';
import { PasswordOperationComponent } from '../../password-operation/password-operation.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-passwords',
  templateUrl: './passwords.component.html',
  styleUrls: ['./passwords.component.css'],
  providers: [PasswordService]
})
export class PasswordsComponent implements OnInit {
  public isNewRecord: boolean = true;
  public passwordId: number;
  public name: string;
  public description: string;
  public password:string;
  public key;
  public passwords: Password[];

  constructor(private passwordService: PasswordService,
    public dialog: MatDialog) { }


  ngOnInit() {
    this.listPasswords()
  }
  listPasswords() {
    this.passwordService.getPasswords().subscribe(passwords=>{
      this.passwords=passwords;
    });
  }
  getPassword($event) {
    this.passwordService.getPassword($event.srcElement.parentElement.id,$event.srcElement.parentElement.previousElementSibling.children[0].value).subscribe(password=>{
      $event.srcElement.parentElement.previousElementSibling.innerHTML=password.password;
    })
  }
  deletePassword($event) {
    this.passwordService.deletePassword($event.srcElement.parentElement.id).subscribe(
      e=>{
        this.listPasswords()
      }
    );
  }
  editPassword($event) {
    this.passwordService.getPassword($event.srcElement.parentElement.id,$event.srcElement.parentElement.previousElementSibling.children[0].value).subscribe(password=>{
      this.dialog.open(PasswordOperationComponent,
        {
          maxWidth: '50%',
          maxHeight: '50%',
          width: '80%',
          height: '80%',
          data : {
            title: 'Edit Password',
            name:password.name,
            description:password.description,
            password:password.password,
            id:password.passwordId,
            isNewRecord:false
          }
        });
    })
  }
  addNewPassword(){
    this.dialog.open(PasswordOperationComponent,
      {
        maxWidth: '40%',
        maxHeight: '40%',
        width: '80%',
        height: '80%',
        data : {
          title: 'New Password',          
          isNewRecord:true
        }
      });
  }
}
