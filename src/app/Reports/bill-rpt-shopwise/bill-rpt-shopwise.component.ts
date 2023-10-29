import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { error } from 'jquery';
import { BillDetailsComponent } from 'src/app/Components/shop-bill/bill-details/bill-details.component';
import { GlobalDataModule } from 'src/app/Shared/global-data/global-data.module';
import { NotificationService } from 'src/app/Shared/service/notification.service';
import { AppComponent } from 'src/app/app.component';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-bill-rpt-shopwise',
  templateUrl: './bill-rpt-shopwise.component.html',
  styleUrls: ['./bill-rpt-shopwise.component.scss']
})
export class BillRptShopwiseComponent implements OnInit{



  constructor(
    private http:HttpClient,
    private msg:NotificationService,
    private app:AppComponent,
    private globalData:GlobalDataModule,
    private dialogue:MatDialog
  ){}


  ngOnInit(): void {
    this.logo = this.globalData.Logo;
    this.logo1 = this.globalData.Logo1;
    this.companyName = this.globalData.CompanyName;
    this.companyName2 = this.globalData.CompanyName2;
    this.getShop();
    this.globalData.setHeaderTitle('Bill Rpt ShopWise')
  }

  logo:any;
  logo1:any;
  companyName:any;
  companyName2:any;
 

  txtSearch:any;

shopList:any;
shopID:any;
startDate = new Date();
EndDate = new Date();

reportData:any;
curShopTitle:any;


getShop(){
  this.app.startLoaderDark();
  this.http.get(environment.mallApiUrl+'GetShop').subscribe(
    {
      next:value=>{
        // console.log(value);
        this.shopList = value;
        this.app.stopLoaderDark();
      },
      error:error=>{
        console.log(error);
        this.msg.WarnNotify('error Occured while Loading Data');
        this.app.stopLoaderDark();
      }
    }
  )
}

shopChange(){
 ////////////////////////////// will change the value of current shop Title///////////////
 var curRow = this.shopList.find((e:any)=> e.shopID == this.shopID );
 this.curShopTitle = curRow.shopTitle;
}





getRpt(){

  if(this.shopID == "" || this.shopID == undefined){
    this.msg.WarnNotify('Select The Shop');
  }else{

    this.globalData.newDateFormate(this.startDate);
    this.globalData.newDateFormate(this.EndDate);

    this.app.startLoaderDark();
    this.http.get(environment.mallApiUrl+'GetBillRptShopwise?startdate='+this.startDate.toISOString().substring(0,10)+'&enddate='+
    this.EndDate.toISOString().substring(0,10)+'&shopid='+this.shopID).subscribe(
      (Response)=>{
        this.reportData = Response;
        this.app.stopLoaderDark();
      },
    (error)=>{
      this.app.stopLoaderDark();
    }
    )
  }
 
}

PrintTable(){
  if(this.reportData != ''){
    this.globalData.printData('#printRpt');
  }
 
}




  //////////////////////////////////////////////////////////////
  tableData:any;
  getBillDetails(billNo:any){
    this.tableData = [];

    this.http.get(environment.mallApiUrl+'getsinglebill?billno='+billNo).subscribe(
      (Response:any)=>{
       
        if(Response.length > 0){
          this.tableData.push(
            {title:'Rent',charges:Response[0].rentCharges * Response[0].shopAreaSQ},
            {title:'CAM',charges:Response[0].camCharges * Response[0].shopAreaSQ},
          
           );
          
         
         for(var i = 0; Response.length > i;i++ ){
          this.tableData.push(
            {title:Response[i].serviceTitle,charges:Response[i].serviceCharges});
            
         }
         
       
          this.dialogue.open(BillDetailsComponent,{
            width:"50%",
            data:this.tableData,
          }).afterClosed().subscribe(val=>{
            
          })
         
     
           
        }
      }
    )
  }



}
