import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { GlobalDataModule } from 'src/app/Shared/global-data/global-data.module';
import { NotificationService } from 'src/app/Shared/service/notification.service';
import { AddServicesComponent } from './add-services/add-services.component';
import { environment } from 'src/environments/environment.development';
import { error } from 'jquery';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent {

  constructor(private http:HttpClient,
    private msg:NotificationService,
    private dialogue: MatDialog,
    private globaldata:GlobalDataModule
    
    ){}


  ngOnInit(): void {
   this.getService();
  }



  servicesData:any;

  getService(){
   this.http.get(environment.mallApiUrl+'getservice').subscribe(
    {
      next:value=>{
        this.servicesData = value;
        // console.log(value);
      },
      error:error=>{
        this.msg.WarnNotify('Error Occured while Loading Data');
        console.log(error);
      }
    }
   ) 
  }


  editService(row:any){
    this.dialogue.open(AddServicesComponent,{
      width:"40%",
      data:row
    }).afterClosed().subscribe(
      {
        next:value=>{
          if(value == "Update"){
            this.getService();
          }
        }
      }
    )
  }

  deleteService(row:any){
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
        this.http.post(environment.mallApiUrl+'deleteservice',{
          ServiceID:row.serviceID,
          UserID:this.globaldata.getUserID(),
        }).subscribe(
          (Response:any)=>{
            if(Response.msg == 'Data Deleted Successfully'){
              this.msg.SuccessNotify(Response.msg);
              this.getService();
            }else{
              this.msg.WarnNotify(Response.msg);
            }
          }
        )
      }
    });
    
  }


  OpenDialogue(){
    this.dialogue.open(AddServicesComponent,{
      width:"30%",

    }).afterClosed().subscribe(val=>{
      this.getService();
    })
  }


}
