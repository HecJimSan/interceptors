import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModuleWithProviders } from '@angular/compiler/src/core';

import { CustomerComponent,
         CustomerService } from '.';

@NgModule({
  imports: [CommonModule],
  declarations: [
    CustomerComponent,
  ],
  exports: [
    CustomerComponent,
    ]
})
export class CustomerModule {
    static forRoot(): ModuleWithProviders {
        return {
          ngModule: CustomerModule,
          providers: [
              CustomerService
            ]
        };
      }
}
