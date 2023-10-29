import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { GlobalDataModule } from 'src/app/Shared/global-data/global-data.module';
import { NotificationService } from 'src/app/Shared/service/notification.service';
import { AddRentComponent } from './add-rent/add-rent.component';
import { environment } from 'src/environments/environment.development';
import { error } from 'jquery';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-rent',
  templateUrl: './rent.component.html',
  styleUrls: ['./rent.component.scss']
})
export class RentComponent implements OnInit{


  constructor(private http:HttpClient,
    private msg:NotificationService,
    private dialogue: MatDialog,
    private globaldata:GlobalDataModule
    
    ){}


  ngOnInit(): void {
   this.getRent();
   this.getFloor();
   this.getShopCategory();
  }



  rentData:any;
  Floors:any;
  shopCategories:any;

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



  editRent(row:any){
    this.dialogue.open(AddRentComponent,{
      width:"40%",
      data:row
    }).afterClosed().subscribe( {
      next:value=>{
        if(value == "Update"){
          this.getRent();
        }
      }
    })
  }


  deleteRent(row:any){
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
        this.http.post(environment.mallApiUrl+'Deleterent',{
          RentID:row.rentID,
          UserID:this.globaldata.getUserID(),
        }).subscribe(
          (Response:any)=>{
    
            if(Response.msg == 'Data Deleted Successfully'){
              this.msg.SuccessNotify(Response.msg);
              this.getRent();
            }else{
              this.msg.WarnNotify(Response.msg);
            }
            
          }
        )
      }
    });
   
  }



  ////////////// will open the child window entry form
  OpenDialogue(){
    this.dialogue.open(AddRentComponent,{
      width:"30%",

    }).afterClosed().subscribe(val=>{
       this.getRent();
    })
  }

}
