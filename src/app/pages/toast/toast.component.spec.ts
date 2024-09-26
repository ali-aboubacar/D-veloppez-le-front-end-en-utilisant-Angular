import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RouterModule } from '@angular/router';
import { ToastComponent } from './toast.component';
import { ToastService } from 'src/app/_services/toast.service';
import { EventEmitter } from '@angular/core';
import { ToastEvent } from 'src/app/_interfaces/toast';

describe('LogoutComponent', () => {
  let component: ToastComponent;
  let fixture: ComponentFixture<ToastComponent>;
  let toastService: ToastService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ToastComponent],
      imports: [RouterModule.forRoot([])]
    });
    fixture = TestBed.createComponent(ToastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    toastService = TestBed.inject(ToastService);

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('initialisation des champs', () => {
    expect(component.message).toEqual('');
    expect(component.toastType).toEqual('info');
  });

  it('recupere toastEvent', () => {
    const data: ToastEvent = { message: 'test message', type: 'success' };

    (toastService.toastEvent as EventEmitter<ToastEvent>).emit(data);
    expect(component.message).toEqual(data.message);
    expect(component.toastType).toEqual(data.type);
  });
});
