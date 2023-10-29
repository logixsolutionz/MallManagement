import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { GlobalDataModule } from 'src/app/Shared/global-data/global-data.module';
import { environment } from 'src/environments/environment.development';
import * as $ from 'jquery';
import { NotificationService } from 'src/app/Shared/service/notification.service';

@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.scss']
})
export class PurchaseComponent implements OnInit {

  constructor(private http:HttpClient,
    private globalData:GlobalDataModule,
    private msg:NotificationService){

  }
  ngOnInit(): void {
    this.globalData.setHeaderTitle('Purchase');
    this.getProducts();
    this.getSuppliers();
  }


  PBarcode:any;   /// for Search barcode field
  productsData:any;   //// for showing the products
  holdData: any = [];          //////will hold data temporarily
  suppliersList:any;      //////  will shows the supplier list

  myTotalQty:any;
  mySubtoatal= 0;
  myTotal:any;
  myDue:any;





 
  currentPartyAddress:any;  /////////// will shows the current party address on page
  currentPartyCity:any;      /////////// will shows the current party City on page
  currentPartyMobile:any;   /////////// will shows the current party Mobile on page
  currentPartyCNIC:any;     /////////// will shows the current party CNIC on page


  partyID:any;               /////// will get the party id for Api
  invoiceDate = new Date;    //////////// invoice date for api



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


   ///////////////////////get the Suppliers Data////////////////////
   getSuppliers() {
    this.http.get(environment.apiUrl + 'api/party/getsupplier').subscribe({
      next: (value) => {
        console.log(value);
        this.suppliersList = value;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }


//////////////// for showing the party Data ///////////////////////////////
  getCurSupplierData(){
   var currentSupplier = this.suppliersList.find((x:any)=>x.partyID == this.partyID);
   console.log(currentSupplier);
    this.currentPartyAddress = currentSupplier.partyAddress;
    this.currentPartyCity = currentSupplier.cityName;
    this.currentPartyMobile = currentSupplier.mobileNo;
    this.currentPartyCNIC = currentSupplier.partyCNIC;
  }

  ///////////////gives the total of products quantity and total Bill Amount etc///////////////////
  getTotal() {
    this.mySubtoatal = 0;
    this.myTotalQty = 0;
    for (var i = 0; i < this.holdData.length; i++) {
      this.mySubtoatal +=
        this.holdData[i].quantity * this.holdData[i].costPrice;
      this.myTotalQty += parseFloat(this.holdData[i].quantity);
      // this.myTotal = this.mySubtoatal - this.myDiscount;
      // this.myDue = this.myPaid - this.myTotal;
    }
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

  onCostChange(item: any) {
    var index = this.holdData.indexOf(item);
    var myCost = this.holdData[index].costPrice;
    // var curQty = myQty;
    // console.log(myQty);
    // console.log(index);
   
    var cost = $('#pCostPrice').val(); 

    if(myCost <= 0 || myCost == '' || myCost == null){
      
      this.msg.WarnNotify("Zero , Empty or Negative Value Not Allowed");
      
      this.holdData[index].costPrice = 1 ;
      this.getTotal();
    }else{
    this.holdData[index].costPrice = cost;
    this.holdData[index].costPrice = myCost;
    
    console.log(this.holdData);
    this.getTotal();
    // $('#pQty').val('');
    }
  }


  

  ////////////////////funciton will hold data and display on the table/////////////////////
  
  holdDataFunction(data:any){
    var condition = this.holdData.find(
      (x: any) => x.productID == data.productID
    );

    var index = this.holdData.indexOf(condition);

    if (condition == undefined) {

    console.log(data);
    this.holdData.push({
      productID:data.productID,
      productName:data.productName,
      pBarcode:data.pBarcode,
      quantity:1,
      costPrice:data.costPrice,
      ctcPrice:data.ctcPrice,
      wholeSalePrice:data.wholeSalePrice,
      salePrice:data.salePrice,

    })
    this.getTotal();
    this.PBarcode = '';
    $('#searchProduct').trigger('focus');
  }else {
    this.holdData[index].quantity += 1;
    this.getTotal();
    this.PBarcode = '';
    $('#searchProduct').trigger('focus');
  }

    this.PBarcode = '';
  }


   //////////////////////delete the specific row for holddata.]////////////////
   delRow(item: any) {
    var index = this.holdData.indexOf(item);
    this.holdData.splice(index, 1);
    this.getTotal();
    
  }













}
