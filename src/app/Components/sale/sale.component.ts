import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { GlobalDataModule } from 'src/app/Shared/global-data/global-data.module';
import { NotificationService } from 'src/app/Shared/service/notification.service';
import { environment } from 'src/environments/environment.development';
import * as $ from 'jquery';

@Component({
  selector: 'app-sale',
  templateUrl: './sale.component.html',
  styleUrls: ['./sale.component.scss'],
})
export class SaleComponent implements OnInit {
  constructor(
    private http: HttpClient,
    private globalData: GlobalDataModule,
    private msg: NotificationService
  ) { }

  ngOnInit(): void {
    this.globalData.setHeaderTitle('Sale');
    this.getProducts();
    this.getCustomer();
    this.getInvoices();
    
   
  }
  tabIndex : any;
  productsData: any;
  customersList: any;
  PBarcode = '';
  holdData: any = [];
  curDate =new Date();
  Invoices:any;
  searchtxt:any;
  btnType = 'Save & Print';

  myPartyID = 1;
  myTotalQty = 0;

  myProdQty = 1;
  mySubtoatal = 0;
  myDiscount = 0;
  myTotal = 0;
  myPaid = 0;
  myDue = 0;
  myRemarks='-';
  InvoiceNo:any; ///////for Update Invocie invoice NO Stored in it


  ///////////////////////get the customers Data////////////////////
  getCustomer() {
    this.http.get(environment.apiUrl + 'api/party/getcustomer').subscribe({
      next: (value) => {
        this.customersList = value;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  //////////////////////get the products Data///////////////////////
  getProducts() {
    this.http.get(environment.apiUrl + 'api/product/getproduct').subscribe({
      next: (value) => {
        console.log(value);
        this.productsData = value;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }



  ///////////////get the Saved Invoice data///////////////////////

  getInvoices(){
    this.http.get(environment.apiUrl+'api/sale/getSaleInvoice').subscribe({
      next:value=>{
        this.Invoices = value;
        console.log(this.Invoices);
      },
      error:error=>{
        console.log(error);
      }
    })
  }

  ///////////////gives the total of products quantity and total Bill Amount etc///////////////////
  getTotal() {
    this.mySubtoatal = 0;
    this.myTotalQty = 0;
    for (var i = 0; i < this.holdData.length; i++) {
      this.mySubtoatal +=
        this.holdData[i].quantity * this.holdData[i].salePrice;
      this.myTotalQty += parseFloat(this.holdData[i].quantity);
      this.myTotal = this.mySubtoatal - this.myDiscount;
      this.myDue = this.myPaid - this.myTotal;
    }
  }

  EnterData(event: any) {


    // var product = this.productsData.find(
    //   (x: any) =>
    //     x.pBarcode === event.target.value ||
    //     x.pBarcode1 === event.target.value ||
    //     x.pBarcode2 === event.target.value
    // );

    // var condition = this.holdData.find(
    //   (x: any) => x.productID == product.productID
    // );

    // var index = this.holdData.indexOf(condition);

    // if (condition == undefined) {

    //   if (product != undefined) {
    //     this.holdData.push({
    //       productID: product.productID,
    //       productName: product.productName,
    //       salePrice: product.salePrice,
    //       Quantity: 1,
    //       costPrice: product.costPrice,
    //     });
    //     this.getTotal();

    //     this.PBarcode = '';
    //     $('#searchProduct').trigger('focus');
    //   } else {
    //     alert('Product Not Found');
    //   }

    // } else {
    //   this.holdData[index].Quantity += 1;
    //   this.getTotal();
    //   this.PBarcode = '';
    //   $('#searchProduct').trigger('focus');
    // }
  }

  ///////////////////hold data funcition pushes data into holdData list/////////////////////
  holdDatafunc(data: any) {
    var condition = this.holdData.find(
      (x: any) => x.productID == data.productID
    );

    var index = this.holdData.indexOf(condition);

    if (condition == undefined) {
      this.holdData.push({
        productID: data.productID,
        productName: data.productName,
        salePrice: data.salePrice,
        quantity: 1,
        costPrice: data.costPrice,
        gst:data.gst,
       
      });
      this.getTotal();
      this.PBarcode = '';
      $('#searchProduct').trigger('focus');
    } else {
      this.holdData[index].quantity += 1;
      this.getTotal();
      this.PBarcode = '';
      $('#searchProduct').trigger('focus');
    }
  }

  //////////////////////delete the specific row for holddata.]////////////////
  delRow(item: any) {
    var index = this.holdData.indexOf(item);
    this.holdData.splice(index, 1);
    this.getTotal();
  }



  ////////calls on Change of Quantity of the product//////////////
  onQtyChange(item: any) {
    var index = this.holdData.indexOf(item);
    var myQty = this.holdData[index].quantity;
    var curQty = myQty;
    // console.log(myQty);
    // console.log(index);
   
    var qty = $('#pQty').val(); 

    if(myQty <= 0 || myQty == '' || myQty == null){
      
      this.msg.WarnNotify("Zero , Empty or Negative Value Not Allowed");
      
      this.holdData[index].quantity = 1 ;
      this.getTotal();
    }else{
    this.holdData[index].quantity = qty;
    this.holdData[index].quantity = myQty;
    
    console.log(this.holdData);
    this.getTotal();
    // $('#pQty').val('');
    }
  }



////////////////// will run The Cash Sale//////////////

  CashSale(){
    if(this.holdData == '' || this.holdData == undefined){
      this.msg.WarnNotify("Please Select some Product")
    }else if(this.myPartyID == 1 && this.myPaid ==  0 || this.myPaid == undefined){
      this.msg.WarnNotify("Please Select Some Party Or Enter Cash")
    }
    else{
      if(this.btnType == "Save & Print"){
        this.http.post(environment.apiUrl+'api/sale/insert',{
    
          partyID : this.myPartyID,
          cashReceived:this.myPaid,
          // cashReturn:this.myDue,
          InvoiceDate:this.curDate,
          changed:this.myDue,
          discount:this.myDiscount,
          type:'S',
          subType:'Sale',
          sectionID:this.globalData.currentUserValue.sectionID,
          remarks:this.myRemarks,
          createdBy:this.globalData.getUserID(),
          hdnRemarks:'Sale Invoice',
          locationID:1,
          inoviceDetails: JSON.stringify(this.holdData),
    
          
    
        },{responseType:'text'}).subscribe({
          next:value=>{
            console.log(value);
            this.msg.SuccessNotify(value);
            this.reset();
            this.getInvoices();
    
          },
          error:error=>{
            console.log(error);
            this.msg.WarnNotify("Error Occured While Saving Invoice");
          }
        });
       }else if(this.btnType == "Update"){
        this.updateInvoice(this.InvoiceNo);
       }
    }


   
  }



  //////////////////will update the inovoice
  updateInvoice(invId:any){

    this.http.put(environment.apiUrl+'api/sale/updateInvoice?id='+invId,{
      partyID : this.myPartyID,
      cashReceived:this.myPaid,
      // cashReturn:this.myDue,
      InvoiceDate:this.curDate,
      changed:this.myDue,
      discount:this.myDiscount,
      sectionID:this.globalData.currentUserValue.sectionID,
      remarks:this.myRemarks,
      modifiedBy:this.globalData.getUserID(),
      // hdnRemarks:'Sale Invoice',
      // locationID:1,
      inoviceDetails: JSON.stringify(this.holdData),
    },{responseType:'text'}).subscribe({
      next:value=>{
        console.log(value);
        this.msg.SuccessNotify(value);
        this.reset();
        this.getInvoices();
        this.InvoiceNo = '';
      },
      error:error=>{
        console.log(error);
        this.msg.WarnNotify("Error Occured While Updating Invoice");
      }
    })

  }

  ////////////////// Will run to Edit the Invoice////////////////
  editInvoice(row:any){
    var data :any;

    this.http.get(environment.apiUrl+'api/sale/getInvDetailByID?id='+ row.invoiceNo,{responseType:'json'}).subscribe(
      {
        next:value=>{
          data = value;
          console.log(data);
          if(data != undefined || data != ''){
          this.holdData = data;
          this.getTotal();
         
          
          }
        },
        error:error=>{
          this.msg.WarnNotify("Error Occured While Editing the Invoice");
          console.log(error);
        }
      }
    );
    this.myDiscount = row.discount;
    this.myPaid = row.cashReceived;
    this.myPartyID = row.partyID;
    this.InvoiceNo = row.invoiceNo;
    this.btnType = "Update";
    this.tabIndex = 0;
    // $("salePage").css("background-color","blue");
    // $('#salePage').css('background-color','red');
   
  }




  ////////////////////////function Will Reset the Whole Sale Page////////////////////////

  reset(){
    this.myDiscount = 0;
    this.myDue = 0;
    this.myPaid = 0;
    this.myPartyID = 1;
    this.myRemarks = '-';
    this.mySubtoatal = 0;
    this.myTotal = 0;
    this.holdData = [];
    this.getTotal();
    this.tabIndex = 0;

  }
}
