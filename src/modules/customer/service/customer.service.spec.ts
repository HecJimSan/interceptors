import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed, async } from '@angular/core/testing';
import { HttpErrorResponse } from '@angular/common/http';

import { CustomerService } from './../service/customer.service';
import { Customer } from './../model/customer.model';

describe('CustomerService', () => {

    let customerService: CustomerService;
    let httpTestingController: HttpTestingController;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule
            ],
            providers: [
                CustomerService,
            ],
        });
    }));

    beforeEach(() => {
        httpTestingController = TestBed.get(HttpTestingController);
        customerService = TestBed.get(CustomerService);
    });

    it('should return a valid customer when the response has been successful', () => {
        const person: Customer = {
            name: 'pepe',
            description: 'My name is pepe',
        };

        customerService.getCustomer('any').subscribe(data =>
            expect(data).toBe(person), fail
        );

        const req = httpTestingController.expectOne('http://localhost:3005/customer/any');
        req.flush(person);
    });

    it('should handle the error', () => {

        const person: Customer = {
            name: 'pepe',
            description: 'My name is pepe',
        };

        customerService.getCustomer('any').subscribe(
            (data: Customer) => fail,
            (error: HttpErrorResponse) => {
                expect(error.status).toBe(400);
                expect(error.statusText).toBe('the format is wrong');
            }
        );

        const req = httpTestingController.expectOne('http://localhost:3005/customer/any');
        req.error(new ErrorEvent('bad request'), { status: 400, statusText: 'the format is wrong' });
    });

    afterEach(() => {
        httpTestingController.verify();
    });
});
