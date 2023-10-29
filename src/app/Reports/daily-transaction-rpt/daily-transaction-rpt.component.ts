import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { GlobalDataModule } from 'src/app/Shared/global-data/global-data.module';
import { NotificationService } from 'src/app/Shared/service/notification.service';
import { AppComponent } from 'src/app/app.component';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-daily-transaction-rpt',
  templateUrl: './daily-transaction-rpt.component.html',
  styleUrls: ['./daily-transaction-rpt.component.scss']
})
export class DailyTransactionRptComponent implements OnInit{

constructor(
  private http:HttpClient,
  private global:GlobalDataModule,
  private app:AppComponent,
  private msg:NotificationService
){

}

logo:any;
logo1:any;
companyName:any;
  companyName2:any;



  ngOnInit(): void {

    this.global.setHeaderTitle('Transaction Report');
    this.logo = this.global.Logo;
    this.logo1 =  this.global.Logo1;
    this.companyName = this.global.CompanyName;
    this.companyName2 = this.global.CompanyName2;

  }

  fromDate:Date = new Date();
  toDate:Date = new Date();


  lblDebitTotal:any;
  lblCreditTotal:any;
  invoiceDetails:any;
  reportData:any;


  getReport(){

    this.app.startLoaderDark();
    this.http.get(environment.mallApiUrl+'GetDayTransaction?FromDate='+this.global.dateFormater(this.fromDate,'-')+
    '&ToDate='+this.global.dateFormater(this.toDate,'-')).subscribe(
      (Response)=>{
        this.reportData = Response;
        this.app.stopLoaderDark();
      },
      (Error)=>{
        this.msg.WarnNotify('Error Occured');
        this.app.stopLoaderDark();
      }
    )
  }
  

  /////////////////////////////////////////////

  getInvoiceDetail(invoiceNo:any){

    this.lblDebitTotal = 0;
    this.lblCreditTotal = 0;
    this.invoiceDetails = [];

    
    this.http.get(environment.mallApiUrl+'GetSpecificVocherDetail?InvoiceNo='+invoiceNo).subscribe(
      (Response:any)=>{
        // console.log(Response);
        this.invoiceDetails = Response;
        if(Response != ''){
         
          Response.forEach((e:any) => {
            this.lblDebitTotal += e.debit;
            this.lblCreditTotal += e.credit;
          });
        }
      },
      (error:any)=>{
        console.log(error);
        this.msg.WarnNotify('Error Occured While Printing');
      }
    )
  }


  ///////////////////////////////////////////////////

  PrintTable(){
    this.global.printData('#printRpt');
    
  }



}
