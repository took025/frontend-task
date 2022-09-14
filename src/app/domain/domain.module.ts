import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DomainRoutingModule } from './domain-routing.module';
import { DomainComponent } from './domain/domain.component';
import { FormsModule } from '@angular/forms';
import { NgxSliderModule } from '@angular-slider/ngx-slider';


@NgModule({
  declarations: [
    DomainComponent,
  ],
  imports: [
    CommonModule,
    DomainRoutingModule,
    FormsModule,
    NgxSliderModule,
  ]
})
export class DomainModule { }
