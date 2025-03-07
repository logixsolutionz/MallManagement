import { Component, OnInit } from '@angular/core';
import { GlobalDataModule } from 'src/app/Shared/global-data/global-data.module';

import { environment } from 'src/environments/environment.development';

import { HttpClient,HttpClientModule,HttpErrorResponse } from '@angular/common/http';
import { data, error } from 'jquery';
import { NotificationService } from 'src/app/Shared/service/notification.service';

import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';
import { ChangePinComponent } from './change-pin/change-pin.component';




@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit{
  constructor(private globalData:GlobalDataModule,
    private http : HttpClient,
    private msg:NotificationService,
    private dialogue:MatDialog
    ){}
  ngOnInit(): void {
    this.globalData.setHeaderTitle('Add User');
    this.getUserData();
    this.getMenu();
  }

  txtSearch='';

  btntype = 'Save';
  uName: String = '';
  loginName: String = '';
  uPassword: String = '';
  confirmPassword : String = '';
  uId = '';
  uContact:any;
  uRoleID:any;
  uPinCode:any;
  userID:any;

  disablePin = false;


  selectedMenu:any = [];

   userData:any = [];
   progressbar = false;


  menuList:any=[];

   roleList:any=[
    {title:'Administrator',id:1},
    {title:'Admin',id:2},
    {title:'User',id:3}
   ]

 

  getUserData(){
    this.http.get(environment.mallApiUrl+'getuser').subscribe(
      (Response)=>{
        
        this.userData = Response;
      }
    )
  }

  ///////////////////////////////////

  addUser(){
    // var currentUser = this.userData.find((e :any)=>{return e.UserEmail == this.uEmail });

    var menuStatus = false;

    this.menuList.forEach((e:any) => {
      if(e.selectStatus == true){
        menuStatus =  true;
      }
    });
   
      if(this.uName == '' || this.uName == undefined)
      {
          this.msg.WarnNotify('Enter UserName');
      }else if(this.loginName == '' || this.loginName == undefined){
        this.msg.WarnNotify('Enter Email Address');
      }else if(this.uContact == '' || this.uContact == undefined){
        this.msg.WarnNotify('Enter User Contact');
      }else if(this.uRoleID == '' || this.uRoleID == undefined){
        this.msg.WarnNotify('Select User Role')
      }
      else if(this.uPassword == '' || this.uPassword == undefined){
        this.msg.WarnNotify('Enter Password')
      }else if(this.confirmPassword == '' || this.confirmPassword == undefined){
        this.msg.WarnNotify('Enter Confirm Password')
      }else if(this.uPassword != this.confirmPassword){
        this.msg.WarnNotify('Password Donot Match with Eachother');
      }else if(this.uPinCode == '' || this.uPinCode == undefined){
        this.msg.WarnNotify('Enter The Pin Code')
      }else if(menuStatus == false){
        this.msg.WarnNotify('Select Atleast One Menu');
       
      }
      else{
        

         if(this.btntype == 'Save'){
          this.insertUser();
         }else if(this.btntype == 'Update'){
          this.updateUser();
         }
      }

   
   
   
  }



  ///////////////////////////////////////////////


  insertUser(){
    
    this.http.post(environment.mallApiUrl+'insertuser',{
      UserName: this.uName,
      MobileNo: this.uContact,
      LoginName: this.loginName,
      Password: this.uPassword,
      PinCode: this.uPinCode,
      RoleID: this.uRoleID,
      MenuDetail:JSON.stringify(this.menuList),
      UserID: this.globalData.getUserID(),
    }).subscribe(
      (Response:any)=>{
        if(Response.msg == 'Data Saved Successfully'){
          this.msg.SuccessNotify(Response.msg);
          this.reset();
          this.getMenu();
          this.getUserData();
          
        }else{
          this.msg.WarnNotify(Response.msg);
        }
      }
    )
  }


  /////////////////////////////////////////////

  updateUser(){
    this.http.post(environment.mallApiUrl+'updateuser',{
      UserName: this.uName,
      MobileNo: this.uContact,
      LoginName: this.loginName,
      Password: this.uPassword,
      PinCode: this.uPinCode,
      RoleID: this.uRoleID,
      MenuDetail:JSON.stringify(this.menuList),
      UserID: this.userID,
      reqUserID: this.globalData.getUserID()
    }).subscribe(
      (Response:any)=>{
        if(Response.msg == 'Data Updated Successfully'){
          this.msg.SuccessNotify(Response.msg);
          this.reset();
          this.getUserData();
          this.getMenu();
          
        }else{
          this.msg.WarnNotify(Response.msg);
        }
      }
    )
  }

  
  ////////////////////////////////////////////////

  delUser(item:any){
    this.http.post(environment.mallApiUrl+'deleteuser',{
      UserID:item.userID,
    }).subscribe(
      (Response:any)=>{
        if(Response.msg == 'Data Deleted Successfully'){
          this.msg.SuccessNotify(Response.msg);
          this.reset();
          
        }else{
          this.msg.WarnNotify(Response.msg);
        }
      }
    )
  }


  ////////////////////////////////////////////////

  blockUser(item:any){


    Swal.fire({
      title:'Alert!',
      text:'Confirm to Block User',
      position:'center',
      icon:'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirm',
    }).then((result)=>{
      if(result.isConfirmed){

        //////on confirm button pressed the api will run
        this.http.post(environment.mallApiUrl+'blockuser',{
          TempBlock:true,
          UserID: item.userID,
        }).subscribe(
          (Response:any)=>{
            if(Response.msg == 'Data Updated Successfully'){
              this.msg.SuccessNotify(Response.msg);
              this.getUserData();
              this.getMenu();
            }else{
              this.msg.WarnNotify(Response.msg)
            }
          }
        )
      }
    });

    
  }


  ////////////////////////////////////////////////

  unBlockUser(item:any){


    Swal.fire({
      title:'Alert!',
      text:'Confirm to UnBlock User',
      position:'center',
      icon:'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirm',
    }).then((result)=>{
      if(result.isConfirmed){

        //////on confirm button pressed the api will run
        this.http.post(environment.mallApiUrl+'blockuser',{
          TempBlock:false,
          UserID: item.userID,
        }).subscribe(
          (Response:any)=>{
            if(Response.msg == 'Data Updated Successfully'){
              this.msg.SuccessNotify(Response.msg);
              this.getUserData();
              this.getMenu();
            }else{
              this.msg.WarnNotify(Response.msg)
            }
          }
        )
      }
    });

    
  }

  /////////////////////////////////////////////////

  resetPin(item:any){

    Swal.fire({
      title:'Alert!',
      text:'Confirm to Reset Pin',
      position:'center',
      icon:'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirm',
    }).then((result)=>{
      if(result.isConfirmed){

        //////on confirm button pressed the api will run
        this.http.post(environment.mallApiUrl+'resetpin',{
          UserID: item.userID,
          reqUserID: this.globalData.getUserID(),
        }).subscribe(
        (Response:any)=>{
          if(Response.msg == 'Data Updated Successfully'){
            this.msg.SuccessNotify(Response.msg);
            this.getUserData();
    
          }else{
            this.msg.WarnNotify(Response.msg);
          }
        }
        )
      }
    });

    
  }


  ////////////////////////////////////

  getMenu(){
    this.http.get(environment.mallApiUrl+'getmenu').subscribe(
      (Response)=>{
        // console.log(Response);
        this.menuList = Response;
      }
    )
  }


  ///////////////////////////////////
  changeStatus(item:any){

    if(item.selectStatus == false){
      item.selectStatus = true;
    }else{
      item.selectStatus = false;
    }


  }


  


  /////////////////////////////////

  EditUser(row:any){

    this.uName = '';
    this.loginName = '';
    this.uContact = '';
    this.uPassword = '';
    this.confirmPassword = '';
    this.uRoleID = '';
    this.uPinCode = '';
    this.btntype = '';
    this.userID = '';
    this.disablePin = false;

    this.menuList.forEach((e:any) => {
          
      e.selectStatus = false;

    });


    ///////////////////////////////////////
    
    this.uName = row.userName;
    this.loginName = row.loginName;
    this.uContact = row.mobileNo;
    this.uPassword = atob(atob(row.password));
    this.confirmPassword = atob(atob(row.password));
    this.uRoleID = row.roleID;
    this.uPinCode = atob(atob(row.pinCode));
    this.btntype = 'Update';
    this.userID = row.userID;
    this.disablePin = true;

    this.http.get(environment.mallApiUrl+'getusermenu?userid='+row.userID).subscribe(
      (Response:any)=>{
        Response.forEach((e:any) => {
          
          this.menuList.forEach((m:any)=>{
            if(e.menuID == m.menuID){
              m.selectStatus = true;
            }
          })

        });
      }
    )

  }


  //////////////////////////
  deleteUser(id:any){
    Swal.fire({
      title:'Alert!',
      text:'Confirm to Delete the User',
      position:'center',
      icon:'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirm',
    }).then((result)=>{
      if(result.isConfirmed){
        
       if(id == this.globalData.getUserID()){
        Swal.fire('Alert!',
        'Unable To Delete this User'
)

       }else{
        
        this.http.put(environment.apiUrl+'api/user/DeleteUser?id='+id,{ 
          UserID: this.globalData.getUserID(),
          
        }).subscribe((value:any)=>{
          console.log(value);
          this.getUserData();
            this.reset();
            Swal.fire('Deleted!',
                  'User has Been Deleted'
        );
        })
       }
      }
    });
    
    
  }

 

 ////////////Mobile no field formate//////////////////////////
 mobileNoFormate(){
  if(this.uContact.length == 4){
    this.uContact = this.uContact + '-';
  }
}


///////////////////////////////////////

 changePin(row:any){
  this.dialogue.open(ChangePinComponent,{
    width:"40%",
    data:row,
  

  }).afterClosed().subscribe(val=>{
    
    if(val == 'Update'){
     this.getUserData();
    }
  })
 }

/////////////////////////////////////////////

  reset(){
    this.uName='';
    this.loginName='';
    this.uPassword='';
    this.confirmPassword='';
    this.btntype= 'Save';
    this.uPinCode = '';
    this.uRoleID = '';
    this.userID= '';
    this.disablePin = false;
    this.uContact = '';
    
    this.menuList.forEach((e:any)=>{
      e.selectStatus = false;
    })
  }



}
