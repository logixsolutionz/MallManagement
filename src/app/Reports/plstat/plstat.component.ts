import { Component, OnInit } from '@angular/core';
import { GlobalDataModule } from 'src/app/Shared/global-data/global-data.module';
import * as $ from 'jquery'
import { HttpClient } from '@angular/common/http';
import { NotificationService } from 'src/app/Shared/service/notification.service';
import { environment } from 'src/environments/environment.development';
import { AppComponent } from 'src/app/app.component';



@Component({
  selector: 'app-plstat',
  templateUrl: './plstat.component.html',
  styleUrls: ['./plstat.component.scss']
})
export class PlstatComponent implements OnInit {

  logo:any;
  logo1:any;
  companyName:any;
  companyName2:any;


  constructor(private globalData: GlobalDataModule,
    private http:HttpClient,
    private msg:NotificationService,
    private app:AppComponent
    
    ){}
  ngOnInit(): void {
    this.globalData.setHeaderTitle('Profit & Loss Statement');
    this.logo = this.globalData.Logo;
    this.logo1 = this.globalData.Logo1;
    this.companyName = this.globalData.CompanyName;
    this.companyName2 = this.globalData.CompanyName2;

    $('#printDiv').hide();
  }


  fromDate: any = new Date();
  toDate: any = new Date();

  IncomeData:any;
  ExpenseData:any;

  incDebitTotal = 0;
  incCreditTotal = 0;

  expDebitTotal = 0;
  expCreditTotal = 0;


  getIncomeTotal(){
    this.incDebitTotal = 0;
    this.incCreditTotal = 0;
    this.IncomeData.forEach((e:any) => {
      this.incDebitTotal += e.debit;
      this.incCreditTotal += e.credit;

    });

   
  }
  getExpenseTotal(){
    this.expDebitTotal = 0;
    this.expCreditTotal = 0;
    this.ExpenseData.forEach((e:any) => {
      this.expDebitTotal += e.debit;
      this.expCreditTotal += e.credit;

    });
  }


  getReport(reqFunc:any){
  
    this.incDebitTotal = 0;
    this.incCreditTotal = 0;
    this.expDebitTotal = 0;
    this.expCreditTotal = 0;
    this.app.startLoaderDark();
    
    this.IncomeData = [];
    this.ExpenseData = [];


    if(reqFunc == 'R1'){
      this.http.get(environment.mallApiUrl+'GetProfitRpt?fromdate='+this.globalData.dateFormater(this.fromDate,'-')+'&todate='
      +this.globalData.dateFormater(this.toDate,'-')).subscribe(
        (Response)=>{
         
          $('#printDiv').show();
          
          this.IncomeData = Response;
          this.getIncomeTotal();
          this.app.stopLoaderDark();
          
  
        },
        (Error)=>{
          this.msg.WarnNotify('Error occured While Loading Expense');
          this.app.stopLoaderDark();
        }
      )
    }

    if(reqFunc == 'R2'){
      this.http.get(environment.mallApiUrl+'GetProfitDetailRpt?fromdate='+this.globalData.dateFormater(this.fromDate,'-')+'&todate='
      +this.globalData.dateFormater(this.toDate,'-')).subscribe(
        (Response)=>{
        
         
          $('#printDiv').show();
        
          this.IncomeData = Response;
          this.getIncomeTotal();
          this.app.stopLoaderDark();
          
  
        },
        (Error)=>{
          this.msg.WarnNotify('Error occured While Loading Expense');
          this.app.stopLoaderDark();
        }
      )
    }

    
    this.http.get(environment.mallApiUrl+'GetLossRpt?fromdate='+this.globalData.dateFormater(this.fromDate,'-')+'&todate='
    +this.globalData.dateFormater(this.toDate,'-')).subscribe(
      (Response)=>{

        this.ExpenseData = Response;
        this.getExpenseTotal();
        this.app.stopLoaderDark();
        $('#printDiv').show();
      },
      (Error)=>{
        this.msg.WarnNotify('Error occured While Loading Income')
        this.app.stopLoaderDark();
      }
    )
  }
  

  

  PrintTable() {
    this.globalData.printData('#printDiv');
  }
}
