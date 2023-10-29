import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HeaderComponent } from './Components/Navigation/header/header.component';
import { SideNavbarComponent } from './Components/Navigation/side-navbar/side-navbar.component';
import { VoucherformComponent } from './Components/voucherform/voucherform.component';
import { CoaformComponent } from './Components/coaform/coaform.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatFormFieldModule } from "@angular/material/form-field";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { DashBoardComponent } from './Components/dash-board/dash-board.component';
import { LedgerComponent } from './Reports/ledger/ledger.component';
import { TrialBalanceComponent } from './Reports/trial-balance/trial-balance.component';
import { PlstatComponent } from './Reports/plstat/plstat.component';
import { BsstatComponent } from './Reports/bsstat/bsstat.component';
import { ToastrModule } from 'ngx-toastr';
import { MainPageComponent } from './Components/main-page/main-page.component';
// import { FilterPipe } from './Shared/pipes/filter.pipe';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { LoginComponent } from './login/login.component';
import { PartyComponent } from './Components/party/party.component';
import { Subject } from 'rxjs/internal/Subject';
import { GlobalDataModule } from './Shared/global-data/global-data.module';
import { AddUserComponent } from './Components/add-user/add-user.component';
import { HttpClientModule } from '@angular/common/http';
import { NgCircleProgressModule } from 'ng-circle-progress';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { SettingsComponent } from './Components/settings/settings.component';
import { CityComponent } from './Components/settings/city/city.component';
import { MaterialModule } from './Shared/material/material.module';
import { AddcityformComponent } from './Components/settings/city/addcityform/addcityform.component';
import { ProductCategoryComponent } from './Components/settings/product-category/product-category.component';
import { AddProductCategoryComponent } from './Components/settings/product-category/add-product-category/add-product-category.component';
import { ProductSubcategoryComponent } from './Components/settings/product-subcategory/product-subcategory.component';
import { AddProductSubcategoryComponent } from './Components/settings/product-subcategory/add-product-subcategory/add-product-subcategory.component';
import { ProductComponent } from './Components/product/product.component';
import { SaleComponent } from './Components/sale/sale.component';
import { PurchaseComponent } from './Components/purchase/purchase.component';
import { TopNavbarComponent } from './Components/Navigation/top-navbar/top-navbar.component';
import { BankComponent } from './Components/bank/bank.component';
import { FloorComponent } from './Components/settings/floor/floor.component';
import { AddFloorComponent } from './Components/settings/floor/add-floor/add-floor.component';
import { ShopCategoryComponent } from './Components/settings/shop-category/shop-category.component';
import { AddShopCategoryComponent } from './Components/settings/shop-category/add-shop-category/add-shop-category.component';

import { CAMComponent } from './Components/settings/cam/cam.component';
import { AddCAMComponent } from './Components/settings/cam/add-cam/add-cam.component';
import { RentComponent } from './Components/settings/rent/rent.component';
import { AddRentComponent } from './Components/settings/rent/add-rent/add-rent.component';
import { ServicesComponent } from './Components/settings/services/services.component';
import { AddServicesComponent } from './Components/settings/services/add-services/add-services.component';
import { OwnerProfileComponent } from './Components/owner-profile/owner-profile.component';
import { ShopComponent } from './Components/shop/shop.component';
import { AddShopComponent } from './Components/shop/add-shop/add-shop.component';
import { MapShopComponent } from './Components/map-shop/map-shop.component';
import { MallSaleComponent } from './Components/mall-sale/mall-sale.component';
import { AddServiceComponent } from './Components/map-shop/add-shopservice/add-service.component';
import { UnmapShopComponent } from './Components/map-shop/unmap-shop/unmap-shop.component';
import { ShopBillComponent } from './Components/shop-bill/shop-bill.component';
import { BillformComponent } from './Components/shop-bill/billform/billform.component';
import { BillDetailsComponent } from './Components/shop-bill/bill-details/bill-details.component';
import { OwnersReportComponent } from './Reports/owners-report/owners-report.component';
import { ShopsReportComponent } from './Reports/shops-report/shops-report.component';
import { BillRptShopwiseComponent } from './Reports/bill-rpt-shopwise/bill-rpt-shopwise.component';
import { BillrptdatewiseComponent } from './Reports/billrptdatewise/billrptdatewise.component';
import { BillrptshopandpartywiseComponent } from './Reports/billrptshopandpartywise/billrptshopandpartywise.component';
import { CashbookComponent } from './Reports/cashbook/cashbook.component';
import { BillSupervisionComponent } from './Components/bill-supervision/bill-supervision.component';
import { CoaNotesComponent } from './Components/settings/coa-notes/coa-notes.component';
import { AddNoteComponent } from './Components/settings/coa-notes/add-note/add-note.component';
import { UpdateCoaComponent } from './Components/coaform/update-coa/update-coa.component';
import { BillReportMonthwiseComponent } from './Reports/bill-report-monthwise/bill-report-monthwise.component';
import { ChangePinComponent } from './Components/add-user/change-pin/change-pin.component';
import { ShopDetailOwnerWiseComponent } from './Reports/shop-detail-owner-wise/shop-detail-owner-wise.component';


import { ChartModule, HIGHCHARTS_MODULES } from 'angular-highcharts';
import * as more from 'highcharts/highcharts-more.src';
import * as exporting from 'highcharts/modules/exporting.src';
import { ListofCustomersComponent } from './Reports/listof-customers/listof-customers.component';
import { BudgettingComponent } from './Components/budgetting/budgetting.component';
import { BudgetReportComponent } from './Reports/budget-report/budget-report.component';
import { DailyTransactionRptComponent } from './Reports/daily-transaction-rpt/daily-transaction-rpt.component';
import { BillReportMnthPartyWiseComponent } from './Reports/bill-report-mnth-party-wise/bill-report-mnth-party-wise.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { AuthGuard } from './auth.guard';
import { NotificationService } from './Shared/service/notification.service';













@NgModule({
  declarations: [
    
    AppComponent,
    
    HeaderComponent,
    SideNavbarComponent,
    VoucherformComponent,
    CoaformComponent,
    DashBoardComponent,
    LedgerComponent,
    TrialBalanceComponent,
    PlstatComponent,
    BsstatComponent,
    MainPageComponent,
    LoginComponent,
    PartyComponent,
    AddUserComponent,
    SettingsComponent,
    CityComponent,
    AddcityformComponent,
    ProductCategoryComponent,
    AddProductCategoryComponent,
    ProductSubcategoryComponent,
    AddProductSubcategoryComponent,
    ProductComponent,
    SaleComponent,
    PurchaseComponent,
    TopNavbarComponent,
    BankComponent,
    FloorComponent,
    AddFloorComponent,
    ShopCategoryComponent,
    AddShopCategoryComponent,




    
  
    CAMComponent,
    AddCAMComponent,
    RentComponent,
    AddRentComponent,
    ServicesComponent,
    AddServicesComponent,
    OwnerProfileComponent,
    ShopComponent,
    AddShopComponent,
    MapShopComponent,
    MallSaleComponent,
    AddServiceComponent,
    UnmapShopComponent,
    ShopBillComponent,
    BillformComponent,
    BillDetailsComponent,
    OwnersReportComponent,
    ShopsReportComponent,
    BillRptShopwiseComponent,
    BillrptdatewiseComponent,
    BillrptshopandpartywiseComponent,
    CashbookComponent,
    BillSupervisionComponent,
    CoaNotesComponent,
    AddNoteComponent,
    UpdateCoaComponent,
    BillReportMonthwiseComponent,
    ChangePinComponent,
    ShopDetailOwnerWiseComponent,
    ListofCustomersComponent,
    BudgettingComponent,
    BudgetReportComponent,
    DailyTransactionRptComponent,
    BillReportMnthPartyWiseComponent,
    


 

    
   


    
    // FilterPipe,
    
  ],
  imports: [
    ChartModule,
    
    BrowserModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    ToastrModule.forRoot(), 
    Ng2SearchPipeModule,
    GlobalDataModule,
    HttpClientModule,
    NgCircleProgressModule.forRoot({
      // set defaults here
      radius: 100,
      outerStrokeWidth: 16,
      innerStrokeWidth: 8,
      outerStrokeColor: "#78C000",
      innerStrokeColor: "#C7E596",
      animationDuration: 300,
    }),
    MatProgressBarModule,
    NgxMatSelectSearchModule,
    MaterialModule,
    NgxPaginationModule
    
  

  ],
  providers: [{ provide: HIGHCHARTS_MODULES, useFactory: () => [ more, exporting ] },AuthGuard,NotificationService,GlobalDataModule],
  bootstrap: [AppComponent]
})
export class AppModule { 


}
