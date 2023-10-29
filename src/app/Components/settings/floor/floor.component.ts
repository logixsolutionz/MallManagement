import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { GlobalDataModule } from 'src/app/Shared/global-data/global-data.module';
import { NotificationService } from 'src/app/Shared/service/notification.service';
import { AddFloorComponent } from './add-floor/add-floor.component';
import { environment } from 'src/environments/environment.development';
import { error } from 'jquery';
import { AnyCatcher } from 'rxjs/internal/AnyCatcher';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-floor',
  templateUrl: './floor.component.html',
  styleUrls: ['./floor.component.scss']
})
export class FloorComponent implements OnInit {

  constructor(private http:HttpClient,
    private msg:NotificationService,
    private dialogue: MatDialog,
    private globaldata:GlobalDataModule
    
    ){}



  ngOnInit(): void {
   this.getFloor();
  }


  FloorsData:any;


  ////////////////////////////////////////////////////////////

  getFloor(){
    this.http.get(environment.mallApiUrl+'GetFloor').subscribe({
      next:value=>{
        this.FloorsData = value;
        
      },
      error:error=>{
        this.msg.WarnNotify('Error Occured While Loading Saved Data');
        console.log(error);
      }
    })
  }


  /////////////////////////////////////////////////////////////////////////////////

  editFloor(row:any){
    this.dialogue.open(AddFloorComponent,{
      width:"40%",
      data:row
    }).afterClosed().subscribe( {
      next:value=>{
        if(value === "Update"){
          this.getFloor();
        }
      }
    })
  }


  ///////////////////////////////////////////////////////////////////////////

  deleteFloor(row:any){

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
        this.http.post(environment.mallApiUrl+'DeleteFloor',{
          ShopFloorID:row.shopFloorID,
          UserID:this.globaldata.getUserID(),
        }).subscribe(
          (Response:any)=>{
            if(Response.msg == 'Data Deleted Successfully'){
              this.msg.SuccessNotify(Response.msg);
              this.getFloor();
            }else{
              this.msg.WarnNotify(Response.msg);
            }
            
          },
          (error:any)=>{
            console.log(error.error);
          }
        )
      }
    });
    
  }



/////////////////////////////////////////////////////////////////////////////

  OpenDialogue(){
    this.dialogue.open(AddFloorComponent,{
      width:"40%",

    }).afterClosed().subscribe(val=>{
     this.getFloor();
    })
  }

}
