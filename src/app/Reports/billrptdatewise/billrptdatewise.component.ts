import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BillDetailsComponent } from 'src/app/Components/shop-bill/bill-details/bill-details.component';
import { GlobalDataModule } from 'src/app/Shared/global-data/global-data.module';
import { NotificationService } from 'src/app/Shared/service/notification.service';
import { AppComponent } from 'src/app/app.component';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-billrptdatewise',
  templateUrl: './billrptdatewise.component.html',
  styleUrls: ['./billrptdatewise.component.scss']
})
export class BillrptdatewiseComponent implements OnInit{
 

  logo:any;
  logo1:any;
  companyName:any;
  companyName2:any;
  

  constructor(
    private http:HttpClient,
    private app:AppComponent,
    private msg:NotificationService,
    private global:GlobalDataModule,
    private dialogue: MatDialog,
  ){}



  ngOnInit(): void {
    
    
    this.global.setHeaderTitle('Bill Report DateWise');
    this.logo = this.global.Logo;
    this.logo1 = this.global.Logo1;
    this.companyName = this.global.CompanyName;
   this.companyName2 = this.global.CompanyName2;
  }



  fromDate = new Date();
  toDate = new Date();

  reportData:any = [];

  

  getReport(){
    this.global.newDateFormate(this.fromDate);
    this.global.newDateFormate(this.toDate);
    this.app.startLoaderDark();
    this.http.get(environment.mallApiUrl+'GetBillRptDatewise?startdate='+this.fromDate.toISOString().substring(0,10)+
    '&enddate='+this.toDate.toISOString().substring(0,10)).subscribe(
      (Response)=>{
     
        this.reportData = Response;
        this.app.stopLoaderDark();
      },
      (Error)=>{
        console.log(Error);
        this.app.stopLoaderDark();
      }
    )
  }



  PrintTable(){
    if(this.reportData != ''){
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

          if(Response[0].rentCharges != 0){
            this.tableData.push(
              {title:'Rent',charges:Response[0].rentCharges * Response[0].shopAreaSQ},          
             );
            
          }

          if(Response[0].camCharges != 0){
            this.tableData.push(
              {title:'CAM',charges:Response[0].camCharges * Response[0].shopAreaSQ},  
             );
          }

         
          
         
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
