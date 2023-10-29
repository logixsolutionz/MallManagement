import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainModule } from './main.module';
import { CoaformComponent } from '../coaform/coaform.component';
import { DashBoardComponent } from '../dash-board/dash-board.component';
import { VoucherformComponent } from '../voucherform/voucherform.component';
import { LedgerComponent } from 'src/app/Reports/ledger/ledger.component';
import { TrialBalanceComponent } from 'src/app/Reports/trial-balance/trial-balance.component';
import { PlstatComponent } from 'src/app/Reports/plstat/plstat.component';
import { BsstatComponent } from 'src/app/Reports/bsstat/bsstat.component';
import { MainPageComponent } from '../main-page/main-page.component';
import { PartyComponent } from '../party/party.component';
import { AddUserComponent } from '../add-user/add-user.component';
import { SettingsComponent } from '../settings/settings.component';
import { ProductComponent } from '../product/product.component';
import { SaleComponent } from '../sale/sale.component';
import { PurchaseComponent } from '../purchase/purchase.component';
import { BankComponent } from '../bank/bank.component';
import { OwnerProfileComponent } from '../owner-profile/owner-profile.component';
import { ShopComponent } from '../shop/shop.component';
import { MapShopComponent } from '../map-shop/map-shop.component';
import { MallSaleComponent } from '../mall-sale/mall-sale.component';
import { ShopBillComponent } from '../shop-bill/shop-bill.component';
import { ShopsReportComponent } from 'src/app/Reports/shops-report/shops-report.component';
import { OwnersReportComponent } from 'src/app/Reports/owners-report/owners-report.component';
import { BillRptShopwiseComponent } from 'src/app/Reports/bill-rpt-shopwise/bill-rpt-shopwise.component';
import { BillrptdatewiseComponent } from 'src/app/Reports/billrptdatewise/billrptdatewise.component';
import { BillrptshopandpartywiseComponent } from 'src/app/Reports/billrptshopandpartywise/billrptshopandpartywise.component';
import { CashbookComponent } from 'src/app/Reports/cashbook/cashbook.component';
import { BillSupervisionComponent } from '../bill-supervision/bill-supervision.component';
import { BillReportMonthwiseComponent } from 'src/app/Reports/bill-report-monthwise/bill-report-monthwise.component';
import { ShopDetailOwnerWiseComponent } from 'src/app/Reports/shop-detail-owner-wise/shop-detail-owner-wise.component';
import { ListofCustomersComponent } from 'src/app/Reports/listof-customers/listof-customers.component';
import { BudgettingComponent } from '../budgetting/budgetting.component';
import { BudgetReportComponent } from 'src/app/Reports/budget-report/budget-report.component';
import { DailyTransactionRptComponent } from 'src/app/Reports/daily-transaction-rpt/daily-transaction-rpt.component';
import { BillReportMnthPartyWiseComponent } from 'src/app/Reports/bill-report-mnth-party-wise/bill-report-mnth-party-wise.component';
import { AuthGuard } from 'src/app/auth.guard';




const routes: Routes = [
  {path:'',component:MainPageComponent, children:[
    {path:'dashBoard', component:DashBoardComponent,canActivate:[AuthGuard] },
  { path: 'coa', component: CoaformComponent,canActivate:[AuthGuard] },
  {path:'voucher', component: VoucherformComponent,canActivate:[AuthGuard]},
  {path:'ldgrpt', component: LedgerComponent,canActivate:[AuthGuard]},
  {path:'tbrpt', component: TrialBalanceComponent,canActivate:[AuthGuard]},
  {path:'plrpt', component: PlstatComponent,canActivate:[AuthGuard]},
  {path:'bsrpt', component: BsstatComponent,canActivate:[AuthGuard]},
  {path:'party', component: PartyComponent,canActivate:[AuthGuard]},
  {path:'AddUser', component: AddUserComponent,canActivate:[AuthGuard]},
  {path:'Settings',component:SettingsComponent,canActivate:[AuthGuard]},
  // {path:'product',component:ProductComponent,canActivate:[AuthGuard]},
  // {path:'sale',component:SaleComponent,canActivate:[AuthGuard]},
  // {path:'purchase',component:PurchaseComponent,canActivate:[AuthGuard]},
  // {path:'bank',component:BankComponent,canActivate:[AuthGuard]},
  {path:'OwnerProfile',component:OwnerProfileComponent,canActivate:[AuthGuard]},
  {path:'shop',component:ShopComponent,canActivate:[AuthGuard]},
  {path:'mapshop',component:MapShopComponent,canActivate:[AuthGuard]},
  {path:'shopBill',component:ShopBillComponent,canActivate:[AuthGuard]},
  {path:'srptl',component:ShopsReportComponent,canActivate:[AuthGuard]},
  {path:'orptl',component:OwnersReportComponent,canActivate:[AuthGuard]},
  {path:'BRptSW',component:BillRptShopwiseComponent,canActivate:[AuthGuard]},
  {path:'BRptDW',component:BillrptdatewiseComponent,canActivate:[AuthGuard]},
  {path:'BRptS&PW',component:BillrptshopandpartywiseComponent,canActivate:[AuthGuard]},
  {path:'CBRpt',component:CashbookComponent,canActivate:[AuthGuard]},
  {path:'spvsn',component:BillSupervisionComponent,canActivate:[AuthGuard]},
  {path:'SBRptMW',component:BillReportMonthwiseComponent,canActivate:[AuthGuard]},
  {path:'SRptOW',component:ShopDetailOwnerWiseComponent,canActivate:[AuthGuard]},
  {path:'rptcust',component:ListofCustomersComponent,canActivate:[AuthGuard]},
  {path:'bdgtng',component:BudgettingComponent,canActivate:[AuthGuard]},
  {path:'bdgtrpt',component:BudgetReportComponent,canActivate:[AuthGuard]},
  {path:'Dtranrpt',component:DailyTransactionRptComponent,canActivate:[AuthGuard]},
  {path:'brptmp',component:BillReportMnthPartyWiseComponent,canActivate:[AuthGuard]},
  {path:'', redirectTo:'/main/dashBoard',pathMatch:'full'}
  ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
