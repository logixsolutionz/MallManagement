import { HttpClient } from '@angular/common/http';
import { Component,Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { GlobalDataModule } from 'src/app/Shared/global-data/global-data.module';
import { NotificationService } from 'src/app/Shared/service/notification.service';
import { ServicesComponent } from '../services.component';
import { Validator } from '@angular/forms';
import * as $ from 'jquery';
import { environment } from 'src/environments/environment.development';


@Component({
  selector: 'app-add-services',
  templateUrl: './add-services.component.html',
  styleUrls: ['./add-services.component.scss']
})
export class AddServicesComponent implements OnInit {



  constructor(
    private http:HttpClient,
    @Inject(MAT_DIALOG_DATA) public editData : any,
    private dialogRef: MatDialogRef<ServicesComponent>,
    private global:GlobalDataModule,
    private msg:NotificationService
  ){

  }
  ngOnInit(): void{
    if(this.editData){
      this.actionbtn = 'Update';
      this.serviceTitle = this.editData.serviceTitle;
      this.serviceCode = this.editData.serviceCode;
      this.serviceCharges = this.editData.serviceCharges;
      this.Description = this.editData.serviceDescription;

    }
  }
  

  saveFlag=true;
  actionbtn='Save';
  serviceTitle:any;
  serviceCharges:any;
  Description:any;
  serviceCode:any;



  ///////////// will add the data 
  addService(){
    if(this.serviceTitle == '' || this.serviceTitle == undefined){
      this.msg.WarnNotify('Service Title Required')
    }else if(this.serviceCode == '' || this.serviceCode == undefined){
      this.msg.WarnNotify('Service Code Required')
    }else if(this.serviceCharges == '' || this.serviceCharges == undefined){
      this.msg.WarnNotify('Service Charges Required')
    }else if(this.Description == '' || this.Description == undefined){
     this.Description = '-';
    }else{
      if(this.saveFlag == true){
        if(this.actionbtn == 'Save'){
          this.saveFlag = false;
          this.http.post(environment.mallApiUrl+'Insertservice',{
        ServiceTitle:this.serviceTitle,
        ServiceCode:this.serviceCode,
        ServiceCharges:this.serviceCharges,
        ServiceDescription:this.Description,
        UserID:this.global.getUserID(),
      }).subscribe(
        (Response:any)=>{
          if(Response.msg == 'Data Saved Successfully'){
            this.msg.SuccessNotify(Response.msg);
            this.reset();
            this.dialogRef.close();
            this.saveFlag = true;
          }else{
            this.msg.WarnNotify(Response.msg);
            this.saveFlag = true;
          }
        }
      )
        }else if(this.actionbtn == 'Update'){
          this.updateService();

        }
      }else {
        this.msg.WarnNotify('Wait! Data Already Saving')
      }
    }
  }

  updateService(){

   
        this.http.post(environment.mallApiUrl+'updateservice',{
          ServiceID:this.editData.serviceID,
          ServiceTitle:this.serviceTitle,
          ServiceCode:this.serviceCode,
          ServiceCharges:this.serviceCharges,
          ServiceDescription:this.Description,
          UserID:this.global.getUserID(),
        }).subscribe(
          (Response:any)=>{
            if(Response.msg == 'Data Updated Successfully'){
              this.msg.SuccessNotify(Response.msg);
              this.reset();
              this.dialogRef.close('Update');
              this.saveFlag = true;
            }else{
              this.msg.WarnNotify(Response.msg);
              this.saveFlag = true;
            }
          }
        )
      
    
  }


  ///////////// will reset the form fields
  reset(){
    this.actionbtn='Save';
    this.serviceTitle ='';
    this.serviceCharges ='';
    this.serviceCode='';
    this.Description ='';
  }
  


  /////// will close the form
  closeDialogue(){
    this.dialogRef.close('Update');
  }


  /////// will change the service code value to 0 if value is less tha 0
  changeValue(){
    if(this.serviceCode < 0){
      this.serviceCode = 0;
    }
  }


}
