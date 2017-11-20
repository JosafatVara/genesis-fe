import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule, MatFormFieldModule, MatDialogModule, MatSelectModule, MatTableModule, MatPaginatorModule, MatDatepickerModule, MatNativeDateModule, MatStepperModule, MatExpansionModule, MatAutocompleteModule } from '@angular/material';
import { SlimScroll } from 'angular-io-slimscroll';

import { PhotoInputComponent } from './components/photo-input/photo-input.component';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { NumericPipe } from "./pipes/numeric.pipe";
import { ToMonthPipe } from './pipes/to-month.pipe';
import { DateSelectorComponent } from './components/date-selector/date-selector.component';

@NgModule({
  imports: [
    MatDialogModule,
    FlexLayoutModule,
    CommonModule
  ],
  declarations: [PhotoInputComponent, ConfirmDialogComponent, NumericPipe, ToMonthPipe, SlimScroll, DateSelectorComponent],
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
    NumericPipe,
    ToMonthPipe,
    SlimScroll,
  ],
  entryComponents: [
    ConfirmDialogComponent
  ]
})
export class SharedModule { }
