import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeProductComponentComponent } from './home-product-component.component';

describe('HomeProductComponentComponent', () => {
  let component: HomeProductComponentComponent;
  let fixture: ComponentFixture<HomeProductComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeProductComponentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HomeProductComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
