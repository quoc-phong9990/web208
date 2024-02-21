import { Component, inject } from '@angular/core';
import { IMenu } from '../interface/Menu';
import {CommonModule} from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
@Component({
  selector: 'app-header-component',
  standalone: true,
  imports: [CommonModule,RouterLink,RouterLinkActive],
  templateUrl: './header-component.component.html',
  styleUrl: './header-component.component.css'
})
export class HeaderComponentComponent {
  constructor(){}
  router = inject(Router)
  cart:any;
  logout(){
    // console.log('logged out');
    localStorage.removeItem('login');   
    this.router.navigate(['login']);
  }
  ngOnInit(): void {
  }
  menus: IMenu[] = [
    {
      id:1,
      name:'Trang chủ',
      url:"/",
      parent:0
    },
    {
      id:2,
      name:'Giới thiệu',
      url:"dashboard",
      parent:0
    },
    {
      id:3,
      name:'Tin tức',
      url:"dashboard/product",
      parent:0
    },
    {
      id:4,
      name:'Sản phẩm',
      url:"trang-chu",
      parent:0
    },
    {
      id:5,
      name:'Liên hệ',
      url:"trang-chu",
      parent:0
    },
    {
      id:6,
      name:'Tin nội bộ',
      url:"trang-chu",
      parent:3
    },
    {
      id:7,
      name:'Tin xã hội',
      url:"trang-chu",
      parent:3
    }
  ];
  checkChildrent(mid:number){
    let check = false;
      for (let m of this.menus){
        if (m.parent == mid){
          check= true;
          break;
        }
      }
      return check;
  }
}
