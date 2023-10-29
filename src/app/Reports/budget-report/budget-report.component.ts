import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { GlobalDataModule } from 'src/app/Shared/global-data/global-data.module';
import { NotificationService } from 'src/app/Shared/service/notification.service';
import { AppComponent } from 'src/app/app.component';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-budget-report',
  templateUrl: './budget-report.component.html',
  styleUrls: ['./budget-report.component.scss']
})
export class BudgetReportComponent implements OnInit{

  constructor(
    private http:HttpClient,
    private msg:NotificationService,
    private app:AppComponent,
    private global:GlobalDataModule,
  ){}


  ngOnInit(): void {
   
    this.global.setHeaderTitle('Budget Report');
    this.logo = this.global.Logo;
    this.logo1 = this.global.Logo1;
    this.companyName = this.global.CompanyName;
    this.companyName2 = this.global.CompanyName2;

  }

  logo:any;
  logo1:any;
  companyName:any;
  companyName2:any;


  budgetMonth :any = new Date();

  reportData:any;
  TotalAmount:any = 0;
  totalConsumedAmount:any = 0;


  ////////////////////////////////////////////

  getReport(){
    this.TotalAmount = 0;
    this.totalConsumedAmount = 0;

    this.http.get(environment.mallApiUrl+'GetMonthlyBudget?BudgetDate='+this.global.dateFormater(this.budgetMonth,'-')).subscribe(
      (Response:any)=>{
        this.reportData = Response;

        Response.forEach((e:any) => {
          this.TotalAmount += e.budgetAmount;
          this.totalConsumedAmount += e.consumedAmount;

        });
      }
    )

  }

  PrintTable(){

    this.global.printData('#printDiv');
  }

}
