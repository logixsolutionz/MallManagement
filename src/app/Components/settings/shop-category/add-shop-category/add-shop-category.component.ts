import { HttpClient } from '@angular/common/http';
import { Component,Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ShopCategoryComponent } from '../shop-category.component';
import { GlobalDataModule } from 'src/app/Shared/global-data/global-data.module';
import { NotificationService } from 'src/app/Shared/service/notification.service';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-add-shop-category',
  templateUrl: './add-shop-category.component.html',
  styleUrls: ['./add-shop-category.component.scss']
})
export class AddShopCategoryComponent implements OnInit {




  constructor(
    private http:HttpClient,
    @Inject(MAT_DIALOG_DATA) public editData : any,
    private dialogRef: MatDialogRef<ShopCategoryComponent>,  
    private global:GlobalDataModule,
    private msg:NotificationService
  ){

  }


  ngOnInit(): void {
    if(this.editData){
      this.actionbtn = "Update";
      this.shopCategoryName = this.editData.shopCategoryName;
      this.shopCategoryID = this.editData.shopCategoryID;
    }
  }


  shopCategoryID:any;
  shopCategoryName:any;
  actionbtn = 'Save';




  closeDialogue(){
    this.dialogRef.close('Update');
  }


  reset(){
    this.shopCategoryName = '';
    this.actionbtn = 'Save';
  }


  addCategory(){
    if(this.shopCategoryName == '' || this.shopCategoryName == undefined){
      this.msg.WarnNotify('Category Name Required');
    }else{
      if(this.actionbtn == 'Save'){
        this.http.post(environment.mallApiUrl+'InsertCatagory',{
          ShopCategoryName:this.shopCategoryName,
          UserID:this.global.getUserID(),
        }).subscribe(
          (Response:any)=>{
            if(Response.msg == 'Data Saved Successfully'){
              console.log(Response.msg);
              this.reset();
              this.dialogRef.close();
            }else{
              this.msg.WarnNotify(Response.msg);
            }
            
          }
        )
      }else if(this.actionbtn == 'Update'){
        this.updateCategory();
      }
    }
    
  }



  updateCategory(){
    console.log(this.shopCategoryID,this.shopCategoryName);
    this.http.post(environment.mallApiUrl+'UpdateCatagory',{
      ShopCategoryID:this.shopCategoryID,
      ShopCategoryName:this.shopCategoryName,
      UserID:this.global.getUserID(),
    }).subscribe(
      
      (Response:any)=>{
        console.log(Response.msg);
        this.reset();
        this.dialogRef.close('Update');
      }
    )
  }


}
