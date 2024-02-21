import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
    carts:any;
    total:any;
    ngOnInit() {
      this.carts = localStorage.getItem('cart');
      this.carts = JSON.parse(this.carts);
      this.totalCart();
    }
    onChange(pid:any,quantity:any){   
      let slg =  quantity.target.value;
      // console.log(slg);
      // có số lượng, có id sản phẩm => kiểm tra vị trí xuất hiện của sản phẩm trong giỏ hàng
      let vitri = -1;
        for (let i = 0; i < this.carts.length; i++){
           if (this.carts[i].pid == pid){
            vitri = i;
           }
        }        
        this.carts[vitri].quantity = Number(slg);
        localStorage.setItem('cart', JSON.stringify(this.carts));
        this.totalCart();
    }
    delCart(){
      localStorage.removeItem('cart');
    }
    DelProductInCart(pid:any){
      //Kiểm tra vị trí sản phẩm xuất hiện
      let vitri = -1;
      for (let i = 0; i < this.carts.length; i++){
         if (this.carts[i].pid == pid){
          vitri = i;
         }
      } 
      //Xóa sản phẩm tại vị trí mà nó xuất hiện
      this.carts.splice(vitri,1);
      // Đặt lại giá trị cho giỏ hàng
      localStorage.setItem('cart', JSON.stringify(this.carts));
      this.totalCart();
    }
    totalCart(){
      this.carts = localStorage.getItem('cart');
      this.carts = JSON.parse(this.carts);
      this.total = this.carts.reduce((total:any,value:any)=>{
        return total+=value.quantity*value.price;
      },0);
    }
}
