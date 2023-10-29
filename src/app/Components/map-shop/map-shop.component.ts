import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { data, error } from 'jquery';
import { GlobalDataModule } from 'src/app/Shared/global-data/global-data.module';
import { NotificationService } from 'src/app/Shared/service/notification.service';
import { environment } from 'src/environments/environment.development';
import { AddShopCategoryComponent } from '../settings/shop-category/add-shop-category/add-shop-category.component';
import { AddServiceComponent } from './add-shopservice/add-service.component';
import { UnmapShopComponent } from './unmap-shop/unmap-shop.component';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-map-shop',
  templateUrl: './map-shop.component.html',
  styleUrls: ['./map-shop.component.scss']
})
export class MapShopComponent implements OnInit {


  showServicesForm = false;


  constructor(private globaldata:GlobalDataModule,
    private http:HttpClient,
    private msg:NotificationService,
    private dialogue:MatDialog,
    private app:AppComponent
    
    ){
    
  }

  

  ngOnInit(): void {
  this.globaldata.setHeaderTitle('Map Shop');
  this.getShop();
  this.getParty();
  this.getService();
  this.getMappedData();



  }
  camTotal:any;
  rentTotal:any;

  shopSearch:any
  customerSearch:any;
  txtSearch:any;
  ShopID:any;
  partyID:any;
  startDate :any;
  paymentDate:any;
  camID:any;
  camCharges:any;
  rentID:any;
  rentCharges:any;
  SevicesDetails:any;
  shopArea:any;


  serviceID:any;
  serviceCharges:any;
  serviceType:any;
  serviceMonth:any;
  serviceTitle:any;


  CAMList:any;
  RentList:any;
  customerList:any;
  ShopList:any;
  servicesList:any;


  mappedShopData:any;
  ServicesData:any=[];


////////////////////////////////////////////////////

getShop(){
  this.http.get(environment.mallApiUrl+'GetShop').subscribe(
    {
      next:value=>{
        // console.log(value);
        this.ShopList = value;
      },
      error:error=>{
        console.log(error);
        this.msg.WarnNotify('error Occured while Loading Data');
      }
    }
  )
}


//////////////////////////////////////////////

getParty(){
  this.http.get(environment.mallApiUrl+'getparty').subscribe(
  {
    next:value =>{
      this.customerList = value;
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

  getService(){
    this.http.get(environment.mallApiUrl+'getservice').subscribe(
     {
       next:value=>{
         this.servicesList = value;
         // console.log(value);
       },
       error:error=>{
         this.msg.WarnNotify('Error Occured while Loading Data');
         console.log(error);
       }
     }
    ) 
   }


     //////////////////////////////////////////

     getMappedData(){
      this.app.startLoaderDark();
      this.http.get(environment.mallApiUrl+'GetMappedShop').subscribe(
        {
          next:value=>{
        
            this.mappedShopData = value;
            this.app.stopLoaderDark();
          },
  
        error:error=>{
          console.log(error);
          this.msg.WarnNotify('Error Occured While loading data');
          this.app.stopLoaderDark()
        }
        }
      )
     }

  /////////////////////////////////////////////

  onServiceIDChange(){
    var row = this.servicesList.find((x:any)=>x.serviceID == this.serviceID);

    this.serviceCharges = row.serviceCharges;
    this.serviceTitle = row.serviceTitle;
  }



 

  
  ///////////////////////////////////

  onShopIDChage(){
    var row = this.ShopList.find((x:any)=>x.shopID == this.ShopID);

    this.camID = row.camID;
    this.rentID = row.rentID;
    this.camCharges = row.camCharges;
    this.rentCharges = row.rentCharges;
    this.shopArea = row.shopAreaSQ;
    this.onCamChange();
    this.onRentChange();
    
  }

  onCamChange(){
    var row = this.ShopList.find((x:any)=>x.shopID == this.ShopID);
   

    this.camTotal = this.camCharges * row.shopAreaSQ;
  }

  onRentChange(){
    var row = this.ShopList.find((x:any)=>x.shopID == this.ShopID);
  

    this.rentTotal = this.rentCharges * row.shopAreaSQ;
  }

  



  
 


 

   /////////////////////////////////////////////////////
   addService(){
   
    //console.log(this.serviceID,this.serviceCharges,this.serviceType,this.serviceMonth); 

    if(this.serviceID == '' || this.serviceID == undefined){
      this.msg.WarnNotify('Select The Service Name')
    }else if(this.serviceCharges == '' || this.serviceCharges == undefined){
      this.msg.WarnNotify('Enter The Service Charges')
    }else if(this.serviceType == '' || this.serviceType == undefined){
      this.msg.WarnNotify('Select The Type Of Service')
    }else if(this.serviceMonth == '' || this.serviceMonth == undefined){
      this.msg.WarnNotify('Select The Service End Date')
    }else{

    

      this.ServicesData.push({ServiceID:this.serviceID,ServiceTitle:this.serviceTitle,ServiceCharges:this.serviceCharges,ServiceType:this.serviceType,TmpServiceMonth:this.globaldata.dateFormater(this.serviceMonth,'-')});
      this.serviceID = '';
      this.serviceCharges = '';
      this.serviceType = '';
      this.serviceMonth = '';
      this.serviceTitle = '';
    }
   
   }

   ////////////////////////////////////////////////////

   saveMapShop(){

   if(this.ShopID == '' || this.ShopID == undefined){
    this.msg.WarnNotify('Shop Name Required');
   }else if(this.partyID == '' || this.partyID == undefined){
    this.msg.WarnNotify('Customer Name Required')
   }else if(this.startDate == '' || this.startDate == undefined){
    this.msg.WarnNotify('Start Date Required')
   }else if(this.paymentDate == '' || this.paymentDate == undefined){
    this.msg.WarnNotify('Payment Date Required')
   }
   else if(this.camCharges === '' || this.camCharges === undefined){
    this.msg.WarnNotify('Enter CAM Charges')
   }else if(this.rentCharges === '' || this.rentCharges === undefined){
    this.msg.WarnNotify('Enter Rent Charges')
   }
   else {

    this.app.startLoaderDark();
    this.http.post(environment.mallApiUrl+'InsertMapShop',{
      ShopID: this.ShopID,
      PartyID: this.partyID,
      StartDate: this.globaldata.dateFormater(this.startDate,'-'),
      RentPaymentDate: this.paymentDate.toString(),
      CamID: this.camID,
      CamCharges: this.camCharges,
      RentID: this.rentID,
      RentCharges: this.rentCharges,
      ServiceDetail:JSON.stringify(this.ServicesData),

      UserID: this.globaldata.getUserID(),
    }).subscribe(
      (Response:any)=>{
        if(Response.msg == 'Data Saved Successfully'){
          this.msg.SuccessNotify(Response.msg);
          this.reset();
          this.getMappedData();
          this.app.stopLoaderDark();
        }else{
          this.msg.WarnNotify(Response.msg);
          this.app.stopLoaderDark();
        }
      }
    )
   }
   
  
   }


   ///////////////////////////////////////

   reset(){
    this.ShopID = '';
    this.camID = '';
    this.partyID = '';
    this.camCharges = '';
    this.rentID = '';
    this.rentCharges = '';
    this.startDate = '';
    this.paymentDate = '';
    this.ServicesData = [];
    this.camTotal = '';
    this.rentTotal = '';
    this.shopArea = '';
   }
  
   ///////////////////////////////////////////////

   addNewShopService(row:any){
    this.dialogue.open(AddServiceComponent,{
      width:'50%',
      data:row
    }).afterClosed().subscribe({
      next:value=>{
        if(value == "Update"){
          this.getMappedData();
        }
      }
    })
   }


   //////////////////////////////////

   UnMapShop(row:any){
    this.dialogue.open(UnmapShopComponent,{
      width:'30%',
      data:row
    }).afterClosed().subscribe({
      next:value=>{
        if(value == "Update"){
          this.getMappedData();
        }
      }
    })
   }
}
