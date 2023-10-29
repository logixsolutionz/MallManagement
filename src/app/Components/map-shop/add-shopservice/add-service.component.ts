import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { error } from 'jquery';
import { GlobalDataModule } from 'src/app/Shared/global-data/global-data.module';
import { NotificationService } from 'src/app/Shared/service/notification.service';
import { environment } from 'src/environments/environment.development';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-service',
  templateUrl: './add-service.component.html',
  styleUrls: ['./add-service.component.scss']
})
export class AddServiceComponent implements OnInit{

  constructor(
    @Inject(MAT_DIALOG_DATA) public editData : any,
     private dialogRef: MatDialogRef<AddServiceComponent>,
     private http:HttpClient,
     private msg:NotificationService,
     private globalData:GlobalDataModule
  ){}


  ngOnInit(): void {
   this.getSavedService();
   this.getService();
  //  console.log(this.editData);
  }



  serviceID:any;
  serviceCharges:any;
  serviceType:any;
  serviceMonth:any;




  servicesList:any;
  shopServicesData:any;

   //////////////////////////////////////////

   getService(){
    this.http.get(environment.mallApiUrl+'getservice').subscribe(
     {
       next:value=>{
         this.servicesList = value;
         // console.log(value);
       },
       error:error=>{
         this.msg.WarnNotify('Error Occured while Loading Data');
         console.log(error);
       }
     }
    ) 
   }
   

  
   ///////////////////////////////////////////////////////////////

   getSavedService(){
    this.http.get(environment.mallApiUrl+'GetShopServices?shopid='+this.editData.shopID+'&shoprhid='+this.editData.shopRentHistoryID).subscribe(
      {
        next:value=>{
          this.shopServicesData  = value;
          // console.log(value);
          
        },
        error:error=>{
          this.msg.WarnNotify('Unable to Load Data');
          console.log(error);
        }
      }
    )
   }



   //////////////////////////////////////

   onServiceIDChange(){
    var row = this.servicesList.find((x:any)=>x.serviceID == this.serviceID);

    this.serviceCharges = row.serviceCharges;
   
  }



  //////////////////////////////////////////////////////

  SaveShopService(){
    if(this.serviceID == '' || this.serviceID == undefined){
      this.msg.WarnNotify('Select Service Title')
    }else if(this.serviceCharges == '' || this.serviceCharges == undefined){
      this.msg.WarnNotify('Enter Service Charges')
    }else if(this.serviceType == '' || this.serviceType == undefined){
      this.msg.WarnNotify('Select Service Type')
    }else if(this.serviceMonth == '' || this.serviceMonth == undefined){
      this.msg.WarnNotify('Select Service Month')
    }else{

    


      this.http.post(environment.mallApiUrl+'InsertShopService',{
      
        ShopRentHistoryID: this.editData.shopRentHistoryID,
        ShopID: this.editData.shopID,
        ServiceID: this.serviceID,
        ServiceCharges: this.serviceCharges,
        ServiceType: this.serviceType,
        TmpServiceMonth: this.globalData.dateFormater(this.serviceMonth,'-'),
        UserID: this.globalData.getUserID(),
        }).subscribe(
          (Response:any)=>{
            if(Response.msg == 'Data Saved Successfully'){
              this.msg.SuccessNotify(Response.msg);
              this.reset();
              this.getSavedService();
              this.dialogRef.close('Update');
            }else{
              this.msg.WarnNotify(Response.msg);
            }
          }
        )
    }
    
  }



  //////////////////////////////////////////

  reset(){
    this.serviceID = '';
    this.serviceCharges = '';
    this.serviceType = '';
    this.serviceMonth = '';
  }



  ////////////////////////////////////////////////////////////////

  deleteShopService(row:any){

    Swal.fire({
      title:'Alert!',
      text:'Confirm to Delete the Data',
      position:'center',
      icon:'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirm',
    }).then((result)=>{
      if(result.isConfirmed){

        //////on confirm button pressed the api will run
        this.http.post(environment.mallApiUrl+'DeleteShopService',{
          ShopServiceID: row.shopServiceID,
        UserID: this.globalData.getUserID(),
        }).subscribe(
          (Response:any)=>{
            if(Response.msg == 'Data Deleted Successfully'){
              this.msg.SuccessNotify(Response.msg);
              this.getSavedService();
            }else{
              this.msg.WarnNotify(Response.msg);
            }
          }
        )
      }
    });
    

    
  }



  closeDialogue(){
    this.dialogRef.close();
  }



}
