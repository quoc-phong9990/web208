import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,HttpClientModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent {
  constructor(private http:HttpClient){}
  formCheckout = new FormGroup({
      name: new FormControl('',Validators.required),
      address: new FormControl('',Validators.required),
      phone: new FormControl('',Validators.required)
  });
  carts:any;
  total:any;
  
  ngOnInit() {
    this.carts = localStorage.getItem('cart');
    this.carts = JSON.parse(this.carts);
    this.totalCart();
  }
  delCart(){
    localStorage.removeItem('cart');
  }
  totalCart(){
    this.carts = localStorage.getItem('cart');
    this.carts = JSON.parse(this.carts);
    this.total = this.carts.reduce((total:any,value:any)=>{
      return total+=value.quantity*value.price;
    },0);
  }
  mess="";
  onSubmit(){
      //Lấy thông tin người dùng đặt hàng
      const name = this.formCheckout.controls.name.value; // Lấy value trong ô input họ tên
      const address = this.formCheckout.controls.address.value;
      const phone = this.formCheckout.controls.phone.value;
      let status ="Đang xử lý";
      // console.log(this.carts);
      
      this.http.post('http://localhost:3000/orders',{name,address,phone,status}).subscribe((order:any) => {
          if(order.id!==null){
              const orderid = order.id;
              // tiến hành duyệt giỏ hàng và lưu vào data
              this.carts.map((data:any)=>{
                  let pid = data.pid;
                  let quantity = data.quantity;
                  let unit_price = data.quantity*data.price;
                  this.http.post('http://localhost:3000/order_details',{orderid,pid,quantity,unit_price}).subscribe((order_details:any) => {
                      if (order_details.id!==null){
                         this.mess = "Đặt hàng thành công";
                      
                        //  Xóa thông tin giỏ hàng
                        this.delCart();
                      }
                  })
              });
          }
      })
  }
}
