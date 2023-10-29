import { Component, OnInit } from '@angular/core';
import { GlobalDataModule } from 'src/app/Shared/global-data/global-data.module';
import { Chart } from 'angular-highcharts';


import * as $ from 'jquery';
import * as highcharts from 'highcharts';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';


@Component({
  selector: 'app-dash-board',
  templateUrl: './dash-board.component.html',
  styleUrls: ['./dash-board.component.scss']
})
export class DashBoardComponent implements OnInit{
  

  constructor(private globalData :GlobalDataModule,
    private http:HttpClient,
    
    ){

  }

  expenseIcon = '../../assets/Images/expIcon.png';
  shopIcon ='../../assets/Images/shopIcons.png'
  incomeIcon = '../../assets/Images/incomeIcon.png';


  income_expense_chart:Chart |undefined;
  Acounts_Chart:Chart |undefined;

  profit_loss_chart:Chart |undefined;

  budget_Chart:Chart | undefined;
  Income_Detail_Chart:Chart | undefined;
  prvious_Income_Detail_Chart:Chart | undefined;

  
  credentials :any;
  ngOnInit(): void {
    this.getCardsData();
    this.getBudget();
    this.GetIncExp();
    this.getIncome();
    this.getPrviousMonthIncome();
    this.globalData.setHeaderTitle('DashBoard');
  

  
   //this.getbudgetChart();
   
  
  }

  budgetData:any;
  budgetMonth = new Date();
  titleList:any = [];
  budgetAmountList:any = [];
  consumedAmountList:any = [];

  cardsData:any;

  IncomeList:any = [];
  ExpenseList:any = [];
  MonthList:any = []

  MonthNameList:any = ['Jan','Feb','Mar','Apr','May','Jun','July','Aug','Sep','Oct','Nov','Dec'];



   date = new Date(Date.now());
   
   firstDay = new Date(this.date.getFullYear(), this.date.getMonth(), 1);
   lastDay = new Date(this.date.getFullYear(), this.date.getMonth() + 1, 0);

   priviousMonthFirstDay = new Date(this.date.getFullYear(), this.date.getMonth()-1, 1);
   priviousMonthLastDay = new Date(this.date.getFullYear(), this.date.getMonth(), 0);

   IncomeHeadsList:any = [];
   IncomeHeadsAmountList:any = [];

   prevMonthIncomeHeadsList:any = [];
   prevMonthIncomeAmountList:any = []
   
  


  //////////////////////////////////
  getCardsData(){
    this.http.get(environment.mallApiUrl+'GetTotals').subscribe(
      (Response)=>{
        this.cardsData = Response;

      }
    )
  }




  ////////////////////////////////////////////////

  GetIncExp(){
    this.http.get(environment.mallApiUrl+'GetIncExp').subscribe(
      (Response:any)=>{
       
        Response.forEach((e:any) => {

          if(e.coaTypeID == 2){
            this.ExpenseList.push(e.amount);
          }

          if(e.coaTypeID == 3){
            this.IncomeList.push(e.amount);
          }

        
          this.MonthList.push(this.MonthNameList[e.month-1]);

          this.incomeExpenseChart();
          

        });
      }
    )
  }
  

  
  incomeExpenseChart() {
    let chart =new Chart({
      chart: {
        type: 'column',
      },
      title: {
        text: 'INCOME VS EXPENSE',
      },
      subtitle: {
        text: 'CURRENT MONTH',
      },
      xAxis: {
        categories: this.MonthList,
        crosshair: true,
      },
      yAxis: {
        min: 0,
        title: {
          text: 'Amount',
        },
      },
      tooltip: {
        headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
        pointFormat:
          '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
          '<td style="padding:0"><b>{point.y:.1f} Rs</b></td></tr>',
        footerFormat: '</table>',
        shared: true,
        useHTML: true,
      },
      plotOptions: {
        column: {
          pointPadding: 0.2,
          borderWidth: 0,
        },
      },
      series: [
        {
          name: 'Income',
          type: 'column',
          
          

          data: this.IncomeList,
        },
        {
          name: 'Expense',
          type: 'column',
         
          data: this.ExpenseList,
        },
      ],
    });
    this.income_expense_chart = chart;
  }


  ////////////////////////////////////////////

  getBudget(){
    

    this.http.get(environment.mallApiUrl+'GetMonthlyBudget?BudgetDate='+this.globalData.dateFormater(this.budgetMonth,'-')).subscribe(
      (Response:any)=>{
        this.budgetData = Response;
        

        Response.forEach((e:any) => {
          this.titleList.push(e.coaTitle);
          this.budgetAmountList.push(e.budgetAmount);
          this.consumedAmountList.push(e.consumedAmount);          
        });

        this.getbudgetChart();

      }
    )

  }



  getbudgetChart(){
    var chart = new Chart( {
      data: {
          table: 'datatable'
      },
      chart: {
          type: 'column'
      },
      title: {
          text: 'BUDGET COMPARISON'
      },
      subtitle: {
          text: 'CURRENT MONTH'
             
      },
      xAxis: {
          categories: this.titleList,
          
      },
      yAxis: {
        min : 0,
          allowDecimals: false,
          title: {
              text: 'Amount'
          }
      },
      tooltip: {
        headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
        pointFormat:
          '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
          '<td style="padding:0"><b>{point.y:.1f} Rs</b></td></tr>',
        footerFormat: '</table>',
        shared: true,
        useHTML: true,
      },
      plotOptions: {
        column: {
          pointPadding: 0.2,
          borderWidth: 0,
        },
      },
      series: [
        {
          name: 'Budget Amount',
          type: 'column',
          color:'green',
         

          data: this.budgetAmountList
          ,
        },
        {
          name: 'Consumed',
          type: 'column',
          color:'red',
          data:  this.consumedAmountList,
          
        },
      ],
  });
  this.budget_Chart = chart;
  
  }
 

  ////////////////////////////////////////////////////////


  getIncome(){
   
    this.IncomeHeadsList = [];
    this.IncomeHeadsAmountList = [];
  

    this.http.get(environment.mallApiUrl+'GetProfitDetailRpt?fromdate='+this.globalData.dateFormater(this.firstDay,'-')+'&todate='
      +this.globalData.dateFormater(this.lastDay,'-')).subscribe(
        (Response:any)=>{


          // this.IncomeHeadsList = [
          //   'salaries',
          //   'medical',
          //   'entertainment',
          //   'stationary',
          //   'printing',
          // ]

          // this.IncomeHeadsAmountList = [
          //   ['salaries', 29.9, false],
          //   ['medical', 71.5, false],
          //   ['entertainment', 106.4, false],
          //   ['stationery', 129.2, true, true],
          //   ['printing', 144.0, false],
          // ]

          Response.forEach((obj:any) => {

            var amount = (obj.credit - obj.debit).toFixed();
            this.IncomeHeadsList.push(obj.coaTitle);
            var tmpArry:any = [];
            tmpArry.push(obj.coaTitle, parseFloat(amount), false);
            this.IncomeHeadsAmountList.push(tmpArry);
            
          });
          
            this.IncomeDetailPieChart();

        },
        (Error)=>{
       
        }
      )
  }


  IncomeDetailPieChart() {
    let chart = new Chart({
      chart: {
        styledMode: false,
      },

      title: {
        text: 'INCOME ANALYSIS',
      },
      subtitle:{
        text:'CURRENT MONTH',
      },
      xAxis: {
        categories: this.IncomeHeadsList,
      },

      series: [
        {
          type: 'pie',
          allowPointSelect: true,
          
          keys: ['name', 'y', 'selected', 'sliced'],
          //keys: ['y', 'selected', 'sliced'],
          data: this.IncomeHeadsAmountList ,   
           showInLegend: true,
        },
      ],
    });
    this.Income_Detail_Chart = chart;
  }

  ///////////////////////////////////////////////////////


  getPrviousMonthIncome(){
   
    this.prevMonthIncomeHeadsList = [];
    this.prevMonthIncomeAmountList = [];
    


    this.http.get(environment.mallApiUrl+'GetProfitDetailRpt?fromdate='+this.globalData.dateFormater(this.priviousMonthFirstDay,'-')+'&todate='
      +this.globalData.dateFormater(this.priviousMonthLastDay,'-')).subscribe(
        (Response:any)=>{

          // this.IncomeHeadsList = [
          //   'salaries',
          //   'medical',
          //   'entertainment',
          //   'stationary',
          //   'printing',
          // ]

          // this.IncomeHeadsAmountList = [
          //   ['salaries', 29.9, false],
          //   ['medical', 71.5, false],
          //   ['entertainment', 106.4, false],
          //   ['stationery', 129.2, true, true],
          //   ['printing', 144.0, false],
          // ]

          Response.forEach((obj:any) => {


            var amount = (obj.credit - obj.debit).toFixed();
            this.prevMonthIncomeHeadsList.push(obj.coaTitle);
            var tmpArry:any = [];
            tmpArry.push(obj.coaTitle, parseFloat(amount), false);
            this.prevMonthIncomeAmountList.push(tmpArry);
            
          });
          
            this.previousIncomeDetailPieChart();

        },
        (Error)=>{
       
        }
      )
  }

  previousIncomeDetailPieChart() {
    let chart = new Chart({
      chart: {
        styledMode: false,
      },

      title: {
        text: 'INCOME ANALYSIS',
      },
      subtitle: {
        text: 'PREVIOUS MONTH'
           
    },

      xAxis: {
        categories: this.prevMonthIncomeHeadsList,
      },

      series: [
        {
          type: 'pie',
          allowPointSelect: true,
          
          keys: ['name', 'y', 'selected', 'sliced'],
          //keys: ['y', 'selected', 'sliced'],
          data: this.prevMonthIncomeAmountList ,   
           showInLegend: true,
        },
      ],
    });
    this.prvious_Income_Detail_Chart = chart;
  }


}
