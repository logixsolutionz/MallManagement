import { HttpClient } from '@angular/common/http';
import { Component,Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { GlobalDataModule } from 'src/app/Shared/global-data/global-data.module';
import { NotificationService } from 'src/app/Shared/service/notification.service';
import { RentComponent } from '../rent.component';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-add-rent',
  templateUrl: './add-rent.component.html',
  styleUrls: ['./add-rent.component.scss']
})
export class AddRentComponent implements OnInit{



  constructor(
    private http:HttpClient,
    @Inject(MAT_DIALOG_DATA) public editData : any,
    private dialogRef: MatDialogRef<RentComponent>,
    private global:GlobalDataModule,
    private msg:NotificationService
  ){

  }
  ngOnInit(): void {
  this.getFloor();
  this.getShopCategory();
  if(this.editData){
    this.actionbtn = 'Update',
    this.floorID = this.editData.shopFloorID;
    this.shopCategoryID = this.editData.shopCategoryID;
    this.rentTitle = this.editData.rentTitle;
    this.rentCharges = this.editData.rentCharges;
    this.Description = this.editData.rentDescription;
  }
  }


  actionbtn='Save';
  floorID:any;
  shopCategoryID:any;
  rentTitle:any;
  rentCharges:any;
  Description:any;
  Floors:any;
  shopCategories:any;




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


  addRent(){
    if(this.floorID == '' || this.floorID == undefined){
      this.msg.WarnNotify('Floor Name Required');
    }else if(this.shopCategoryID == '' || this.shopCategoryID == undefined){
      this.msg.WarnNotify('Shop Category Required')
    }else if(this.rentTitle == '' || this.rentTitle == undefined){
      this.msg.WarnNotify('Rent Title Required')
    }
    else if(this.rentCharges == '' || this.rentCharges == undefined){
      this.msg.WarnNotify('Enter the Rent Charges')
    }
    else if(this.Description == '' || this.Description == undefined){
      this.Description = '-';
    }
    else{
      
      if(this.actionbtn == 'Save'){
        this.http.post(environment.mallApiUrl+'Insertrent',{
          ShopCategoryID:this.shopCategoryID,
          ShopFloorID:this.floorID,
          RentTitle:this.rentTitle,
          RentCharges:this.rentCharges,
          RentDescription:this.Description,
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
        this.updateRent();
      }
    }
    
    
  }


  /////////////////will update the rent Data
  updateRent(){
    this.http.post(environment.mallApiUrl+'Updaterent',{
      rentID:this.editData.rentID,
      ShopCategoryID:this.shopCategoryID,
      ShopFloorID:this.floorID,
      RentTitle:this.rentTitle,
      RentCharges:this.rentCharges,
      RentDescription:this.Description,
      UserID:this.global.getUserID(),
    }).subscribe(
      (Response:any)=>{
        if(Response.msg == 'Data Updated Successfully'){
          this.msg.SuccessNotify(Response.msg);
          this.dialogRef.close('Update');
        }else {
          this.msg.WarnNotify(Response.msg);
        }
      }
    )
  }


  /////////////// will reset the fields
  reset(){
    this.actionbtn='Save';
    this.floorID ='';
    this.shopCategoryID ='';
    this.rentTitle ='';
    this.rentCharges ='';
    this.Description ='';
  }
  

  ////// will close the child window
  closeDialogue(){
    this.dialogRef.close('Update');
  }

}
