import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { PaginatorModule } from 'primeng/paginator';
import { AddressPipe } from './pipes/address.pipe';
import { InputTextModule } from 'primeng/inputtext';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
  ],
  exports: [
    TableModule,
    PaginatorModule,
    InputTextModule,
    IconFieldModule,
    InputIconModule
  ]
})
export class SharedModule { }
