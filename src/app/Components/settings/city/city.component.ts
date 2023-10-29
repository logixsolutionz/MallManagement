import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NotificationService } from 'src/app/Shared/service/notification.service';
import { environment } from 'src/environments/environment.development';
import { MatDialog } from '@angular/material/dialog';
import { AddcityformComponent } from './addcityform/addcityform.component';
import { GlobalDataModule } from 'src/app/Shared/global-data/global-data.module';
import { error } from 'jquery';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.scss']
})
export class CityComponent implements OnInit{

  constructor(private http:HttpClient,
    private msg:NotificationService,
    private dialogue: MatDialog,
    private globaldata:GlobalDataModule
    
    ){}

  ngOnInit(): void {
    this.getCity();
   
  }


  citiesData:any;


  OpenDialogue(){
    this.dialogue.open(AddcityformComponent,{
      width:"40%",

    }).afterClosed().subscribe(val=>{
      this.getCity();
    })
  }


  getCity(){
    this.http.get(environment.mallApiUrl+'getcity').subscribe({
      next:value=>{
        this.citiesData = value;
      },
      error:error=>{
        console.log(error);
      }
    })
  }


 

  updateCity(row:any){

    this.dialogue.open(AddcityformComponent,{
      width:"40%",
      data:row
    }).afterClosed().subscribe( {
      next:value=>{
        if(value == "Update"){
          this.getCity();
        }
      }
    })
  }


  deleteCity(row:any){
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
        this.http.post(environment.mallApiUrl+'deletecity',{
          CityID:row.cityID,
          UserID:this.globaldata.getUserID(),
        }).subscribe(
          (Response:any)=>{
            if(Response.msg == 'Data Deleted Successfully'){
              this.msg.SuccessNotify(Response.msg);
              this.getCity();
            }else{
              this.msg.WarnNotify(Response.msg);
            }
          }
        )
      }
    });
  }




}
