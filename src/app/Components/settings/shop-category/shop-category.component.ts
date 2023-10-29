import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { GlobalDataModule } from 'src/app/Shared/global-data/global-data.module';
import { NotificationService } from 'src/app/Shared/service/notification.service';
import { AddShopCategoryComponent } from './add-shop-category/add-shop-category.component';
import { environment } from 'src/environments/environment.development';
import { error } from 'jquery';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-shop-category',
  templateUrl: './shop-category.component.html',
  styleUrls: ['./shop-category.component.scss']
})
export class ShopCategoryComponent implements OnInit{


  constructor(private http:HttpClient,
    private msg:NotificationService,
    private dialogue: MatDialog,
    private globaldata:GlobalDataModule
    
    ){}


  ngOnInit(): void {
    
    this.getCategory();
  }





  CategoriesData:any;        /////// for saving Categories data retrieved from api



  OpenDialogue(){
    this.dialogue.open(AddShopCategoryComponent,{
      width:"40%",

    }).afterClosed().subscribe(val=>{
     
      this.getCategory();
    })
  }



  ///////////////// get cate
  getCategory(){
    this.http.get(environment.mallApiUrl+'GetCatagory').subscribe(
      {
        next:value=>{
          this.CategoriesData = value;
          
        },
        error:error=>{
          this.msg.WarnNotify('Error Occured While Getting Data');
          console.log(error);
        }
      }
    )
  }



  /////////// to edit category Name
  editCategory(row:any){

    this.dialogue.open(AddShopCategoryComponent,{
      width:"40%",
      data:row
    }).afterClosed().subscribe( {
      next:value=>{
        if(value === "Update"){
          this.getCategory();
        }
      }
    })
  }



  DeleteCategory(row:any){


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
        this.http.post(environment.mallApiUrl+'DeleteCatagory',{
          ShopCategoryID:row.shopCategoryID,
          UserID:this.globaldata.getUserID(),
        }).subscribe(
          (Response:any)=>{
            if(Response.msg == 'Data Deleted Successfully'){
              this.msg.SuccessNotify(Response.msg);
              this.getCategory();
            }else{
              this.msg.WarnNotify(Response.msg);
            }
            
          },
          (error:any)=>{
            console.log(error);
          }
          
        )
      }
    });
   
  }



}
