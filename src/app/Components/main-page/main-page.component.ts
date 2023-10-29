import { Component, OnInit } from '@angular/core';
import { GlobalDataModule } from 'src/app/Shared/global-data/global-data.module';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {

  constructor(private global:GlobalDataModule,
    private route:Router){
    
  }
  sideBarOpen = false;

  ngOnInit(){
  
    
  }

  sideBarToggler(){
    this.sideBarOpen = !this.sideBarOpen;
  }

}
