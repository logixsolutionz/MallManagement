import { Component } from '@angular/core';
import { AddShopComponent } from './add-shop/add-shop.component';
import { HttpClient } from '@angular/common/http';
import { NotificationService } from 'src/app/Shared/service/notification.service';
import { MatDialog } from '@angular/material/dialog';
import { GlobalDataModule } from 'src/app/Shared/global-data/global-data.module';
import { environment } from 'src/environments/environment.development';
import { data, error } from 'jquery';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent {

  constructor(private http:HttpClient,
    private msg:NotificationService,
    private dialogue: MatDialog,
    private globaldata:GlobalDataModule
    
    ){}


  ngOnInit(): void {
    this.globaldata.setHeaderTitle("Add Shop");
    this.getShop();
  }



  searchtxt:any;

  
  shopData:any;



  getShop(){
    this.http.get(environment.mallApiUrl+'GetShop').subscribe(
      {
        next:value=>{
          // console.log(value);
          this.shopData = value;
        },
        error:error=>{
          console.log(error);
          this.msg.WarnNotify('error Occured while Loading Data');
        }
      }
    )
  }



  //////////////////////////////////////////////////////////
  editShop(row:any){
    this.dialogue.open(AddShopComponent,{
      width:'50%',
      data:row,
    }).afterClosed().subscribe(val=>{
      this.getShop();
    })
  }


  /////////////////////////////////////////////////////////


  deleteShop(row:any){

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
        this.http.post(environment.mallApiUrl+'DeleteShop',{
          shopID:row.shopID,
          UserID:this.globaldata.getUserID(),
        }).subscribe(
          (Response:any)=>{
            if(Response.msg == 'Data Deleted Successfully'){
              this.msg.SuccessNotify(Response.msg);
              this.getShop();
            }else{
              this.msg.WarnNotify(Response.msg);
            }
          }
        )
      }
    });
   
  }



  ////////////////////////////////////////////////////////

  OpenDialogue(){
    this.dialogue.open(AddShopComponent,{
      width:"50%",

    }).afterClosed().subscribe(val=>{
      this.getShop();
    })
  }

}
