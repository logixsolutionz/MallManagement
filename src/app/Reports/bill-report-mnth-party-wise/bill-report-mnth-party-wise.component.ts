import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { GlobalDataModule } from 'src/app/Shared/global-data/global-data.module';
import { NotificationService } from 'src/app/Shared/service/notification.service';
import { AppComponent } from 'src/app/app.component';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-bill-report-mnth-party-wise',
  templateUrl: './bill-report-mnth-party-wise.component.html',
  styleUrls: ['./bill-report-mnth-party-wise.component.scss']
})
export class BillReportMnthPartyWiseComponent implements OnInit {

  
  logo:any;
  logo1:any;
  companyName:any;
  companyName2:any;
  
  


  constructor(
    private http:HttpClient,
    private msg:NotificationService,
    private global:GlobalDataModule,
    private app:AppComponent
  ){}


  ngOnInit(): void {
    this.global.setHeaderTitle('bill report month & partyWise');
    this.getParty();
    this.logo = this.global.Logo;
    this.logo1 = this.global.Logo1;
    this.companyName = this.global.CompanyName;
    this.companyName2 = this.global.CompanyName2;
  
  }

  customerSearch:any

  toDate = new Date();
  customerID:any;
  selectedMonth = this.toDate.getMonth();
  customerName:any;

  tableData:any;

  camTotal:any;
  RentTotal:any;
  hvacTotal:any;
  WapdaTotal:any;
  gasTotal:any;
  generatorTotal:any;
  CommissionTotal:any;
  otherTotal:any;
  chargesTotal:any;


  customerList:any;

  
  
  getParty(){
    this.app.startLoaderDark();
    this.http.get(environment.mallApiUrl+'getparty').subscribe(
    {
      next:value =>{
        this.customerList = value;
        //console.log(value);
        this.app.stopLoaderDark();
      
      },
      error: error=>{
        this.msg.WarnNotify('Error Occured While Loading Data')
        console.log(error);
        this.app.stopLoaderDark();
      }        
      
      
    }
    )
  }



  getReport(){
    
    if(this.customerID == '' || this.customerID == undefined){
      this.msg.WarnNotify('Select Customer');
    }else {

      this.app.startLoaderDark();

      var curCustomer = this.customerList.find((e:any)=>e.partyID == this.customerID);
      this.customerName = curCustomer.partyName;

      this.http.get(environment.mallApiUrl+'GetMonthWisePartyBill?billdate='+this.global.dateFormater(this.toDate,'-')+'&cusid='+this.customerID).subscribe(
        (Response:any)=>{
          this.tableData = Response;
  
          this.camTotal =0;
          this.RentTotal = 0;
          this.hvacTotal = 0;
          this. WapdaTotal =0;
          this.gasTotal =0;
          this.generatorTotal =0;
          this.CommissionTotal = 0;
          this.otherTotal =0;
          this.chargesTotal =0;
  
          for(var i=0; i<Response.length;i++){
  
            this.RentTotal += Response[i].rentCharges;
            this.camTotal += Response[i].camCharges;
            this.hvacTotal += Response[i].hvacCharges;
            this.WapdaTotal += Response[i].wapdaCharges;
            this.gasTotal += Response[i].gasCharges;
            this.generatorTotal += Response[i].generatorCharges;
            this.CommissionTotal += Response[i].commissionCharges;
            this.otherTotal += Response[i].otherServiceCharges;
            this.chargesTotal += Response[i].charges;
 
          }

          
          this.app.stopLoaderDark();
  
  
        },
        (Error)=>{
          this.msg.WarnNotify('Error Occured While Loading Data');
          this.app.stopLoaderDark();
        }
      )
    }

    
  }

  PrintTable(){

    this.global.printData('#printRpt');
  }


}
