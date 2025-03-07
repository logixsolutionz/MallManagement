import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Inject, OnInit, Output, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { GlobalDataModule } from 'src/app/Shared/global-data/global-data.module';
import { NotificationService } from 'src/app/Shared/service/notification.service';
import { ShopBillComponent } from '../shop-bill.component';
import { environment } from 'src/environments/environment.development';
import { error } from 'jquery';
import { AppComponent } from 'src/app/app.component';
import * as $ from 'jquery';

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

  wapdaImg:any = '';
  generatorImg:any = '';
  HVACImg:any = '';



  WapdaPreviousUnits:any = 0;
  WapdaCurrentUnits:any = 0;
  WapdaUnitRate:any  = 0;
  WapdaTotalUnits:any = 0;
  WapdaReadingImg:any = '';



  HvacPreviousUnits:any = 0;
  HvacCurrentUnits = 0;
  HvacUnitRate:any = 0;
  HvacTotalUnits:any = 0 ;
  HvacReadingImg:any = '' ;
  HvacKwh:any = 0;

  GeneratorPreviousUnits:any = 0;
  GeneratorCurrentUnits:any =0;
  GeneratorUnitRate:any  = 0;
  GeneratorTotalUnits:any = 0 ;
  GeneratorReadingImg:any = '' ;




  constructor(
    
    private http:HttpClient,
    @Inject(MAT_DIALOG_DATA) public editData : any,
    private dialogRef: MatDialogRef<ShopBillComponent>,
    public global:GlobalDataModule,
    private msg:NotificationService,
    
  ){}

  ngOnInit(): void {
    
  }


  formateDate(){
    // this.global.newDateFormate(this.shopBillDate);    //////////// will send the current date to DB////////////////////
    // this.shopBillDate.toISOString().substring(0,10);  /////////// will send only the date Section////////////////
  }



  onLogo1Selected(event:any,type:any) {
    var ext = this.global.getExtension(event.target.value);
    if(ext == 'png' ||ext == 'jpg' ||ext == 'jpeg'||ext == 'jfif'){
      let targetEvent = event.target;
  
      let file:File = targetEvent.files[0];
  
      let fileReader:FileReader = new FileReader();
  
  
    
    fileReader.onload =(e)=>{
      if(type == 'wapda'){
        this.WapdaReadingImg = fileReader.result;
      }else if(type == 'hvac'){
        this.HvacReadingImg = fileReader.result;
      }else if(type == 'generator'){
        this.GeneratorReadingImg = fileReader.result;
      }
    }
  
    fileReader.readAsDataURL(file);

    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      input.value = ''; // Reset input value
    }
  
    }else{
      
        event.target.value = '';
        this.msg.WarnNotify('File Must Be in png / jpg / jpeg formate Only');
     
      }
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
   
     if(this.wapdaCharges === '' || this.wapdaCharges === undefined || this.wapdaCharges == 0 || this.wapdaCharges < 0){
      this.msg.WarnNotify('Enter Wapda Charges')
    }else if(this.wapdaCharges != '' && this.WapdaReadingImg == ''){
        this.msg.WarnNotify('Insert Meter Reading Img')
    }else if(this.hvacCharges != '' && this.HvacReadingImg == ''){
      this.msg.WarnNotify('Insert HVAC Reading Img')
    }else if(this.GeneratorCharges != '' && this.GeneratorReadingImg == ''){
      this.msg.WarnNotify('Insert Generator Reading Img')
    }

    else{


       if(this.BillRemarks == '' || this.BillRemarks == undefined){
        this.BillRemarks = '-';
      }
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

        WapdaPreviousUnits:this.WapdaPreviousUnits,
        WapdaCurrentUnits:this.WapdaCurrentUnits,
        WapdaUnitRate :this.WapdaUnitRate,
        WapdaTotalUnits :this.WapdaTotalUnits,
        WapdaReadingImg : this.WapdaReadingImg,
        
        HvacPreviousUnits : this.HvacPreviousUnits,
        HvacCurrentUnits : this.HvacPreviousUnits,
        HvacUnitRate : this.HvacUnitRate,
        HvacTotalUnits : this.HvacTotalUnits,
        HvacReadingImg: this.HvacReadingImg,
        HvacKwh : this.HvacKwh,
      
        GeneratorPreviousUnits: this.GeneratorPreviousUnits,
        GeneratorCurrentUnits: this.GeneratorCurrentUnits,
        GeneratorUnitRate  : this.GeneratorUnitRate,
        GeneratorTotalUnits : this.GeneratorTotalUnits,
        GeneratorReadingImg: this.GeneratorReadingImg,


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



  calculateUnits(){
    this.WapdaTotalUnits = this.WapdaCurrentUnits - this.WapdaPreviousUnits;
    this.wapdaCharges = parseFloat(this.WapdaUnitRate) * this.WapdaTotalUnits;


    this.hvacCharges = parseFloat(this.HvacTotalUnits) * parseFloat(this.HvacUnitRate);

    this.GeneratorTotalUnits = this.GeneratorCurrentUnits - this.GeneratorPreviousUnits;
    this.GeneratorCharges = parseFloat(this.GeneratorTotalUnits) * parseFloat(this.GeneratorUnitRate);
    

  }
  


  closeDialogue(){
    this.dialogRef.close();
  }

  reset(){
    this.shopBillDate= new Date(Date.now());
    this.wapdaCharges = '';
    this.BillRemarks = '';
  }


  viewImg:any = '';
  showImg(img:any,id:any){
   
    if(img != ''){
      alert();
      $(id).show();
      this.viewImg = img;
    }
  }


}
