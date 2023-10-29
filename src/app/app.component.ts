import { Component } from '@angular/core';
import { Router } from '@angular/router';







@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Mall Management';
constructor( private route:Router){}
  

  ngOnInit(){
    if(localStorage.getItem('curVal') == null || localStorage.getItem('curVal') == '' ){
      this.route.navigate(['']);
    }
  }


  startLoaderDark() {
    $(".loaderDark").show();
  }

  stopLoaderDark() {
    $(".loaderDark").fadeOut(500);
  }

  startLoaderLight() {
    $(".loaderLight").show();
    //$(".btnLoader").show();
  }

  stopLoaderLight() {
    $(".loaderLight").hide();
    //$(".btnLoader").hide(1000);
  }

  

}
