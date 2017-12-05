import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule, MatFormFieldModule, MatDialogModule, MatSelectModule, MatTableModule, MatPaginatorModule, MatDatepickerModule, MatNativeDateModule, MatStepperModule, MatExpansionModule, MatAutocompleteModule, MatCheckboxModule } from '@angular/material';
import { SlimScroll } from 'angular-io-slimscroll';

import { PhotoInputComponent } from './components/photo-input/photo-input.component';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { NumericPipe } from "./pipes/numeric.pipe";
import { ToMonthPipe } from './pipes/to-month.pipe';
import { PaginatorComponent } from './components/paginator/paginator.component';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  imports: [
    MatDialogModule,
    FlexLayoutModule,
    CommonModule,
  ],
  declarations: [PhotoInputComponent, ConfirmDialogComponent, NumericPipe, ToMonthPipe, SlimScroll, PaginatorComponent],
  exports: [
    CommonModule,
    FormsModule,
    FlexLayoutModule,
    MatInputModule,
    MatFormFieldModule,
    MatDialogModule,
    MatSelectModule,
    PhotoInputComponent,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatStepperModule,
    MatExpansionModule,
    MatAutocompleteModule,
    MatCheckboxModule,
    NumericPipe,
    ToMonthPipe,
    SlimScroll,
    NgxPaginationModule,
    PaginatorComponent,
  ],
  entryComponents: [
    ConfirmDialogComponent,
  ]
})
export class SharedModule { }
