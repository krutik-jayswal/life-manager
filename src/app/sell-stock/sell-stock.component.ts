import { Component, OnInit, Inject } from '@angular/core';
import { StockService } from '../services/stock.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-sell-stock',
  templateUrl: './sell-stock.component.html',
  styleUrls: ['./sell-stock.component.css'],
  providers:[StockService]
})
export class SellStockComponent implements OnInit {
  
  public form: FormGroup;

  constructor(private stockService: StockService,
    public dialogRef: MatDialogRef<SellStockComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder) { }

  ngOnInit() {
    this.form = this.fb.group({
      name:[this.data.name, []],
      sellingPrice:[this.data.amount, []],
      stockId:[ this.data.stockId, []]
    });

  }
  sell() {
    this.stockService.sellStock(this.form.value.stockId, this.form.value.sellingPrice).subscribe(
      e => {
        this.dialogRef.close();
      }
    );
  }
  close() {
    this.dialogRef.close();
  }
}
