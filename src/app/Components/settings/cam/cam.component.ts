import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { GlobalDataModule } from 'src/app/Shared/global-data/global-data.module';
import { NotificationService } from 'src/app/Shared/service/notification.service';
import { AddCAMComponent } from './add-cam/add-cam.component';
import { environment } from 'src/environments/environment.development';
import { error } from 'jquery';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cam',
  templateUrl: './cam.component.html',
  styleUrls: ['./cam.component.scss']
})
export class CAMComponent implements OnInit {

  constructor(private http:HttpClient,
    private msg:NotificationService,
    private dialogue: MatDialog,
    private globaldata:GlobalDataModule
    
    ){}


  ngOnInit(): void {
   this.getCam();
   this.getFloor();
   this.getShopCategory();
  }


  CAMData:any;
  Floors:any;
  shopCategorys:any;



  //////////////////////////////////////////
  getCam(){
    this.http.get(environment.mallApiUrl+'GetCam').subscribe(
      {
        next:value=>{
          this.CAMData = value;
          // console.log(value);
        },
        error:error=>{
          console.log(error);
          this.msg.WarnNotify('Error Occured while Loading Data');
        }
      }
    )
  }

/////////////////////////////////////////////
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



  /////////////////////////////////////////////
  getShopCategory(){
    this.http.get(environment.mallApiUrl+'GetCatagory').subscribe({
      next:value=>{
        this.shopCategorys = value;
      },
      error:error=>{
        console.log(error);

      }
    })
  }



  /////////////////////////////////////
  editCAM(row:any){
    
      this.dialogue.open(AddCAMComponent,{
        width:"40%",
        data:row
      }).afterClosed().subscribe( {
        next:value=>{
          if(value == "Update"){
            this.getCam();
          }
        }
      })
    
  }



  ///////////////////////////////////////////
  deleteCAM(row:any){
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
        this.http.post(environment.mallApiUrl+'DeleteCam',{
          CamID:row.camID,
          UserID:this.globaldata.getUserID(),
        }).subscribe(
          (Response:any)=>{
            if(Response.msg == 'Data Deleted Successfully'){
              this.msg.SuccessNotify(Response.msg);
              this.getCam();
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



  ////////////////////////////////////////////////
  OpenDialogue(){
    this.dialogue.open(AddCAMComponent,{
      width:"30%",

    }).afterClosed().subscribe(val=>{
      this.getCam();
    })
  }

}
