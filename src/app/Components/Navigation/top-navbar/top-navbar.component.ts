import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { GlobalDataModule } from 'src/app/Shared/global-data/global-data.module';
import { NotificationService } from 'src/app/Shared/service/notification.service';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-top-navbar',
  templateUrl: './top-navbar.component.html',
  styleUrls: ['./top-navbar.component.scss']
})
export class TopNavbarComponent implements OnInit{

constructor(private globalData:GlobalDataModule,
  private msg:NotificationService,
  private http:HttpClient,
  ){

}

  ngOnInit(): void {
    this.getMenu();
  }


    menuList:any;
  
  reporticon = 'arrow_drop_up';
  accountsDropDownIcon='arrow_drop_up';
  POSDropDownIcon='arrow_drop_up';
  ExpandPOS= false;
  ExpandAccounts = false;
  Expanded =  false;

  collapseReports(){
    this.Expanded = !this.Expanded;
    if(this.Expanded == true){
      this.reporticon = 'arrow_drop_down';
    }else{
      this.reporticon ='arrow_drop_up';
    }
  }
  collapseAccounts(){
    this.ExpandAccounts = !this.ExpandAccounts;
    if(this.ExpandAccounts == true){
      this.accountsDropDownIcon = 'arrow_drop_down';
    }else{
      this.accountsDropDownIcon ='arrow_drop_up';
    }
  }
  collapsePOS(){
    this.ExpandPOS = !this.ExpandPOS;
    if(this.ExpandPOS == true){
      this.POSDropDownIcon = 'arrow_drop_down';
    }else{
      this.POSDropDownIcon ='arrow_drop_up';
    }
  }




  getMenu(){
    this.http.get(environment.mallApiUrl+'getusermenu?userid='+this.globalData.getUserID()).subscribe(
      (Response:any)=>{
       this.menuList = Response;
      }
    )
  }


}
