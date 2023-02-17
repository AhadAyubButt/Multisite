import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddwebsiteComponent } from './addwebsite.component';

describe('AddwebsiteComponent', () => {
  let component: AddwebsiteComponent;
  let fixture: ComponentFixture<AddwebsiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddwebsiteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddwebsiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
