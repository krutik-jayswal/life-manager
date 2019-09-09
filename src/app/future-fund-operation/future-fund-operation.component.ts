import { Component, OnInit, Inject } from '@angular/core';
import { FutureFundService } from '../services/future-fund.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FutureFund } from '../entity/future-fund';

@Component({
  selector: 'app-future-fund-operation',
  templateUrl: './future-fund-operation.component.html',
  styleUrls: ['./future-fund-operation.component.css'],
  providers: [FutureFundService]
})
export class FutureFundOperationComponent implements OnInit {
  
  public form: FormGroup;
  public title:string;
  public isNewRecord: boolean = true;
  
  public desiredDateString: string;
  public createdDateString: string;
  public id: number;

  constructor(public dialogRef: MatDialogRef<FutureFundOperationComponent>,
  @Inject(MAT_DIALOG_DATA) public data: any,
  private fb: FormBuilder,
  private fundService:FutureFundService) { }

  ngOnInit() {
    this.form = this.fb.group({
      name:[this.data.name, []],
      amountNeeded:[this.data.amountNeeded, []],
      createdDate:[ "", []],
      desiredDate:["",[]]
    });
    this.id=this.data.id;
    this.title=this.data.title;
    this.isNewRecord=this.data.isNewRecord;
    this.createdDateString=new Date(this.data.createdDate).toISOString().split('T')[0];
    this.desiredDateString=new Date(this.data.desiredDate).toISOString().split('T')[0];
  }
  close(){
    this.dialogRef.close();
  }
  saveFund(){
    this.fundService.saveFund(new FutureFund(null,
      this.form.value.name,
      this.form.value.amountNeeded,
      new Date(Date.parse(this.createdDateString)),
      new Date(Date.parse(this.desiredDateString)),
      null,
      null
    ),this.dialogRef);
  }
  updateFund(event:any){
      this.fundService.updateFund(new FutureFund(this.id,
        this.form.value.name,
        this.form.value.amountNeeded,
        new Date(Date.parse(this.createdDateString)),
        new Date(Date.parse(this.desiredDateString)),
        null,
        null
      ),this.dialogRef);
  }

}
