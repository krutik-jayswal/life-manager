import { Component, OnInit, Inject } from '@angular/core';
import { PasswordService } from '../services/password.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Password } from '../entity/password';

@Component({
  selector: 'app-password-operation',
  templateUrl: './password-operation.component.html',
  styleUrls: ['./password-operation.component.css'],
  providers: [PasswordService]
})
export class PasswordOperationComponent implements OnInit {

  public form: FormGroup;
  public isNewRecord: boolean = true;
  public passwordId: number;
  public id:number;
  public title:string;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
  public dialogRef: MatDialogRef<PasswordOperationComponent>,
  private fb: FormBuilder,
  private passwordService:PasswordService) { }

  ngOnInit() {
    this.form = this.fb.group({      
      name:[this.data.name, []],
      description:[this.data.description, []],
      password:[ "", []],
      key:["",[]]
    });
    this.id=this.data.id;
    this.title=this.data.title;
  }

  updatePassword() {
    this.passwordService.updatePassword(new Password(
      this.passwordId,
      this.form.value.name,
      this.form.value.description,
      this.form.value.password,
      this.form.value.key
    ));   
  }

  savePassword(){
    this.passwordService.savePassword(new Password(
      this.passwordId,
      this.form.value.name,
      this.form.value.description,
      this.form.value.password,
      this.form.value.key
    ));
  }
close(){
  this.dialogRef.close();
}


}
