import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoaformComponent } from './Components/coaform/coaform.component';
import { DashBoardComponent } from './Components/dash-board/dash-board.component';
import { VoucherformComponent } from './Components/voucherform/voucherform.component';
import { LedgerComponent } from './Reports/ledger/ledger.component';
import { TrialBalanceComponent } from './Reports/trial-balance/trial-balance.component';
import { PlstatComponent } from './Reports/plstat/plstat.component';
import { BsstatComponent } from './Reports/bsstat/bsstat.component';
import { MainPageComponent } from './Components/main-page/main-page.component';
import { LoginComponent } from './login/login.component';



const routes: Routes = [
  {path:'', redirectTo:'login',pathMatch: 'full' },
  {path:'login', component:LoginComponent },
  {path:'main', loadChildren:()=> import('./Components/main/main.module').then((m)=>m.MainModule)}
 

  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  
  exports: [RouterModule,
   ]
})
export class AppRoutingModule { }