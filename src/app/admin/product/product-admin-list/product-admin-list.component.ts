import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-product-admin-list',
  standalone: true,
  imports: [],
  templateUrl: './product-admin-list.component.html',
  styleUrl: './product-admin-list.component.css'
})
export class ProductAdminListComponent {
    constructor(private http:HttpClient){}
    products:any;
    ngOnInit(){
      this.getAllProduct();
    }
    getAllProduct(){
        this.http.get('http://localhost:3000/products').subscribe((response)=>{
         this.products = response;
        });
    }
    handleDelProduct(pid:any){
      if (confirm('Bạn muốn xóa sản phẩm này?')){
      this.http.delete('http://localhost:3000/products/'+pid).subscribe((response)=>{
        this.products = response;
        this.getAllProduct();
       }); 
      }       
    }
}
