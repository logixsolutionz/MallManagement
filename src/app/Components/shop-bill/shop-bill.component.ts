import { DialogRef } from '@angular/cdk/dialog';
import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { GlobalDataModule } from 'src/app/Shared/global-data/global-data.module';
import { NotificationService } from 'src/app/Shared/service/notification.service';
import { environment } from 'src/environments/environment.development';
import { BillformComponent } from './billform/billform.component';
import * as $ from 'jquery';
import Swal from 'sweetalert2';
import { AppComponent } from 'src/app/app.component';
import { BillDetailsComponent } from './bill-details/bill-details.component';






@Component({
  selector: 'app-shop-bill',
  templateUrl: './shop-bill.component.html',
  styleUrls: ['./shop-bill.component.scss']
})
export class ShopBillComponent implements OnInit{

  loadingBar = 'start';

    page:number = 1;
    count: number = 0;
    tableSize: number = 0;
    tableSizes : any = [];

    onTableDataChange(event:any){

      this.page = event;
      this.getSavedBill();
    }

    onTableSizeChange(event:any):void{
      this.tableSize = event.target.value;
      this.page =1 ;
      this.getSavedBill();
    }



  RoleID:any;

  MehriaMallLogo :any;
 MehriaTownLogo:any
 companyName:any;
 companyName2:any;
 companyAddress:any;
 companyPhoneNo:any;
 
 



  mappedShopData:any
  searchShop:any;
  searchBill:any;
  SavedBillList:any = [];
  billPrintData:any;
  billData:any = [];
  partyList:any;
  billTotal = 0;
  shopServicesData:any;

  customerBillData:any;

  customerID:any;
  billDate:any;
  lblCustomerName:any;
  lblDate:any;
  

  ////////////////////print Table Variables//////////////////////////////////////////

  pBillNo:any = '';
  pBillDate:any="";
  pAccountTitle = 'Mehria Town Pvt. (ltd)';
  pAccountNo = '57365001517411';
  pShopName :any;
  pCustomername:any;
  pDueDate:any;
  pRentCharges:any;
  pCamCharges:any;
  TotalCharges:any;
  tableData:any =[];
  billRemarks:any;
  billDetails:any;
  search:any;
  previousBalance:any;


  constructor(private http:HttpClient,
    private msg:NotificationService,
    private dialogue: MatDialog,
    private globaldata:GlobalDataModule,
    private app:AppComponent,
    
    ){}

  ngOnInit(): void {
    this.globaldata.setHeaderTitle('Shop Billing');
    this.RoleID = this.globaldata.getRoleId();
    this.getMappedData();
    this.getSavedBill();
    this.getParty();
    this.MehriaMallLogo = this.globaldata.Logo;
    this.MehriaTownLogo = this.globaldata.Logo1;
    this.companyName = this.globaldata.CompanyName;
    this.companyName2 = this.globaldata.CompanyName2;
    this.companyAddress = this.globaldata.Address;
    this.companyPhoneNo = this.globaldata.Phone;
    this.tableSize = this.globaldata.paginationDefaultTalbeSize;
    this.tableSizes = this.globaldata.paginationTableSizes;
  }


  getParty(){
    this.http.get(environment.mallApiUrl+'getparty').subscribe(
    {
      next:value =>{
        this.partyList = value;
        // console.log(value);
      
      },
      error: error=>{
        this.msg.WarnNotify('Error Occured While Loading Data')
        console.log(error);
      }        
      
      
    }
    )
  }


  //////////////////////////////////////////

  getMappedData(){
    
    // this.app.startLoaderDark();
    $('.loaderDark').show();
    this.http.get(environment.mallApiUrl+'GetMappedShop').subscribe(
      {
        next:value=>{
          // console.log(value);
          this.mappedShopData = value;
          //this.app.stopLoaderDark();
          $('.loaderDark').fadeOut(500);
        },

      error:error=>{
        console.log(error);
        this.msg.WarnNotify('Error Occured While loading data');
        //this.app.stopLoaderDark();
        $('.loaderDark').fadeOut(500);
      }
      }
    )
   }



   ////////////////////////////////////////////////////

   getSavedBill(){

    
    this.http.get(environment.mallApiUrl+'getbill').subscribe(
      {
        next:value=>{
          // console.log(value);
          this.SavedBillList = value;

          this.loadingBar = 'stop';
       
        },
        error:error=>{
          this.msg.WarnNotify('Error Occured While Loading Data');
          console.log(error);
         
        }
      }
    )
   }



   //////////////////////////////////////////////////////

   generateBill(row:any){
    this.dialogue.open(BillformComponent,{
      width:'40%',
      data:row,
    }).afterClosed().subscribe(
      {
        next:value=>{
            ///////////////////////// will print out bill after Save////////
             if(value > 0){
              this.getSavedBill();
             }
          
        }
      }
    )
   }


   ////////////////////////////////////////////////

   PrintBill(row:any) {
    this.resetPrint();
    this.pBillNo = row.billNo;
    this.pBillDate = row.billDate;
    this.pShopName = row.shopTitle;
    this.pCustomername = row.partyName;
    this.TotalCharges = row.charges;
    this.billRemarks = row.remarks;
    
 

    this.getSingleBill(row.billNo,'#printBill');
   

    
    
    
  }


  ///////////////////////////////////////////////////////////

  printAfterSave(billNo:number){
    this.resetPrint();

    var curRow = this.SavedBillList.find((obj:any)=> obj.billNo === billNo);
    // console.log(curRow);

    this.pBillNo = curRow.billNo;
    this.pBillDate = curRow.billDate;
    this.pShopName = curRow.shopTitle;
    this.pCustomername = curRow.partyName;
    this.TotalCharges = curRow.charges;
    this.billRemarks = curRow.remarks;

    this.previousBalance = curRow.balance;

    this.getSingleBill(billNo,'#afterSavePrint');
   
  }

  ////////////////////////////////////////////////////////

  getSingleBill(billNo:any,printDiv:any){
    
    this.previousBalance = 0;
    
    this.http.get(environment.mallApiUrl+'getsinglebill?billno='+billNo).subscribe(
      (Response:any)=>{
      
        this.previousBalance = Response[0].balance;
        this.billData = Response;
        if(Response.length > 0){

          ///////////////// will push the rent if cam is not zero
          if(Response[0].rentCharges != 0){
            this.tableData.push(   
              {title:'Rent',charges:Response[0].rentCharges * Response[0].shopAreaSQ},    
             );
          }

          ///////////////// will push the cam if cam is not zero
          if(Response[0].camCharges != 0){
            this.tableData.push(
              {title:'CAM',charges:Response[0].camCharges * Response[0].shopAreaSQ},
             );
          }
          
         
           
         for(var i = 0; Response.length > i;i++ ){
          if(Response[i].serviceTitle != '-'){
            this.tableData.push(
              {title:Response[i].serviceTitle,charges:Response[i].serviceCharges});
          }
          
            
         }
         
         if(printDiv != ''){
          setTimeout(() => {
            this.globaldata.printData(printDiv);
          }, 500);
         }
        
           
        }
      }
    )
  }


  //////////////////////////////////////////////////////////////

  getBillDetails(billNo:any){
    this.tableData = [];

    this.http.get(environment.mallApiUrl+'getsinglebill?billno='+billNo).subscribe(
      (Response:any)=>{
        
        this.billData = Response;
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
          if(Response[i].serviceTitle != '-'){
            this.tableData.push(
              {title:Response[i].serviceTitle,charges:Response[i].serviceCharges});
          }
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

  //////////////////////////////////////////////////////////

  getCustomerBill(){
    if(this.customerID == ''){
      this.msg.WarnNotify('Select Customer');
    }else if(this.billDate == '' || this.billDate == undefined){
      this.msg.WarnNotify('Select Date')
    }else{

      this.customerBillData = [];
      this.billTotal = 0;

      this.http.get(environment.mallApiUrl+'GetPartyBill?billdate='+this.billDate.toISOString()+'&partyid='+this.customerID).subscribe(
        (Response:any)=>{
          this.lblCustomerName = Response[0].partyName;
          this.lblDate = this.billDate;
          // console.log(this.lblDate);
         
         if(Response != ''){
          this.customerBillData = Response;
          setTimeout(() => {
            this.globaldata.printData('#customerBills');
          }, 1000);
          this.customerID = '';
          this.billDate = '';
          Response.forEach((e:any) => {
            this.billTotal += e.charges;
            
          });
        


         }else{
          this.msg.WarnNotify('No Data Available');
         }
          
        }
      )
    }
   
    
    

  }

  ////////////////////////////////////////////////////////

  approveBill(row:any){
    Swal.fire({
      title:'success',
      text:'Confirm to Approve Bill',
      position:'center',
      icon:'success',
      iconColor:'green',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirm',
    }).then((result)=>{
      if(result.isConfirmed){

        //////on confirm button pressed the api will run
        this.http.post(environment.mallApiUrl+'ApproveBill',{
          BillNo:row.billNo,
        PartyID: row.partyID,
        ShopID:row.shopID,
        UserID: this.globaldata.getUserID(),
        }).subscribe(
          (Response:any)=>{
            if(Response.msg == 'Data Saved Successfully'){
              this.msg.SuccessNotify('Bill Approved');
              this.getSavedBill();
              this.getMappedData();       
             }else{
              this.msg.WarnNotify(Response.msg);
             }
          }
        )
      }
    });
    
  }



  /////////////////////////////////////////////////////////////////////////////

  DeleteBill(row:any){
    Swal.fire({
      title:'Alert!',
      text:'Confirm to Delete the Data',
      position:'center',
      icon:'warning',
      iconColor:'red',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirm',
    }).then((result)=>{
      if(result.isConfirmed){

        //////on confirm button pressed the api will run
        this.http.post(environment.mallApiUrl+'DeleteBill',{
          BillNo:row.billNo,
        UserID: this.globaldata.getUserID(),
        }).subscribe(
          (Response:any)=>{
            if(Response.msg == 'Data Deleted Successfully'){
              this.msg.SuccessNotify(Response.msg);
              this.getSavedBill(); 
            }else{
              this.msg.WarnNotify(Response.msg);
            }
          }
        )
      }
    });
   

    
  }



  /////////////////////////////////////////////////
  resetPrint(){
    this.pBillNo ="";
    this.pBillDate = "";
    this.pShopName = "";
    this.pCustomername = "";
    this.tableData = [];
  }



    ///////////////////////////////////////////////////////////////

    getSavedService(shopID:any,rentHistoryID:any){
      this.http.get(environment.mallApiUrl+'GetShopServices?shopid='+shopID+'&shoprhid='+rentHistoryID).subscribe(
        {
          next:value=>{
            this.shopServicesData  = value;
            
            
          },
          error:error=>{
            this.msg.WarnNotify('Unable to Load Data');
            console.log(error);
          }
        }
      )
     }
  

}
