import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { GlobalDataModule } from 'src/app/Shared/global-data/global-data.module';
import { NotificationService } from 'src/app/Shared/service/notification.service';
import { AppComponent } from 'src/app/app.component';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-owners-report',
  templateUrl: './owners-report.component.html',
  styleUrls: ['./owners-report.component.scss']
})
export class OwnersReportComponent implements OnInit{

  logo:any;
  logo1:any;
  companyName:any;
  companyName2:any;


  constructor(
    private http:HttpClient,
    private msg:NotificationService,
    private global:GlobalDataModule,
    private app:AppComponent
    
  ){}


  ngOnInit(): void {
  
    this.global.setHeaderTitle("list of Owner's")
    this.getOwner();
    this.logo = this.global.Logo;
    this.logo1 = this.global.Logo1;
    this.companyName = this.global.CompanyName;
    this.companyName2 = this.global.CompanyName2;

  }


  ownerData:any;

  getOwner(){
    this.app.startLoaderDark();
    this.http.get(environment.mallApiUrl+'getowner').subscribe(
      {
        next:value=>{
          this.ownerData = value;
          this.app.stopLoaderDark();
        },
        error:error=>{
          this.msg.WarnNotify('Error Occured while Loading Data');
          console.log(error);
          this.app.stopLoaderDark();  
        }
      }
    )
  }

  print(){
    this.global.printData('#printRpt');
  }

}
