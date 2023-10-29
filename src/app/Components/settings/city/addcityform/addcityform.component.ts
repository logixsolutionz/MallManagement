import { HttpClient } from '@angular/common/http';
import {  Component, Inject, OnInit } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog'
import { error } from 'jquery';
import { GlobalDataModule } from 'src/app/Shared/global-data/global-data.module';
import { NotificationService } from 'src/app/Shared/service/notification.service';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-addcityform',
  templateUrl: './addcityform.component.html',
  styleUrls: ['./addcityform.component.scss']
})
export class AddcityformComponent implements OnInit{
 

  constructor(
    private http:HttpClient,
    @Inject(MAT_DIALOG_DATA) public editData : any,
    private dialogRef: MatDialogRef<AddcityformComponent>,
    private global:GlobalDataModule,
    private msg:NotificationService
  ){

  }

  ngOnInit(): void {
   


    if(this.editData){
      this.actionbtn = "Update";
      this.cityName = this.editData.cityName;
    }

  }


  actionbtn = 'Save';
  cityName :any;


  addCity(){
    if(this.cityName == '' || this.cityName == undefined){
      this.msg.WarnNotify("Please Eneter the City Name");
    }else{
      if(this.actionbtn == 'Save'){
        this.http.post(environment.mallApiUrl+'insertcity',{
          CityName:this.cityName,
          UserID:this.global.getUserID(),
        }).subscribe(
          (Response:any)=>{
            if(Response.msg == 'Data Saved Successfully'){
              this.msg.SuccessNotify(Response.msg);
              this.reset();
              this.dialogRef.close();
            }else{
              this.msg.WarnNotify(Response.msg);
            }
          }
        )
      }else if(this.actionbtn == 'Update'){
        this.updateProduct();
      }
    }
   
  }


  updateProduct(){
    this.http.post(environment.mallApiUrl+'updatecity',{
      CityID:this.editData.cityID,
      CityName : this.cityName,
      UserID:this.global.getUserID(),
    }).subscribe(
      (Response:any)=>{
        if(Response.msg == 'Data Updated Successfully'){
          this.msg.SuccessNotify(Response.msg);
          this.reset();
          this.dialogRef.close('Update');
        }else{
          this.msg.WarnNotify(Response.msg);
        }
      }
    )
  }


  reset(){
    this.cityName = '';
    this.actionbtn = 'Save';
  }

  closeDialogue(){
    this.dialogRef.close('Update');
  }
}
