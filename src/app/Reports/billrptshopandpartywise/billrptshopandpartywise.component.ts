import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BillDetailsComponent } from 'src/app/Components/shop-bill/bill-details/bill-details.component';
import { GlobalDataModule } from 'src/app/Shared/global-data/global-data.module';
import { NotificationService } from 'src/app/Shared/service/notification.service';
import { AppComponent } from 'src/app/app.component';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-billrptshopandpartywise',
  templateUrl: './billrptshopandpartywise.component.html',
  styleUrls: ['./billrptshopandpartywise.component.scss']
})
export class BillrptshopandpartywiseComponent implements OnInit{

  logo:any;
  logo1:any
  companyName:any;
  companyName2:any;
  
  constructor(

    private http:HttpClient,
    private msg:NotificationService,
    private app:AppComponent,
    private global:GlobalDataModule,
    private dialogue:MatDialog


  ){}

  ngOnInit(): void {
    this.getShop();
    this.getParty();
    this.global.setHeaderTitle('Bill Report Shop & Customerwise')
    this.logo = this.global.Logo;
    this.logo1 = this.global.Logo1;
    this.companyName = this.global.CompanyName;
    this.companyName2 = this.global.CompanyName2;
  }

  shopSearch:any;
  customerSearch:any;
  shopID:any;
  partyID:any;
  fromDate:Date = new Date();
  toDate:Date = new Date();
 




  shopList:any;
  partyList:any;
  ReportData:any;


/////////////////////////////////////////////////////////////////

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


  ///////////////////////////////////////////////////////

  getParty(){
    this.http.get(environment.mallApiUrl+'getparty').subscribe(
    {
      next:value =>{
        this.partyList = value;
        //console.log(value);
      
      },
      error: error=>{
        this.msg.WarnNotify('Error Occured While Loading Data')
        console.log(error);
      }        
      
      
    }
    )
  }



  ////////////////////////////////////////////////////

  getReportShopandPartyWise(){

    if(this.shopID == '' || this.shopID == ''){
      this.msg.WarnNotify('Select The Shop');
    }else if(this.partyID == '' || this.partyID == undefined){
      this.msg.WarnNotify('Select The Customer Name')
    }else{
        console.log(this.global.dateFormater(this.fromDate,'-'),this.global.dateFormater(this.toDate,'-'));
    

      this.http.get(environment.mallApiUrl+'GetBillRptShopAndPartywise??startdate='+this.global.dateFormater(this.fromDate,'-')+
      '&enddate='+this.global.dateFormater(this.toDate,'-')+'&shopid='+this.shopID+'&partyid='+this.partyID).subscribe(
        (Response)=>{
          this.ReportData = Response;
        },
        (Error)=>{
          this.msg.WarnNotify('Error Occured');
  
          console.log(Error);
  
        }
      )
    }
    
  }


  //////////////////////////////////////////////////////
  PrintTable(){
    

    if(this.ReportData != null){
      this.global.printData('#printRpt')
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
