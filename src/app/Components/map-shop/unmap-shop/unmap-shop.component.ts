import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { GlobalDataModule } from 'src/app/Shared/global-data/global-data.module';
import { NotificationService } from 'src/app/Shared/service/notification.service';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-unmap-shop',
  templateUrl: './unmap-shop.component.html',
  styleUrls: ['./unmap-shop.component.scss']
})
export class UnmapShopComponent implements OnInit {


  constructor(
    private http:HttpClient,
    private msg:NotificationService,
    @Inject(MAT_DIALOG_DATA) public shopData : any,
     private dialogRef: MatDialogRef<UnmapShopComponent>,
     private globalData:GlobalDataModule

  ){}

  ngOnInit(): void {
    
  }



  EndDate:Date = new Date();

  

  unMapShop(){
   
    this.EndDate.toISOString().substring(0,10);

      this.http.post(environment.mallApiUrl+'InsertUnmapShop',{
        ShopRentHistoryID:this.shopData.shopRentHistoryID,
       ShopID: this.shopData.shopID,
        EndDate: this.globalData.dateFormater(this.EndDate,'-'),
    
        UserID: this.globalData.getUserID(),
      }).subscribe(
        (Response:any)=>{
          if(Response.msg == 'Data Updated Successfully'){
            this.msg.SuccessNotify(Response.msg);
            this.dialogRef.close('Update');
            this.EndDate = new Date();
          }else{
            this.msg.WarnNotify(Response.msg)
          }
        }
      )
    
   
  }




}
