import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-home-product-component',
  standalone: true,
  imports: [HttpClientModule,CommonModule,ReactiveFormsModule],
  templateUrl: './home-product-component.component.html',
  styleUrl: './home-product-component.component.css'
})
export class HomeProductComponentComponent {
   formfilter = new FormGroup({
    minprice: new FormControl(1),
    maxprice: new FormControl(10000)
   });
   products: any;
   httpClient = inject(HttpClient);
    ngOnInit() {
      let login = localStorage.getItem('login');
      console.log(login);
      
      this.getProudctData();
    }
   getProudctData(){
    this.httpClient.get('http://localhost:3000/products')
    .subscribe((response:any)=>{
        // console.log(response);
        this.products = response;
    })
   }
   onFilter(){   
    // let maxprice = (this.formfilter.controls.maxprice.value!==null)?this.formfilter.controls.maxprice.value:0
    let maxprice = this.formfilter.controls.maxprice.value??0; 
    // let maxprice = 10;
    let minprice =  this.formfilter.controls.minprice.value??0
    //Lấy toàn bộ danh sách sản phẩm
    this.httpClient.get('http://localhost:3000/products')
    .subscribe((response:any)=>{
        //Lọc sản phẩm theo điều kiện
        // console.log(response);
        // lấy giá trị max,min từ input
        
        const productfilter = response.filter((data:any)=>{
            return data.price>=minprice && data.price<=maxprice;
        })
        // console.log(productfilter);        
        this.products = productfilter;
    })
   }
   addToCart(pid:any,name:any,image:any,price:any){
    const product = {
      pid: pid,
      name:name,
      image:image,
      price:price,
      quantity:1
    }
      const cart = localStorage.getItem('cart');
      //Ktra tồn tại giỏ hàng hay không. nếu tồn tại thì cập nhật giỏ hàng. không thì khởi tạo giỏ hàng mới
      if (cart ==null){
        console.log(`chuwa tồn tại`);        
        localStorage.setItem('cart',JSON.stringify([product]));
      }
      else{
        console.log(`đã tồn tại`);
          // - Kiểm tra sản phẩm đã tồn tại trong giỏ hàng chưa.
          //  -  nếu có rồi thì chỉ thay đổi số lượng
          //  -  nếu chưa thì bổ sung thêm sản phẩm vào giỏ hàng
         const products = JSON.parse(cart);
         console.log(products);    
        let ktra = false;   
        let vitri = -1;
        for (let i = 0; i < products.length; i++){
           if (products[i].pid == pid){
            ktra=true;
            vitri = i;
           }
        }
        if (ktra){ // Sản phẩm xuất hiện tỏng giỏ hàng
          products[vitri].quantity = products[vitri].quantity+1;
        }
        else {
          products.push(product);
        }
        localStorage.setItem('cart',JSON.stringify(products));
      }    
   }
}
