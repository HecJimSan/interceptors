import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed, async } from '@angular/core/testing';
import { HttpErrorResponse, HttpRequest } from '@angular/common/http';

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
                CustomerService
            ],
        });
    }));

    beforeEach(() => {
        httpTestingController = TestBed.get(HttpTestingController);
        customerService = TestBed.get(CustomerService);
    });

    it('should return a valid customer when the response has been successful', () => {
        const customer: Customer = {
            name: 'pepe',
            description: 'My name is pepe',
        };

        customerService.getCustomer('customerId').subscribe(data =>
            expect(data).toBe(customer), fail
        );

        httpTestingController.expectOne((httpRequest: HttpRequest<{}>) => {
            expect(httpRequest.url).toBe('http://localhost:3005/customer/customerId');
            expect(httpRequest.method).toBe('GET');
            expect(httpRequest.body).toBeFalsy();
            return true;
        }).flush(customer);
    });

    it('should handle an error when the response is invalid', () => {
        customerService.getCustomer('customerId').subscribe(
            fail
            , (error: HttpErrorResponse) => {
                expect(error.status).toBe(400);
                expect(error.statusText).toBe('the format is wrong');
            }
        );

        httpTestingController.expectOne((httpRequest: HttpRequest<{}>) => {
            expect(httpRequest.url).toBe('http://localhost:3005/customer/customerId');
            expect(httpRequest.method).toBe('GET');
            expect(httpRequest.body).toBeFalsy();
            return true;
        }).error(new ErrorEvent('Not found'), { status: 400, statusText: 'the format is wrong' });
    });

    afterEach(() => {
        httpTestingController.verify();
    });

});
