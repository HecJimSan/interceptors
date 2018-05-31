import {
  async,
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
  inject } from '@angular/core/testing';

import { HttpModule } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { CustomerService } from './../service/customer.service';
import { Customer } from './../model/customer.model';
import { CustomerComponent } from './customer.component';

describe('CustomerComponent', () => {
  let component: CustomerComponent;
  let fixture: ComponentFixture<CustomerComponent>;
  let nativeElement: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        CustomerComponent
      ],
      imports: [
        HttpClientTestingModule,
      ],
      providers: [
        CustomerService
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerComponent);
    component = fixture.componentInstance;
    nativeElement = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain customer blocks', () => {
    expect(nativeElement.querySelector(byDataQa('description'))).toBeTruthy();
    expect(nativeElement.querySelector('.customTextarea')).toBeTruthy();
    expect(nativeElement.querySelector(byDataQa('addCustomer'))).toBeTruthy();
    expect(nativeElement.querySelector('.center')).toBeTruthy();
  });

  it('should save in the component the value coming from the textarea', () => {
    const textArea = nativeElement.querySelector(byDataQa('description'));
    textArea.value = 'any value';

    textArea.dispatchEvent(new Event('keyup'));
    fixture.detectChanges();

    expect(component.descriptionCustomer).toBe('any value');
  });

  it('should use customerService', fakeAsync(() => {
    expect(component.customerService).toBeTruthy();
    const person = {
      name: 'pepe',
      description: 'My name is pepe',
    };
    spyOn(component.customerService, 'getCustomer').and.returnValue(Observable.of(person));

    nativeElement.querySelector(byDataQa('addCustomer')).click();
    tick();
    fixture.detectChanges();

    expect(component.customer.name).toBe('pepe');
    expect(component.customer.description).toBe('My name is pepe');
  }));

  it('should handle error response', fakeAsync(() => {
    expect(component.customerService).toBeTruthy();
    const person = {
      name: 'pepe',
      description: 'My name is pepe',
    };
    spyOn(component.customerService, 'getCustomer').and.returnValue(Observable.of(person));

    nativeElement.querySelector(byDataQa('addCustomer')).click();
    tick();
    fixture.detectChanges();

    expect(component.customer.name).toBe('pepe');
    expect(component.customer.description).toBe('My name is pepe');
  }));

  const byDataQa = (dataQa) => {
    return '[data-qa="' + dataQa + '"]';
  };
});
