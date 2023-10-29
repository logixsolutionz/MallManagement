
import { HttpClient } from '@angular/common/http';
import {  Component, Inject, OnInit } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog'
import { error } from 'jquery';
import { GlobalDataModule } from 'src/app/Shared/global-data/global-data.module';
import { NotificationService } from 'src/app/Shared/service/notification.service';
import { environment } from 'src/environments/environment.development';
import { ProductSubcategoryComponent } from '../product-subcategory.component';


@Component({
  selector: 'app-add-product-subcategory',
  templateUrl: './add-product-subcategory.component.html',
  styleUrls: ['./add-product-subcategory.component.scss']
})
export class AddProductSubcategoryComponent implements OnInit {

  constructor(
    private http:HttpClient,
    @Inject(MAT_DIALOG_DATA) public editData : any,
    private dialogRef: MatDialogRef<ProductSubcategoryComponent>,
    private global:GlobalDataModule,
    private msg:NotificationService
  ){

  }
  ngOnInit(): void {
    this.getCategory();
    if(this.editData){
      this.actionbtn = "Update";
      this.CategoryID= this.editData.categoryID;
      this.SubCategoryName=this.editData.subCategoryName;
    }
   
  }
  categoryName:any;
 

  CategoryID:any;
  SubCategoryName:any;
  actionbtn="Save";



  getCategory(){
   
    this.http.get(environment.apiUrl+'api/productCategory/getcategory',).subscribe({
      next:value=>{
        this.categoryName = value;
      },
      error:error=>{
        console.log(error);
      }
    })
  }



  addSubCategory(){
    
    if(this.CategoryID == "" || this.CategoryID == undefined){
      this.msg.WarnNotify("PLease Select The Product Category");
    }else if(this.SubCategoryName == '' || this.SubCategoryName == undefined){
      this.msg.WarnNotify("Please Enter the Subcategory Name");
    }else{
      if(this.actionbtn == 'Save'){
        this.http.post(environment.apiUrl+'api/productSubCategory/insertsubcategory',{
          categoryId: this.CategoryID,
          subCategoryName:this.SubCategoryName,
          createdBy:this.global.getUserID(),
    
        },{responseType:'text'}).subscribe({
          next:value=>{
            if(value == 'Sub Category Already Exists'){
              this.msg.WarnNotify(value)
            }else{
              // this.msg.SuccessNotify(value);
            this.reset();
            this.dialogRef.close();
            }
    
          },
          error:error=>{
            this.msg.WarnNotify(error);
          }
        })
      }else{
        this.updateSubCategory();
      }
    }
  
  }

  updateSubCategory(){
    this.http.put(environment.apiUrl+'api/productSubCategory/updatesubcategory?id='+this.editData.subCategoryID,{
      categoryID:this.CategoryID,
      subCategoryName:this.SubCategoryName,
      modifiedBy:this.global.getUserID(),

    },{responseType:'text'}).subscribe({
      next:(value:any)=>{
       if(value == "Sub Category Already Exists"){
        console.log(value);
        this.msg.WarnNotify(value);
       }else{
        console.log(value);
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

  validate(){
    if(this.CategoryID == '' || this.CategoryID == undefined){
      this.msg.WarnNotify('Select Category ID');
    }else if(this.SubCategoryName == '' || this.SubCategoryName == undefined){
      this.msg.WarnNotify('Please Enter Sub Category Name');
    }
  }



reset(){
  this.CategoryID = 0;
  this.SubCategoryName = "";
  this.actionbtn = "Save";
}

closeDialogue(){
  this.dialogRef.close('Update');
}

}
