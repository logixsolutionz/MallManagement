import { HttpClient } from '@angular/common/http';
import { Component,Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { GlobalDataModule } from 'src/app/Shared/global-data/global-data.module';
import { NotificationService } from 'src/app/Shared/service/notification.service';
import { CAMComponent } from '../cam.component';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-add-cam',
  templateUrl: './add-cam.component.html',
  styleUrls: ['./add-cam.component.scss']
})
export class AddCAMComponent implements OnInit{

  constructor(
    private http:HttpClient,
    @Inject(MAT_DIALOG_DATA) public editData : any,
    private dialogRef: MatDialogRef<CAMComponent>,
    private global:GlobalDataModule,
    private msg:NotificationService
  ){

  }
  ngOnInit(): void {
    this.getFloor();
    this.getShopCategory();
    if(this.editData){
      this.actionbtn = 'Update';
      this.shopFloorID = this.editData.shopFloorID;
      this.shopCategoryID = this.editData.shopCategoryID;
      this.CAMTitle = this.editData.camTitle;
      this.camCharges = this.editData.camCharges;
      this.Description = this.editData.camDescription;
      this.camID = this.editData.camID;
      
     
      
    }
   
  }


  actionbtn='Save';
  shopFloorID:any;
  shopCategoryID:any;
  CAMTitle:any;
  camID:any;
  camCharges:any;
  Description:any;
  Floors:any;                ////// to display floors in dropdown menu
  shopCategories:any;         ////// to display category in dropdown menu



  reset(){
    this.actionbtn='Save';
    this.shopFloorID='';
    this.shopCategoryID='';
    this.CAMTitle='';
    this.camCharges='';
    this.Description='';
  
  }
  

  change(event:any){
   alert(this.shopFloorID);
  }

  getFloor(){
    this.http.get(environment.mallApiUrl+'GetFloor').subscribe({
      next:value=>{
        this.Floors = value;
      },
      error:error=>{
        console.log(error);

      }
    })
  }

  getShopCategory(){
    this.http.get(environment.mallApiUrl+'GetCatagory').subscribe({
      next:value=>{
        this.shopCategories = value;
      },
      error:error=>{
        console.log(error);

      }
    })
  }


  addCam(){

    if(this.shopFloorID == 0 || this.shopFloorID == undefined){
      this.msg.WarnNotify('Floor Name Required');
    }else if(this.shopCategoryID == '' || this.shopCategoryID == undefined){
      this.msg.WarnNotify('Category Name Required')
    }else if(this.CAMTitle == '' || this.CAMTitle == undefined){
      this.msg.WarnNotify('CAM Title Required')
    }else if(this.camCharges == '' || this.camCharges == undefined){
      this.msg.WarnNotify('CAM Charges Required')
    }else if(this.Description == '' || this.Description == undefined){
      this.Description = '-';
    }else{
      if(this.actionbtn == 'Save'){
        this.http.post(environment.mallApiUrl+'InsertCam',{
          ShopCategoryID:this.shopCategoryID,
          ShopFloorID:this.shopFloorID,
          CamTitle:this.CAMTitle,
          CamCharges:this.camCharges,
          CamDescription:this.Description,
          UserID:this.global.getUserID(),
        }).subscribe(
          (Response:any)=>{
            if(Response.msg == 'Data Saved Successfully'){
              this.msg.SuccessNotify(Response.msg);
              this.dialogRef.close();
              this.reset();

            }else{
              this.msg.WarnNotify(Response.msg);
            }
          }
        )
      }else if(this.actionbtn == 'Update'){
        this.updateCam();
      }
    }

    

  }


  updateCam(){
    this.http.post(environment.mallApiUrl+'UpdateCam',{
      CamID:this.camID,
      ShopCategoryID:this.shopCategoryID,
      ShopFloorID:this.shopFloorID,
      CamTitle:this.CAMTitle,
      CamCharges:this.camCharges,
      CamDescription:this.Description,
      UserID:this.global.getUserID(),
    }).subscribe(
      (Response:any)=>{
        if(Response.msg == 'Data Updated Successfully'){
          this.msg.SuccessNotify(Response.msg);
          this.dialogRef.close('Update');
          this.reset();
        }else{
          this.msg.WarnNotify(Response.msg);
        }
      }
    )
  }


  closeDialogue(){
    this.dialogRef.close('Update');
  }
}
