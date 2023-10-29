import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { error } from 'jquery';
import { GlobalDataModule } from 'src/app/Shared/global-data/global-data.module';
import { NotificationService } from 'src/app/Shared/service/notification.service';
import { environment } from 'src/environments/environment.development';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-owner-profile',
  templateUrl: './owner-profile.component.html',
  styleUrls: ['./owner-profile.component.scss']
})
export class OwnerProfileComponent implements OnInit{
  constructor(private global:GlobalDataModule,
    private http:HttpClient,
    private msg:NotificationService
    ){

  }
 
    ngOnInit(){
      this.global.setHeaderTitle("Owner's Profile");
      this.getOwner();
      this.getCity();
    }
  


  PartyID:any;
  ownerName:any;
  cnic:any;
  CityID:any;
  mobileNo:any;
  accountTitle:any;
  bankName:any;
  address:any;
  description:any;
  accountNo:any;
  txtSearch:any;
  btntype ='Save';

  ownerData:any;
  citiesData:any;

  getCity(){
    this.http.get(environment.mallApiUrl+'getcity').subscribe({
      next:value=>{
        this.citiesData = value;
      },
      error:error=>{
        console.log(error);
      }
    })
  }


  getOwner(){
    this.http.get(environment.mallApiUrl+'getowner').subscribe(
      {
        next:value=>{
          this.ownerData = value;
          // console.log(value);
        },
        error:error=>{
          this.msg.WarnNotify('Error Occured while Loading Data');
          console.log(error);
        }
      }
    )
  }

  addOwner(){
    if(this.ownerName == '' || this.ownerName == undefined){
      this.msg.WarnNotify('Owner Name Required')
    }else if(this.cnic == '' || this.cnic == undefined){
      this.msg.WarnNotify('Owner CNIC Required')
    }else if(this.CityID == '' || this.CityID == undefined){
      this.msg.WarnNotify('City Name Required')
    }else if(this.mobileNo == '' || this.mobileNo == undefined){
      this.msg.WarnNotify('Mobile No Required')
    }else if(this.accountTitle == '' || this.accountTitle == undefined){
      this.msg.WarnNotify('Account Title Required')
    }else if(this.accountNo == '' || this.accountNo == undefined){
      this.msg.WarnNotify('Bank Account No. Required')
    }else if(this.address == '' || this.address == undefined){
      this.msg.WarnNotify('Address required')
    }else if(this.description == '' || this.description == undefined){
      this.description = '-';
    }else {
      if(this.btntype == 'Save'){
        this.http.post(environment.mallApiUrl+'insertparty',{
          PartyType:'Owner',
          PartyName:this.ownerName,
          PartyAddress:this.address,
          PartyCNIC:this.cnic,
          CityID:this.CityID,
          PartyMobileNo:this.mobileNo,
          BankAccountTitle:this.accountTitle,
          BankAccountNo:this.accountNo,
          BankName:this.bankName,
          PartyDescription:this.description,
          UserID:this.global.getUserID(),
        }).subscribe(
          (Response:any)=>{
            if(Response.msg == 'Data Saved Successfully'){
              this.msg.SuccessNotify(Response.msg);
              this.reset();
              this.getOwner();
            }else{
              this.msg.WarnNotify(Response.msg);
            }
          }
        )
      }else if(this.btntype == 'Update'){
        this.updateOwner();
      }
    }
   
  }

  updateOwner(){
    this.http.post(environment.mallApiUrl+'updateparty',{
      partyID:this.PartyID,
      PartyType:'Owner',
      PartyName:this.ownerName,
      PartyAddress:this.address,
      PartyCNIC:this.cnic,
      CityID:this.CityID,
      PartyMobileNo:this.mobileNo,
      BankName:this.bankName,
      BankAccountTitle:this.accountTitle,
      BankAccountNo:this.accountNo,
      PartyDescription:this.description,
      UserID:this.global.getUserID(),
    }).subscribe(
      (Response:any)=>{
        if(Response.msg == 'Data Updated Successfully'){
          this.msg.SuccessNotify(Response.msg);
          this.reset();
          this.getOwner();
        }else{
          this.msg.WarnNotify(Response.msg);
        }
      }
    )
  }

  editOwner(row:any){
    this.PartyID=row.partyID;
    this.ownerName = row.partyName;
    this.cnic=row.partyCNIC;
    this.CityID=row.cityID;
    this.mobileNo=row.partyMobileNo;
    this.bankName = row.bankName;
    this.accountTitle=row.bankAccountTitle;
    this.address=row.partyAddress;
    this.description=row.partyDescription;
    this.accountNo=row.bankAccountNo;
    
    this.btntype ='Update';
  }


  deleteOwner(row:any){
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
          UserID:this.global.getUserID(),
        }).subscribe(
          (Response:any)=>{
            if(Response.msg == 'Data Deleted Successfully'){
              this.msg.SuccessNotify(Response.msg);
              this.getOwner();
            }else{
              this.msg.WarnNotify(Response.msg);
            }
          }
        )
      }
    });

    
  }

  reset(){
    this.PartyID='';
    this.ownerName='';
    this.cnic='';
    this.CityID='';
    this.mobileNo='';
    this.accountTitle='';
    this.address='';
    this.description='';
    this.accountNo='';
    this.bankName='';
    this.btntype ='Save';
  }


  /////////////to Set CNIC Field Formate/////////////////
  setCnicData() {
    if (
      this.cnic.length == 5 ||
      this.cnic.length == 13
    ) {
      this.cnic = this.cnic + '-';
    }
  }

  ////////////////////to Set Phone No field Formate//////////////
  // setPhoneno(){
  //   if(this.partyPhoneno.length == 3){
  //     this.partyPhoneno = this.partyPhoneno + '-';
  //   } 
  // }

  ////////////Mobile no field formate//////////////////////////
  mobileNoFormate(){
    if(this.mobileNo.length == 4){
      this.mobileNo = this.mobileNo + '-';
    }
  }


}
