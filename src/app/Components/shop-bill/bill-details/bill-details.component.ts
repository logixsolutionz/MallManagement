import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { GlobalDataModule } from 'src/app/Shared/global-data/global-data.module';
import { NotificationService } from 'src/app/Shared/service/notification.service';
import { ShopBillComponent } from '../shop-bill.component';

@Component({
  selector: 'app-bill-details',
  templateUrl: './bill-details.component.html',
  styleUrls: ['./bill-details.component.scss']
})
export class BillDetailsComponent implements OnInit{

  constructor(
    private http:HttpClient,
    @Inject(MAT_DIALOG_DATA) public editData : any,
    private dialogRef: MatDialogRef<ShopBillComponent>,
    private global:GlobalDataModule,
    private msg:NotificationService
  ){

  }

  ngOnInit(): void {
   
   
    this.tableData = this.editData;
    this.getTotal();
  
  }

  
  tableData:any=[];
  TotalCharges:any;


  getTotal(){
    this.TotalCharges = 0;
    for(var i=0; i<this.editData.length;i++){
      this.TotalCharges += this.editData[i].charges;
    }
  }

  closeDialogue(){
    this.dialogRef.close();
  }

}
