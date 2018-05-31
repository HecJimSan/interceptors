import {
    async,
    TestBed } from '@angular/core/testing';

import {
    HttpTestingController,
    HttpClientTestingModule,
    TestRequest } from '@angular/common/http/testing';

import {
    HttpClient,
    HttpRequest,
    HTTP_INTERCEPTORS,
    HttpErrorResponse } from '@angular/common/http';

import { error } from 'util';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { CustomerInterceptor } from './customer.interceptor';
import { Customer } from '../../../modules/customer';

describe('CustomerInterceptor', () => {

    let httpTestingController: HttpTestingController;
    let httpClient: HttpClient;
    let subscription: Subscription;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule
            ],
            providers: [
                {
                    provide: HTTP_INTERCEPTORS,
                    useClass: CustomerInterceptor,
                    multi: true
                }
            ],
        });
    }));

    beforeEach(() => {
        httpTestingController = TestBed.get(HttpTestingController);
        httpClient = TestBed.get(HttpClient);
    });

    it('should add Authorization token in the request and dont do anything in the response', () => {
        const body: Customer = new Customer();
        body.name = 'Hector';
        body.description = 'My name is Hector';

        subscription = httpClient.get<Customer>('customer').subscribe((response: Customer) => {
            expect(response).toBe(body);
        });

        httpTestingController.expectOne((req: HttpRequest<any>) => {
            expect(req.url).toBe('customer');
            expect(req.headers.has('Authorization')).toBeTruthy();
            expect(req.headers.get('Authorization')).toBe('PLACE_YOUR_TOKEN_HERE');
            return true;
        }).flush(body);
    });

    it('should handle error when Authoritation is invalid', () => {
        subscription = httpClient.get<Customer>('customer').subscribe(
            fail,
            (err: HttpErrorResponse) => {
                expect(err.status).toBe(401);
                expect(err.statusText).toBe('The request is not authorized');
                expect(err.message).toBe('Http failure response for customer: 401 The request is not authorized');
        });

        const httpRequest: TestRequest = httpTestingController.expectOne('customer');

        httpRequest.flush('Unauthorize', { status: 401, statusText: 'The request is not authorized' });
    });

    it('should handle error when error happens in client side or network issue', () => {
        subscription = httpClient.get<Customer>('customer').subscribe(
            fail
            , (err: HttpErrorResponse) => {
                expect(err.status).toBe(500);
                expect(err.statusText).toBe('A client-side or network error occurred');
                expect(err.message).toBe('Http failure response for customer: 500' +
                                        ' A client-side or network error occurred');
        });

        const httpRequest: TestRequest = httpTestingController.expectOne('customer');

        httpRequest.error(new ErrorEvent('Error in client'), { status: 500, statusText: 'Error in client' });
    });

    afterEach(() => {
        subscription.unsubscribe();
        httpTestingController.verify();
    });
});
