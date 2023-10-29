import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Inject, OnInit, Output, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { GlobalDataModule } from 'src/app/Shared/global-data/global-data.module';
import { NotificationService } from 'src/app/Shared/service/notification.service';
import { ShopBillComponent } from '../shop-bill.component';
import { environment } from 'src/environments/environment.development';
import { error } from 'jquery';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-billform',
  templateUrl: './billform.component.html',
  styleUrls: ['./billform.component.scss']
})
export class BillformComponent implements OnInit {

  @ViewChild(ShopBillComponent) mainPage:any;


  @Output() eventEmitterprint = new EventEmitter();

  shopBillDate:Date = new Date(Date.now());
  BillRemarks:any;
  wapdaCharges:any;
  hvacCharges:any;
  GasCharges:any;
  GeneratorCharges:any;
  commissionCharges:any;



  constructor(
    
    private http:HttpClient,
    @Inject(MAT_DIALOG_DATA) public editData : any,
    private dialogRef: MatDialogRef<ShopBillComponent>,
    private global:GlobalDataModule,
    private msg:NotificationService,
    
  ){}

  ngOnInit(): void {
    
  }


  formateDate(){
    // this.global.newDateFormate(this.shopBillDate);    //////////// will send the current date to DB////////////////////
    // this.shopBillDate.toISOString().substring(0,10);  /////////// will send only the date Section////////////////
  }


  changeValue(val: any) {
    // alert(val.target.value);
    if (val.target.value < '0') {
      val.target.value = '0';
    }else if(val.target.value == ''){
      val.target.value = '0';
    }
  }
  

  //////////////////////////////////////////////////////////////

  saveBill(){
    $('.loaderDark').show();
   
     if(this.wapdaCharges === '' || this.wapdaCharges === undefined){
      this.msg.WarnNotify('Enter Wapda Charges')
    }else if(this.BillRemarks == '' || this.BillRemarks == undefined){
      this.BillRemarks = '-';
    }else{
      
      $('.loaderDark').show();

     

      this.http.post(environment.mallApiUrl+'InsertGenBill',{
        ShopID: this.editData.shopID,
        PartyID: this.editData.partyID,
        BillDate: this.global.dateFormater(this.shopBillDate,'-'),
        ShopRentHistoryID: this.editData.shopRentHistoryID,
        ShopAreaSQ: this.editData.shopAreaSQ,
        Remarks: this.BillRemarks,
        WapdaCharges: this.wapdaCharges,
        HvacCharges:this.hvacCharges,
        GasCharges:this.GasCharges,
        GeneratorCharges:this.GeneratorCharges,
        CommissionCharges:this.commissionCharges,
        UserID: this.global.getUserID(),
        }).subscribe(
          (Response:any)=>{
            if(Response.msg == 'Data Saved Successfully'){
              
              this.msg.SuccessNotify(Response.msg);
             
              this.dialogRef.close(Response.billNo);
             
              
              $('.loaderDark').fadeOut(500);
              
            }else{
              this.msg.WarnNotify(Response.msg);
             
              
              $('.loaderDark').fadeOut(500);      
            }
          },
          (error:any)=>{
            this.msg.WarnNotify('Error Occured while Saving')
            console.log(error);
            
             $('.loaderDark').fadeOut(500);
           
          }
        )
    }
   
  }


  


  closeDialogue(){
    this.dialogRef.close();
  }

  reset(){
    this.shopBillDate= new Date(Date.now());
    this.wapdaCharges = '';
    this.BillRemarks = '';
  }


}
