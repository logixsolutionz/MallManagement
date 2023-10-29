import { HttpClient } from '@angular/common/http';
import { Component,Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { GlobalDataModule } from 'src/app/Shared/global-data/global-data.module';
import { NotificationService } from 'src/app/Shared/service/notification.service';
import { ShopComponent } from '../shop.component';
import { environment } from 'src/environments/environment.development';
import { timestamp } from 'rxjs/internal/operators/timestamp';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-add-shop',
  templateUrl: './add-shop.component.html',
  styleUrls: ['./add-shop.component.scss']
})
export class AddShopComponent implements OnInit{

  constructor(
    private http:HttpClient,
    @Inject(MAT_DIALOG_DATA) public editData : any,
    private dialogRef: MatDialogRef<ShopComponent>,
    private global:GlobalDataModule,
    private msg:NotificationService,
  ){

  }
  ngOnInit(){
    this.global.setHeaderTitle("Add Shop");
    this.getCam();
    this.getRent();
    this.getOwner();

    if(this.editData){
      this.actionbtn= 'Update';
      this.shopTitle = this.editData.shopTitle;
      this.shopCode = this.editData.shopCode;
      this.shopArea = this.editData.shopAreaSQ;
      this.camID = this.editData.camID;
      this.rentID = this.editData.rentID;
      this.partyID = this.editData.partyID;
      this.purchaseDate = this.editData.purchaseDate.toISOString();
      this.description = this.editData.shopDescription;
    }
  }

  partySearch:any;
  actionbtn='Save';
  camID:any;
  rentID:any;
  shopTitle:any;
  shopCode:any;
  shopArea:any;
  description:any;
  partyID:any;
  purchaseDate:any = new Date();




  CamData:any;
  rentData:any;
  ownerData:any;



  ////////////////////////////
  

  getOwner(){
    
    this.http.get(environment.mallApiUrl+'getowner').subscribe(
      {
        next:value=>{
          this.ownerData = value;
          // console.log(value);
        },
        error:error=>{
          this.msg.WarnNotify('Error Occured while Loading Data');
          console.log(error);
        }
      }
    )
  }

  //////////////////////////////////////////////////

  getCam(){
    this.http.get(environment.mallApiUrl+'GetCam').subscribe(
      {
        next:value=>{
          this.CamData = value;
          // console.log(value);
        },
        error:error=>{
          console.log(error);
          this.msg.WarnNotify('Error Occured while Loading Data');
        }
      }
    )
  }



  //////////////////////////////////////////
  getRent(){
    this.http.get(environment.mallApiUrl+'getrent').subscribe(
      {
        next:value=>{
          this.rentData = value;
           //console.log(value);
        },
        error:error=>{
          console.log(error);
        }
        
      }
    )
  }



  /////////////////////////////////////////////

  addShop(){
    // console.log(this.purchaseDate);


    if(this.shopTitle == '' || this.shopTitle == undefined){
      this.msg.WarnNotify('Shop Title required')
    }else if(this.shopCode == '' || this.shopCode == undefined){
      this.msg.WarnNotify('Shop Code Required')
    }else if(this.shopArea == '' || this.shopArea == undefined){
      this.msg.WarnNotify('Shop Area Required')
    }else if(this.camID == '' || this.camID == undefined){
      this.msg.WarnNotify('Cam Title Required')
    }else if(this.rentID == '' || this.rentID == undefined){
      this.msg.WarnNotify('Rent Title Required')
    }else if(this.partyID == '' || this.partyID == undefined){
      this.msg.WarnNotify('Owner Name Required')
    }else if(this.description == '' || this.description == undefined){
      this.description = '-';
    }else{
  
   
      if(this.actionbtn == 'Save'){
        this.InsertShop();
      }else if(this.actionbtn == 'Update'){
        this.updateShop();
      }
      
    }

  
    
  }

  


  InsertShop(){


    $('.loaderDark').show();

    this.http.post(environment.mallApiUrl+'InsertShop',{
      CamID:this.camID,
      RentID:this.rentID,
      ShopTitle:this.shopTitle,
      ShopCode:this.shopCode.toString(),
      ShopDescription:this.description,
      ShopAreaSQ:this.shopArea,
      PartyID:this.partyID,
      PurchaseDate:this.global.dateFormater(this.purchaseDate,'-'),
      UserID:this.global.getUserID(),
    }).subscribe(
      (Response:any)=>{
        // console.log(Response.msg);
        if(Response.msg == 'Data Saved Successfully'){
          this.msg.SuccessNotify(Response.msg);
          this.dialogRef.close();
          this.reset();
          $('.loaderDark').fadeOut(500);
        }else{
          this.msg.WarnNotify(Response.msg);
          $('.loaderDark').fadeOut(500);
        }
      },
      (Error)=>{
        $('.loaderDark').fadeOut(500);
      }
    )
  }


  ///////////////////////////////////


  updateShop(){
    
   
    $('.loaderDark').show();

    this.http.post(environment.mallApiUrl+'UpdateShop',{
      ShopID:this.editData.shopID,
      ShopOwnerID:this.editData.shopOwnerID,
      CamID:this.camID,
      RentID:this.rentID,
      ShopTitle:this.shopTitle,
      ShopCode:this.shopCode.toString(),
      ShopDescription:this.description,
      ShopAreaSQ:this.shopArea,
      PartyID:this.partyID,
      PurchaseDate:this.global.dateFormater(this.purchaseDate,'-'),
      UserID:this.global.getUserID(),
    }).subscribe(
      (Response:any)=>{
        if(Response.msg == 'Data Updated Successfully'){
          this.msg.SuccessNotify(Response.msg);
          this.dialogRef.close('Update');
          this.reset();
          $('.loaderDark').fadeOut(500);
        }else{
          this.msg.WarnNotify(Response.msg);
          $('.loaderDark').fadeOut(500);
        }
      },
      (Error)=>{
        $('.loaderDark').fadeOut(500);
      }
    )
  }

  ///////////////////////////////////////////////////

  reset(){
    this.actionbtn='Save';
    this.camID='';
    this.rentID='';
    this.shopTitle='';
    this.shopCode='';
    this.shopArea='';
    this.description='';
    this.partyID='';
    this.purchaseDate=new Date();
  
  }
  
  closeDialogue(){
    this.dialogRef.close('Update');
  }

}
