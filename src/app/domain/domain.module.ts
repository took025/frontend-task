import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DomainRoutingModule } from './domain-routing.module';
import { DomainComponent } from './domain/domain.component';
import { FormsModule } from '@angular/forms';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { FormatBankAccPipe } from '../core/space-pipe';


@NgModule({
  declarations: [
    DomainComponent,
    FormatBankAccPipe
  ],
  imports: [
    CommonModule,
    DomainRoutingModule,
    FormsModule,
    NgxSliderModule,
  ]
})
export class DomainModule { }
