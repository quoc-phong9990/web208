import { Component } from '@angular/core';
import { SlideComponentComponent } from '../slide-component/slide-component.component';
import { HomeProductComponentComponent } from '../home-product-component/home-product-component.component';

@Component({
  selector: 'app-home-component',
  standalone: true,
  imports: [SlideComponentComponent,HomeProductComponentComponent],
  templateUrl: './home-component.component.html',
  styleUrl: './home-component.component.css'
})
export class HomeComponentComponent {

}
