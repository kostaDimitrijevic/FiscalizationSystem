import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticalArrangementComponent } from './artical-arrangement.component';

describe('ArticalArrangementComponent', () => {
  let component: ArticalArrangementComponent;
  let fixture: ComponentFixture<ArticalArrangementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArticalArrangementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticalArrangementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
