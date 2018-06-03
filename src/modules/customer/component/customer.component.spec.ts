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
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';

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
        HttpClientTestingModule
      ],
      providers: [
        CustomerService
      ]
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerComponent);
    component = fixture.componentInstance;
    nativeElement = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should contain customer blocks', () => {
    expect(nativeElement.querySelector(byDataQa('description'))).toBeTruthy();
    expect(nativeElement.querySelector('.customTextarea')).toBeTruthy();
    expect(nativeElement.querySelector(byDataQa('addCustomer'))).toBeTruthy();
    expect(nativeElement.querySelector('.center')).toBeTruthy();
  });

  it('should update the value when there is a key event on the textarea', () => {
    const textArea = nativeElement.querySelector(byDataQa('description'));
    textArea.value = 'any value';

    textArea.dispatchEvent(new Event('keyup'));
    fixture.detectChanges();

    expect(component.descriptionCustomer).toBe('any value');
  });

  describe('should use customerService and handle ', () => {

    it('a valid reposne', fakeAsync(() => {
      const person = {
        name: 'pepe',
        description: 'My name is pepe',
      };
      spyOn(component.customerService, 'getCustomer').and.returnValue(Observable.of(person));

      addCustomer();

      expect(component.customer.name).toBe('pepe');
      expect(component.customer.description).toBe('My name is pepe');
    }));

    it('an invalid reponse', fakeAsync(() => {
      const res = { status: 400, statusText: 'the format is wrong' };
      const errorObservable: ErrorObservable = ErrorObservable.create(new HttpErrorResponse(res));
      spyOn(component.customerService, 'getCustomer').and.returnValue(errorObservable);

      addCustomer();

      expect(component.customer.name).toBe('Error: 400');
      expect(component.customer.description).toBe('Error: 400');
    }));

    const addCustomer = () => {
      nativeElement.querySelector(byDataQa('addCustomer')).click();
      tick();
      fixture.detectChanges();
    };

  });

  const byDataQa = (dataQa) => {
    return '[data-qa="' + dataQa + '"]';
  };
});
