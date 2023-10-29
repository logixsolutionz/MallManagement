
import { HttpClient } from '@angular/common/http';
import {  Component, Inject, OnInit } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog'
import { error } from 'jquery';
import { GlobalDataModule } from 'src/app/Shared/global-data/global-data.module';
import { NotificationService } from 'src/app/Shared/service/notification.service';
import { environment } from 'src/environments/environment.development';
import { ProductCategoryComponent } from '../product-category.component';

@Component({
  selector: 'app-add-product-category',
  templateUrl: './add-product-category.component.html',
  styleUrls: ['./add-product-category.component.scss']
})
export class AddProductCategoryComponent implements OnInit {

  constructor(
    private http:HttpClient,
    @Inject(MAT_DIALOG_DATA) public editData : any,
    private dialogRef: MatDialogRef<ProductCategoryComponent>,
    private global:GlobalDataModule,
    private msg:NotificationService
  ){

  }
  ngOnInit(): void {
    if(this.editData){
      this.actionbtn = 'Update';
      this.CategoryName = this.editData.categoryName;
    }
  }

  actionbtn="Save";
  CategoryName:any;




  addCategory(){
    if(this.CategoryName == '' || this.CategoryName == undefined){
      this.msg.WarnNotify("Please Enter The Category Name");
    }else{
      if(this.actionbtn =='Save'){
        this.http.post(environment.apiUrl+'api/productCategory/insertCategory',{
          categoryName:this.CategoryName,
          createdBy:this.global.getUserID(),
        },{responseType:'text'}).subscribe({
          next:value=>{
            if(value == 'Category Already Exists'){
              this.msg.WarnNotify(value);
            }else{
              this.msg.SuccessNotify(value);
              this.reset();
              this.dialogRef.close(); 
            }
          }
        })
       }else{
        this.updateCategory();
       }
    }
  
  }


  updateCategory(){

    this.http.put(environment.apiUrl+'api/productCategory/updatecategory?id='+this.editData.categoryID,{
      categoryName:this.CategoryName,
      modifiedBy:this.global.getUserID(),
    },{responseType:'text'}).subscribe({
      next:value=>{
        if(value == 'Category Already Exists'){
          this.msg.WarnNotify(value);
        }else{
          this.msg.SuccessNotify(value);
          this.reset();
          this.dialogRef.close('Update');
        }
      },
      error:error=>{
        this.msg.WarnNotify('Unable to Update Date');
        console.log(error);
      }
    })
  }



  reset(){
    this.CategoryName = '';
    this.actionbtn = 'Save';
  }


  closeDialogue(){
    this.dialogRef.close('Update');
  }
}
