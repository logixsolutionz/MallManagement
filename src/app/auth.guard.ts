import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { GlobalDataModule } from './Shared/global-data/global-data.module';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
 
  constructor(private router:Router,
    private global:GlobalDataModule,
    private http:HttpClient){

    
  }

   curComponent:any;


  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot)  {

    
    
    this.http.get(environment.mallApiUrl+'getusermenu?userid='+this.global.getUserID()).subscribe(
      (Response:any)=>{
      
        this.curComponent =  Response.find((e:any)=>e.pageLink == route.url[0].path.toString());
        // console.log(this.curComponent);

        if(this.curComponent != undefined){
     
          return true;      
        }else{
          //this.router.navigate(['main/'+Response[0].pageLink]);
          this.global.logout();
          return false;
        }
        
        
        
      }
    )

    return true;

      
    
  }

  
  
  
  
}
