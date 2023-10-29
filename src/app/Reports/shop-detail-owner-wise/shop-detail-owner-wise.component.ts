import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { GlobalDataModule } from 'src/app/Shared/global-data/global-data.module';
import { NotificationService } from 'src/app/Shared/service/notification.service';
import { AppComponent } from 'src/app/app.component';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-shop-detail-owner-wise',
  templateUrl: './shop-detail-owner-wise.component.html',
  styleUrls: ['./shop-detail-owner-wise.component.scss']
})
export class ShopDetailOwnerWiseComponent implements OnInit {

  logo:any;
  logo1:any;
  companyName:any;
  companyName2:any;

  constructor(
    private http:HttpClient,
    private msg:NotificationService,
    private globalData:GlobalDataModule,
    private app:AppComponent
  ){}


  ngOnInit(): void {
    this.globalData.setHeaderTitle('Shop Detail Owner Wise')
    this.getOwner();
    this.logo = this.globalData.Logo;
    this.logo1 = this.globalData.Logo1;
    this.companyName = this.globalData.CompanyName;
    this.companyName2 = this.globalData.CompanyName2;
  }

  partySearch:any

  ownerList:any;

  partyID:any;

  reportData:any;


  /////////////////////////////////////////////

  getOwner(){
    this.app.startLoaderDark();
    this.http.get(environment.mallApiUrl+'getowner').subscribe(
      {
        next:value=>{
          this.ownerList = value;
          this.app.stopLoaderDark();
          // console.log(value);
        },
        error:error=>{
          this.msg.WarnNotify('Error Occured while Loading Data');
          console.log(error);
          this.app.stopLoaderDark();
        }
      }
    )
  }



  ///////////////////////////////////////////////

  getReport(){
    this.app.startLoaderDark();
    this.http.get(environment.mallApiUrl+'GetOwnerShopsDetail?ownerID='+this.partyID).subscribe(
      (Response)=>{
      

        this.reportData = Response;
        this.app.stopLoaderDark();
      },
      (Error)=>{
        this.msg.WarnNotify('Error Occured while Loading Data')
        this.app.stopLoaderDark();
      }
    )
  }


  /////////////////////////////////////////
  
  printRpt(){
    this.globalData.printData('#printDiv')
  }
}
