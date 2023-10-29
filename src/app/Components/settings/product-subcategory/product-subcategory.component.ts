
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { GlobalDataModule } from 'src/app/Shared/global-data/global-data.module';
import { NotificationService } from 'src/app/Shared/service/notification.service';
import { AddProductSubcategoryComponent } from './add-product-subcategory/add-product-subcategory.component';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-product-subcategory',
  templateUrl: './product-subcategory.component.html',
  styleUrls: ['./product-subcategory.component.scss']
})
export class ProductSubcategoryComponent implements OnInit{
  constructor(private http:HttpClient,
    private msg:NotificationService,
    private dialogue: MatDialog,
    private globaldata:GlobalDataModule
    
    ){}
  ngOnInit(): void {
    this.getSubCategory();
  }

  subCategoryData:any;



    
    getSubCategory(){
      this.http.get(environment.apiUrl+'api/productSubCategory/getsubcategory').subscribe({
        next:value=>{
          this.subCategoryData = value;
        },
        error:error=>{
          this.msg.WarnNotify('Error In Getting Data');
          console.log(error);
        }
      })
    }



  OpenDialogue(){
    this.dialogue.open(AddProductSubcategoryComponent,{
      width:"40%",

    }).afterClosed().subscribe(val=>{
     this.getSubCategory();
    })
  }

  updataSubCategory(row:any){
    this.dialogue.open(AddProductSubcategoryComponent,{
      width:'40%',
      data:row,
    }).afterClosed().subscribe(val=>{
      if(val == "Update"){

        this.getSubCategory();
      }
    })
  }



categoryName:any;
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

}
