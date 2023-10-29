import { HttpClient } from '@angular/common/http';
import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { MatTab, MatTabGroup } from '@angular/material/tabs';
import { GlobalDataModule } from 'src/app/Shared/global-data/global-data.module';
import { NotificationService } from 'src/app/Shared/service/notification.service';
import { AppComponent } from 'src/app/app.component';
import { environment } from 'src/environments/environment.development';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit{

  @ViewChild('toggleBtn')
  public toggleBtn!: ProductComponent;
 

@HostListener('dblclick', ['$event'])
clickEvent(event:any) {
event.srcElement.setAttribute('disabled', true);
}

  constructor(

    private globalData:GlobalDataModule,
    private http:HttpClient,
    private msg:NotificationService,
   
    ){}

  ngOnInit(): void {
    this.globalData.setHeaderTitle('Add Product');
    this.getCategory();
    this.getProductData();
    
    
  }


  Validation =true;
  actionBtn = 'Save';
  ProductsData:any;
  CategoriesList:any;
  SubCategoriesList:any;
  hide= true;
  ProductID:any;
  myCategoryID:any;
  mySubCategoryID:any;
  myProductName:any;
  myBarcodeType= 'auto';
  myBarcode:any;
  myBarcode1:any;
  myBarcode2:any;
  myBarcode3:any;
  myCostPrice:any;
  myCTCPrice:any;
  myWholeSalePrice:any;
  mySalePrice:any;
  myGst:number = 0;
  myUOM:any;
  myMaxLimit:any;
  myMinLimit:any;


  selectedTabIndex:any;
 
  //////////////////getting categories data/////////////////////////////
  getCategory(){
    this.http.get(environment.apiUrl+'api/productCategory/getcategory',{responseType:'json'}).subscribe({
      next:value=>{
        this.CategoriesList = value;
      },
      error:error=>{
        console.log(error);
      }
    })
  }



  ////////////////////////getting sub category with category id///////////////////////////////
  getSubCategory(){

    this.http.get(environment.apiUrl+'api/productSubCategory/getbycatgoryID?Id=' + this.myCategoryID).subscribe({
      next:value=>{
        
        this.SubCategoriesList = value;
      },
      error:error=>{
       
        console.log(error);
      }
    })
  }

  ////////////////////getting products list///////////////////////

  getProductData(){
    this.http.get(environment.apiUrl+'api/product/getproduct').subscribe({
      next:value=>{
        // console.log(value);
        this.ProductsData = value;
      },
      error:error=>{
        console.log(error);
      }
    })
  }



  /////////////////save product funciton////////////////////////
  insertProduct(){
    
    if(this.myCategoryID == '' || this.myCategoryID == undefined){
      this.msg.WarnNotify("Select Product Category");
    }else if(this.mySubCategoryID == '' || this.mySubCategoryID == undefined){
      this.msg.WarnNotify("Select Product SubCategory")
    }else if(this.myProductName == '' || this.myProductName == undefined){
      this.msg.WarnNotify("Enter Product Name");

    }
    else if(this.myBarcodeType == 'manual'){
      if(this.myBarcode == '' || this.myBarcode == undefined){
        this.msg.WarnNotify("Enter the Barcode");
      }else if (this.myBarcode3 != '' && this.myBarcode2 == ''){
        this.msg.WarnNotify("Enter the Barcode 2")
      }else if(this.myBarcode2 != '' && this.myBarcode1 == ''){
        this.msg.WarnNotify("Enter The Barcode 1");
      }
    }
      else if(this.myCostPrice == '' || this.myCostPrice == undefined){
      this.msg.WarnNotify('Enter the Product Cost Price')
    }else if(this.myCTCPrice == '' || this.myCTCPrice == undefined){
      this.msg.WarnNotify('Enter The CTC Price')
    }else if(this.myWholeSalePrice == '' || this.myWholeSalePrice == undefined){
      this.msg.WarnNotify("Enter The WholeSale Price")
    }else if(this.mySalePrice == '' || this.mySalePrice == undefined){
      this.msg.WarnNotify("Enter The Retail Price")
    }else if( this.myGst == undefined){
      this.msg.WarnNotify("Enter The GST")
    }else if(this.myUOM == '' || this.myUOM == undefined){
      this.msg.WarnNotify("Enter The UOM")
    }else if (this.myCostPrice == 0 ||this.myCostPrice == "" || this.myCostPrice >= this.myCTCPrice ){
      this.msg.WarnNotify("Cost Price is not Valid!")
    }else if (this.myCTCPrice == 0 || this.myCTCPrice == 0 || this.myCTCPrice >= this.myWholeSalePrice ){
      this.msg.WarnNotify ("CTC Price is not Valid!")
    }else if (this.myWholeSalePrice == 0 || this.myWholeSalePrice == "" || this.myWholeSalePrice >= this.mySalePrice){
      this.msg.WarnNotify("Whole sale Price is not Valid!")
    }else if(this.mySalePrice == 0 || this.mySalePrice == "" ){
      this.msg.WarnNotify("Sale Price is not Valid !")
    }else{
     
      ////////////// if the button type is save//////////////////////////
      if(this.actionBtn == 'Save'){
        this.http.post(environment.apiUrl+'api/product/insertproduct',{
          categoryID:this.myCategoryID,
          subCategoryID:this.mySubCategoryID,
          productName:this.myProductName,
          pBarcode:this.myBarcode,
          pBarcode1:this.myBarcode1,
          pBarcode2:this.myBarcode2,
          pBarcode3:this.myBarcode3,
          costPrice:this.myCostPrice,
          ctcPrice:this.myCTCPrice,
          salePrice:this.mySalePrice,
          wholeSalePrice:this.myWholeSalePrice,
          minLimit:this.myMinLimit,
          maxLimit:this.myMaxLimit,
          sectionID:this.globalData.currentUserValue.sectionID,
          gst:this.myGst,
          uom:this.myUOM,
          createdBy:this.globalData.getUserID(),
          
    
        },{responseType:'text'}).subscribe({
          next:value=>{
            if(value == 'Data Inserted Successfully'){
              this.msg.SuccessNotify(value);
              this.reset();
              this.getProductData();
            }else{
              this.msg.WarnNotify(value);
            }
          },
          error:error=>{
            console.log(error);
            this.msg.WarnNotify("Error Occured While Inserting Product");
          }
        })
      }
      ///////////////////////if the btn type will be update ////////////////////////
      else if(this.actionBtn == 'Update'){
        this.http.put(environment.apiUrl+'api/product/updateproduct?prodid='+this.ProductID,{
          categoryID:this.myCategoryID,
          subCategoryID:this.mySubCategoryID,
          productName:this.myProductName,
          pBarcode:this.myBarcode,
          pBarcode1:this.myBarcode1,
          pBarcode2:this.myBarcode2,
          pBarcode3:this.myBarcode3,
          costPrice:this.myCostPrice,
          ctcPrice:this.myCTCPrice,
          salePrice:this.mySalePrice,
          wholeSalePrice:this.myWholeSalePrice,
          minLimit:this.myMinLimit,
          maxLimit:this.myMaxLimit,
          sectionID:this.globalData.currentUserValue.sectionID,
          gst:this.myGst,
          uom:this.myUOM,
          modifiedBy:this.globalData.getUserID(),
          
    
        },{responseType:'text'}).subscribe({
          next:value=>{
            if(value == 'Product Updated Successfully'){
              this.msg.SuccessNotify(value);
              this.reset();
              this.getProductData();
            }else{
              this.msg.WarnNotify(value);
            }
          },
          error:error=>{
            console.log(error);
            this.msg.WarnNotify("Error Occured While Inserting Product");
          }
        })
      }  
    }     
  }


    //////////////// edit button fucntion/////////////////
    editProduct(row:any){

      this.ProductID = row.productID;
      this.myCategoryID = row.categoryID;
      this.getSubCategory();
      this.mySubCategoryID = row.subCategoryID;
      this.myProductName = row.productName;
      this.myBarcode = row.pBarcode;
      this.myBarcode1 = row.pBarcode1;
      this.myBarcode2 = row.pBarcode2;
      this.myBarcode3 = row.pBarcode3;
      this.myCostPrice = row.costPrice;
      this.myCTCPrice = row.ctcPrice;
      this.myWholeSalePrice = row.wholeSalePrice;
      this.mySalePrice = row.salePrice;
      this.myGst = row.gst;
      this.myUOM = row.uom;
      this.actionBtn = 'Update';
      // var index = this.tabGroup.selectedIndex;
      // console.log(index);
  
      // const selectedIndex = this.tabGroup.selectedIndex;
      // this.tabGroup.selectedIndex = selectedIndex === 1 ? 0 : 1;
        this.selectedTabIndex = 0;
  
    }

    
  
    deleteProduct(id:any){

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
          
          this.http.put(environment.apiUrl+'api/product/deleteproduct?id='+id,{},{
            responseType:'text'
          }).subscribe({
            next:value=>{
              if(value == 'Product deleted'){
                this.msg.SuccessNotify(value);
                this.getProductData();
                Swal.fire('Deleted!',
                  'Product has Been Deleted'
        );
              }else{
                this.msg.WarnNotify(value);
              }
            },
            error:error=>{
              console.log(error);
              this.msg.WarnNotify("Error Occured while Deleting Product");
            }
          })
         
        }
      });

      
    }





 


  //////////////////////////reset the fields//////////////////////
  reset(){
    this.myCategoryID='';
    this.mySubCategoryID='';
    this.myProductName = '';
    this.myBarcode='';
    this.myBarcode1='';
    this.myBarcode2='';
    this.myBarcode3='';
    this.myCostPrice='';
    this.myCTCPrice='';
    this.myWholeSalePrice='';
    this.mySalePrice= '';
    this.myGst = 0;
    this.myUOM = '';
    this.selectedTabIndex="";
  }
}
