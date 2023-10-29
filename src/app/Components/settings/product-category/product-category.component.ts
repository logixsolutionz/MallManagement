import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { GlobalDataModule } from 'src/app/Shared/global-data/global-data.module';
import { NotificationService } from 'src/app/Shared/service/notification.service';
import { AddProductCategoryComponent } from './add-product-category/add-product-category.component';
import { environment } from 'src/environments/environment.development';
import { error } from 'jquery';

@Component({
  selector: 'app-product-category',
  templateUrl: './product-category.component.html',
  styleUrls: ['./product-category.component.scss']
})
export class ProductCategoryComponent implements OnInit{

  constructor(private http:HttpClient,
    private msg:NotificationService,
    private dialogue: MatDialog,
    private globaldata:GlobalDataModule
    
    ){}
  ngOnInit(): void {
    this.getCategory();
  }


  OpenDialogue(){
    this.dialogue.open(AddProductCategoryComponent,{
      width:"40%",

    }).afterClosed().subscribe(val=>{
     this.getCategory();
    })
  }


  categoryData:any;

  getCategory(){
    this.http.get(environment.apiUrl+'api/productCategory/getcategory',{responseType:'json'}).subscribe({
      next:value=>{
        this.categoryData = value;
      },
      error:error=>{
        console.log(error);
      }
    })
  }



  updateCategory(row:any){
    this.dialogue.open(AddProductCategoryComponent,{
      width:'40%',
      data:row,
    }).afterClosed().subscribe(val=>{
      if(val=='Update'){
        this.getCategory();
      }
    })
  }
}
