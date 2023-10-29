import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../Navigation/header/header.component';
import { Title } from '@angular/platform-browser';
import { GlobalDataModule } from 'src/app/Shared/global-data/global-data.module';
import { HttpClient } from '@angular/common/http';
// import { GlobalDataModule } from 'src/app/Shared/global-data/global-data.module';
import { environment } from 'src/environments/environment.development';
import { error, valHooks } from 'jquery';
import { __values } from 'tslib';
import { NotificationService } from 'src/app/Shared/service/notification.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-party',
  templateUrl: './party.component.html',
  styleUrls: ['./party.component.scss']
})
export class PartyComponent implements OnInit{


  constructor(private globalData: GlobalDataModule,
    private http : HttpClient,
    private msg : NotificationService
    ){

  }
  ngOnInit(): void{
   this.globalData.setHeaderTitle('Add Party');
   this.getParty();
   this.getCityNames();
  }




  //////////////////////////////////////////////////////
  //////////////////////getting the City Names/////////////////
  //////////////////////////////////////////////////////////////

  CitiesNames : any = []

  getCityNames(){
    this.http.get(environment.mallApiUrl+'getcity').subscribe(
      {
        next : value =>{
          this.CitiesNames = value;
        },
        error : error=>{
          console.log(error);
        }
      }
    )
  }
/////////////////////////////////////////////////////////////////////////



///////getting City Name for the table//////
  getCityName(id:any){

    var curcity = this.CitiesNames.find((e:any)=>{return e.cityID == id});
    return   curcity.cityName;
  }
//////////////////////////////////////////////




  searchtxt:any;
  btnType = "Save";
  curPartyId:any;
  partyType :any;
  partyName :any;
  partyCNIC :any;
  partyPhoneno:any;
  partyMobileno:any;
  City :any;
  partyAddress:any;
  description :any;
  bankName:any;
  bankAccountTitle:any;
  bankAccountNo:any;
  validate = true;


  partyData : any = [];


  getParty(){
    this.http.get(environment.mallApiUrl+'getparty').subscribe(
    {
      next:value =>{
        this.partyData = value;
        //console.log(value);
      
      },
      error: error=>{
        this.msg.WarnNotify('Error Occured While Loading Data')
        console.log(error);
      }        
      
      
    }
    )
  }


  saveParty(){
    if(this.partyType == "" || this.partyType == undefined){
      this.msg.WarnNotify("Select The Party Type");
    }else if(this.partyName == "" || this.partyName == undefined){
      this.msg.WarnNotify("Enter The Party Name");
      
    }else if(this.partyCNIC == "" || this.partyCNIC == undefined ){
      this.msg.WarnNotify("Enter Party CNIC")
    }else if(this.partyMobileno == "" || this.partyMobileno == undefined){
      this.msg.WarnNotify("Enter Party Mobile Number")
    }else if(this.City == "" || this.City == undefined){
      this.msg.WarnNotify("Select The City")
    }else if(this.partyAddress == "" || this.partyAddress == undefined){
      this.msg.WarnNotify("Enter The Party Address")
    }else if(this.description == "" || this.description == undefined){
    this.description = "-";
  }else if(this.partyCNIC.length < 15){
    this.msg.WarnNotify("Please Enter the Valid CNIC No.")
  }else if(this.partyMobileno.length < 12){
    this.msg.WarnNotify("Please Enter the Valid Mobile NO.")
  }else{

    if(this.btnType == "Save"){

      this.http.post(environment.mallApiUrl+'insertparty',{
        PartyType:this.partyType,
        PartyName:this.partyName,
        PartyAddress:this.partyAddress,
        PartyCNIC:this.partyCNIC,
        CityID:this.City,
        PartyMobileNo:this.partyMobileno,
        BankAccountTitle:this.bankAccountTitle,
        BankAccountNo:this.bankAccountNo,
        BankName:this.bankName,
        PartyDescription:this.description,
        UserID:this.globalData.getUserID(),
   
       }).subscribe(
         (Response:any)=>{
          if(Response.msg == 'Data Saved Successfully'){
            this.msg.SuccessNotify(Response.msg);
            this.getParty();
            this.reset();
          }else{
            // console.log(Response.msg);
            this.msg.WarnNotify(Response.msg);
          }
         }
       )
    }else if(this.btnType == 'Update'){
   
      this.http.post(environment.mallApiUrl+'updateparty',{
  
        PartyID:this.curPartyId,
        PartyType:this.partyType,
        PartyName:this.partyName,
        PartyAddress:this.partyAddress,
        PartyCNIC:this.partyCNIC,
        CityID:this.City,
        PartyMobileNo:this.partyMobileno,
        BankAccountTitle:this.bankAccountTitle,
        BankAccountNo:this.bankAccountNo,
        BankName:this.bankName,
        PartyDescription:this.description,
        UserID:this.globalData.getUserID(),
      }).subscribe(
        (Response:any)=>{
      
          if(Response.msg == 'Data Updated Successfully'){
            this.msg.SuccessNotify(Response.msg);
            this.getParty();
            this.reset();
          }else{
            
            this.msg.WarnNotify(Response.msg);
          }
         }
      )
    }
  }



  }

/////////////to Set CNIC Field Formate/////////////////
  setCnicData() {
    if (
      this.partyCNIC.length == 5 ||
      this.partyCNIC.length == 13
    ) {
      this.partyCNIC = this.partyCNIC + '-';
    }
  }

  ////////////////////to Set Phone No field Formate//////////////
  setPhoneno(){
    if(this.partyPhoneno.length == 3){
      this.partyPhoneno = this.partyPhoneno + '-';
    } 
  }

  ////////////Mobile no field formate//////////////////////////
  mobileNoFormate(){
    if(this.partyMobileno.length == 4){
      this.partyMobileno = this.partyMobileno + '-';
    }
  }


  editParty(item:any){

    this.curPartyId = item.partyID;
    
    this.partyType = item.partyType;
    this.partyName = item.partyName;
    this.partyCNIC = item.partyCNIC;
    this.partyMobileno = item.partyMobileNo;
    this.bankName = item.bankName;
    this.bankAccountTitle= item.bankAccountTitle;
    this.bankAccountNo =item.bankAccountNo;
   
    this.partyAddress = item.partyAddress;
    this.City = item.cityID.toString();
    this.description = item.partyDescription;
    this.btnType = "Update";

  }

////////////////to Delete The Party/////////////////////////
  DeleteParty(row:any){

    Swal.fire({
      title:'Alert!',
      text:'Confirm to Delete the Data',
      position:'center',
      icon:'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirm',
    }).then((result)=>{
      if(result.isConfirmed){

        //////on confirm button pressed the api will run
        this.http.post(environment.mallApiUrl+'deleteparty',{
          PartyID:row.partyID,
          deletedBy:this.globalData.getUserID(),
        }).subscribe(
         (Response:any)=>{
          if(Response.msg == 'Data Deleted Successfully'){
            this.msg.SuccessNotify(Response.msg);
            this.getParty();
            
          }else{
            this.msg.WarnNotify(Response.msg);
          }
         }
        )
      }
    });

   
  }





  reset(){
   this.partyType = '';
   this.partyName = '';
   this.partyCNIC = '';
   this.partyPhoneno = '';
   this.partyMobileno = '';
   this.City = '';
   this.bankAccountNo='';
   this.bankName='';
   this.bankAccountTitle='';
   this.partyAddress="";
   this.description = '';
   this.btnType = "Save";
  }


}
