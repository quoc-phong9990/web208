import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-edit',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './product-edit.component.html',
  styleUrl: './product-edit.component.css'
})
export class ProductEditComponent {
  constructor(private http: HttpClient,private route:ActivatedRoute){

  }
  category:any;
    productForm = new FormGroup({
        name:new FormControl('',[Validators.required]),
        price: new FormControl('',[Validators.required]),
        cate_id:new FormControl(1,Validators.required),
        image: new FormControl('',[Validators.required]),
        detail: new FormControl('')
    });
    mess = '';
    id = this.route.snapshot.params['id'];
    product:any={id:"",name:""};
    onSubmit(){
        let data = {
          name: this.productForm.controls.name.value,
          price: this.productForm.controls.price.value,
          cate_id: this.productForm.controls.cate_id.value,
          image: this.productForm.controls.image.value,
          detail: this.productForm.controls.detail.value
        }
        this.http.put('http://localhost:3000/products/'+this.id,data).subscribe((data:any) =>{
            if (data.id!==''){
                this.mess = 'Cập nhật thành công';
            }  
            else{
              this.mess = 'Đăng không thành công';
            }
        });
        
    }
    ngOnInit() {
      this.getCategory(); 
      this.getProductByID(this.id);
      console.dir(this.route)
    }
    getCategory(){
      this.http.get('http://localhost:3000/categories').subscribe((data:any) =>{
            this.category = data;         
      });
    }
    getProductByID(id:any){
      this.http.get('http://localhost:3000/products/'+id).subscribe((data:any) =>{
            this.product = data;  
            this.productForm.setValue({
              name: data.name,
              price: data.price,
              cate_id: data.cate_id,
              image: data.image,
              detail: data.detail
            })
                   
      });
    }
}
