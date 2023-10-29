import { HttpClient } from '@angular/common/http';
import { Component,Inject, OnInit } from '@angular/core';
import { FloorComponent } from '../floor.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { GlobalDataModule } from 'src/app/Shared/global-data/global-data.module';
import { NotificationService } from 'src/app/Shared/service/notification.service';
import { environment } from 'src/environments/environment.development';
import { error } from 'jquery';

@Component({
  selector: 'app-add-floor',
  templateUrl: './add-floor.component.html',
  styleUrls: ['./add-floor.component.scss']
})
export class AddFloorComponent implements OnInit{


  constructor(
    private http:HttpClient,
    @Inject(MAT_DIALOG_DATA) public editData : any,
    private dialogRef: MatDialogRef<FloorComponent>,  
    private global:GlobalDataModule,
    private msg:NotificationService
  ){

  }

  ngOnInit(): void {

    if(this.editData){
      this.floorName = this.editData.shopFloorName;
      this.floorID = this.editData.shopFloorID;
      this.actionbtn = 'Update';
    }
  }




  floorID:any;
  floorName:any;
  actionbtn = 'Save';



/////////////////////////////////////////////////////////////////////

  addFloor(){
    if(this.floorName == '' || this.floorName == undefined){
      this.msg.WarnNotify('Enter Floor Name')
    }else{
      if(this.actionbtn == 'Save'){
        this.http.post(environment.mallApiUrl +'InsertFloor',{
          ShopFloorName:this.floorName,
          UserID:this.global.getUserID(),
        }).subscribe(
          (Response:any)=>{
            if(Response.msg == 'Data Saved Successfully'){
              this.msg.SuccessNotify(Response.msg);
              this.reset();
              this.dialogRef.close();
            }else{
              this.msg.WarnNotify(Response.msg);
              console.log(Response.msg)
            }
          },
          (error:any)=>{
            this.msg.WarnNotify('Error Occured While Saving Data')
            console.log(error);
          }
          
        )
      }else if(this.actionbtn == 'Update'){
        this.updateFloor();
      }
    }
    
  }


  ////////////////////////////////////////////////////////////////////
  updateFloor(){
    this.http.post(environment.mallApiUrl+'UpdateFloor',{
      ShopFloorID : this.floorID,
      ShopFloorName:this.floorName,
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


///////////////////////////////////////////////////////////////////////

  closeDialogue(){
    this.dialogRef.close('Update');
  }


  ///////////////////////////////////////////////////////////////////
  
  reset(){
    this.floorName = '';
    this.actionbtn = 'Save';
  }

}
