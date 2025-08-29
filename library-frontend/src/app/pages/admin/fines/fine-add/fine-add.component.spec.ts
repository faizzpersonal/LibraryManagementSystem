import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FineAddComponent } from './fine-add.component';

describe('FineAddComponent', () => {
  let component: FineAddComponent;
  let fixture: ComponentFixture<FineAddComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FineAddComponent]
    });
    fixture = TestBed.createComponent(FineAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
