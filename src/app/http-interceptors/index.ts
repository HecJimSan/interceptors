
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { CustomerInterceptor } from './customer/customer.interceptor';

export * from './customer/customer.interceptor';

export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: CustomerInterceptor, multi: true },
];
