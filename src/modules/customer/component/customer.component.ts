import { Component, OnInit } from '@angular/core';

import { CustomerService } from './../service/customer.service';
import { Customer } from './../model/customer.model';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  public descriptionCustomer: string;
  public customer: Customer= new Customer();

  constructor(
    public customerService: CustomerService,
  ) { }

  ngOnInit() {
  }

  onKey(event: any) {
    this.descriptionCustomer = event.target.value;
  }

  async call() {
    this.customerService.getCustomer(this.descriptionCustomer).subscribe((response: Customer) => {
      this.customer = response;
    });
  }
}
