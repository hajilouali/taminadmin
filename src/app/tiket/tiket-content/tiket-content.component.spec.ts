import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TiketContentComponent } from './tiket-content.component';

describe('TiketContentComponent', () => {
  let component: TiketContentComponent;
  let fixture: ComponentFixture<TiketContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TiketContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TiketContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
