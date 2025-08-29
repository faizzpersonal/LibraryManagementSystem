import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FineEditComponent } from './fine-edit.component';

describe('FineEditComponent', () => {
  let component: FineEditComponent;
  let fixture: ComponentFixture<FineEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FineEditComponent]
    });
    fixture = TestBed.createComponent(FineEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
