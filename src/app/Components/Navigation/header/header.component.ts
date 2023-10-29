import { Component,EventEmitter, OnInit, Output  } from '@angular/core';
import { AppComponent } from 'src/app/app.component';

import { MainPageComponent } from '../../main-page/main-page.component';
import { GlobalDataModule } from 'src/app/Shared/global-data/global-data.module';
import { Router } from '@angular/router';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Output() toggleMySideBar : EventEmitter<any> = new EventEmitter();
  constructor(private app:AppComponent,
    private m :MainPageComponent,
    private globalData : GlobalDataModule,
    private route:Router
    ) { 
    
  }
   title = 'Title';
   UserName = '';

  ngOnInit():void {
    // this.reload();
    
   
    
    this.globalData.header_title$.subscribe((str:string)=>{this.title = str});
    // setTimeout(() => {
    //   this.UserName = '';
    //   this.UserName = this.globalData.setUserName();
    // }, 1000);

    this.UserName = this.globalData.getUserName().toUpperCase();

    

  }

  reload(){
    location.reload();
  }
 
  
  Menu = "menu";

  toggleSideBar(){
    this.toggleMySideBar.emit(); 
    this.log();
  }

  log(){

    if(this.m.sideBarOpen == true){
      this.Menu = "menu_open";
    }else{
      this.Menu = "menu";
    }
  }

  
  logout(){
    this.globalData.logout();
  }


}
