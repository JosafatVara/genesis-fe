import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatInputModule, MatFormFieldModule, MatDialogModule, MatSelectModule, MatTableModule, MatPaginatorModule, MatDatepickerModule, MatNativeDateModule} from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PhotoInputComponent } from './components/photo-input/photo-input.component';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { NumericPipe } from "./pipes/numeric.pipe";

@NgModule({
  imports: [
    MatDialogModule,
    FlexLayoutModule,
    CommonModule
  ],
  declarations: [PhotoInputComponent, ConfirmDialogComponent, NumericPipe],
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
    NumericPipe
  ],
  entryComponents: [
    ConfirmDialogComponent
  ]
})
export class SharedModule { }
