import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { Customer } from './../model/customer.model';
import { environment } from '../../../environments/environment';

@Injectable()
export class CustomerService {

    public endPoint: string = environment.customer;
    private contextPath = 'customer';

    constructor(public http: HttpClient) { }

    public getCustomer(identifier: string): Observable<Customer> {
        return this.http.get(this.endPoint + '/' + this.contextPath + '/' + identifier)
        .pipe((response: Observable<Customer>) => {
            return response;
        });
    }
}
