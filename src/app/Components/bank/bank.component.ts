import { HttpClient, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { error, valHooks } from 'jquery';
import { GlobalDataModule } from 'src/app/Shared/global-data/global-data.module';
import { NotificationService } from 'src/app/Shared/service/notification.service';
import { environment } from 'src/environments/environment.development';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-bank',
  templateUrl: './bank.component.html',
  styleUrls: ['./bank.component.scss']
})
export class BankComponent implements OnInit{

  constructor(private globalData:GlobalDataModule,
    private http:HttpClient,
    private msg:NotificationService){

  }



  ngOnInit(): void {
    this.globalData.setHeaderTitle('Add Bank');
    this.getBank();
  }




  btntype='Save';  /// for save and updata button
  progressbar=false;


  txtSearch:any;  //for search field
  bankID:any;
  bankName:any;
  accTitle:any;
  accountNumber:any;
  branchName:any;
  branchCode:any;
  bankAddress:any;
  accountCode:any;
  description:any;

  bankData:any;  //// for getting bank response data from api



  ////////////////////will get all bank data
  getBank(){
    this.http.get(environment.mallApiUrl+'getbank').subscribe({
      next:value=>{
        this.bankData = value;
        // console.log(value);
      },
      error:error=>{
        console.log(error);
        this.msg.WarnNotify("Error Occured While Loading Data");
        
      }
    })
  }


  addBank(){
    if(this.bankName == '' || this.bankName == undefined){
      this.msg.WarnNotify("Bank Name Required");
    }else if(this.accTitle == '' || this.accTitle == undefined){
      this.msg.WarnNotify("Account Title Required")
    }else if(this.accountNumber == '' || this.accountNumber == undefined){
      this.msg.WarnNotify('Account Number Requird')
    }else if(this.branchName == '' || this.branchName == undefined){
      this.msg.WarnNotify('Branch Name Required')
    }else if(this.branchCode == '' || this.branchCode == undefined){
      this.msg.WarnNotify('Branch Code Required')
    }else if(this.accountCode == '' || this.accountCode == undefined){
      this.msg.WarnNotify('Account Code Required')
    }else if(this.bankAddress == '' || this.bankAddress == undefined){
      this.msg.WarnNotify('Bank Address Required')
    }else if(this.description == '' || this.description == undefined){
      this.description = '-';
    }else{
      if(this.btntype == 'Save'){
        this.http.post(environment.mallApiUrl+'InsertBank',{
          BankName: this.bankName,
         BankAlias: '-',
        BankAccountTitle: this.accTitle,
        BankAccountNo: this.accountNumber,
        BranchName: this.branchName,
        BranchCode: this.branchCode,
        BankAddress: this.bankAddress,
        BankDescription: this.description,
        COACode: this.accountCode,
        UserID: this.globalData.getUserID(),
        }).subscribe(
          
          
          (response:any)=>{
            if(response.msg == 'Data Saved Successfully'){
              this.msg.SuccessNotify(response.msg)
              this.getBank();
              this.reset();
              
            }else if(response.msg == 'Account Number Already Exist'){
              this.msg.SuccessNotify(response.msg);
            }
    
          
          },
          (error:any)=>{
            this.msg.WarnNotify(error);
            console.log(error);
          }
          
         
        
        );
      }else if(this.btntype == "Update"){
     
       this.updateBank();
      }
    }
  
    
  }


  /////////////////////for updating Bank will be called in add bankFunction////////////////
  updateBank(){
    this.http.post(environment.mallApiUrl+'UpdateBank',{
      bankID:this.bankID,
      BankName: this.bankName,
         BankAlias: '-',
        BankAccountTitle: this.accTitle,
        BankAccountNo: this.accountNumber,
        BranchName: this.branchName,
        BranchCode: this.branchCode,
        BankAddress: this.bankAddress,
        BankDescription: this.description,
        COACode: this.accountCode,
        UserID: this.globalData.getUserID(),
      
    }).subscribe(
      (Response:any)=>{
        if(Response.msg == 'Data Updated Successfully'){
          this.msg.SuccessNotify(Response.msg);
          this.reset();
          this.getBank();
        }else {
          this.msg.WarnNotify(Response.msg);
        }
      }
    )


  }
 

  editBank(row:any){
    this.bankID = row.bankID;
    this.bankName = row.bankName;
    this.accTitle = row.bankAccountTitle;
    this.accountNumber = row.bankAccountNo;
    this.branchName = row.branchName;
    this.branchCode = row.branchCode;
    this.accountCode = row.coaCode;
    this.bankAddress = row.bankAddress;
    this.description = row.bankDescription;
    this.btntype = 'Update';
  }




  ///////////////////Delete fuction to delete the selected row////////////////////
  DeleteBank(row:any){


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
        this.http.post(environment.mallApiUrl+'DeleteBank',{
          BankID : row.bankID,
          UserID: this.globalData.getUserID(),
        }).subscribe(
          (Response:any)=>{
            
            if(Response.msg == 'Data Deleted Successfully'){
              this.msg.SuccessNotify(Response.msg);
              this.getBank();
            }else if(Response.msg == 'Unable to Delete'){
              this.msg.WarnNotify(Response.msg);
            }
          },
          (error:any)=>{
            this.msg.WarnNotify("Error Occured While Deleting Data");
            console.log(error);
          }
        )
      }
    });

    
  }


  reset(){
   this.txtSearch ='';
   this.bankID='';
   this.bankName='';
   this.accTitle='';
   this.accountNumber='';
   this.branchName='';
   this.branchCode='';
   this.bankAddress='';
   this.accountCode='';
   this.description='';
   this.btntype = 'Save';
   

  }

}
