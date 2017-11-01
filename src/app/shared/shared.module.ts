import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatInputModule, MatFormFieldModule, MatDialogModule, MatSelectModule, MatTableModule, MatPaginatorModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { PhotoInputComponent } from './components/photo-input/photo-input.component';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';

@NgModule({
  imports: [
    MatDialogModule,
    FlexLayoutModule,
    CommonModule
  ],
  declarations: [PhotoInputComponent, ConfirmDialogComponent],
  exports: [
    CommonModule,
    FormsModule,
    FlexLayoutModule,
    MatInputModule,
    MatFormFieldModule,
    MatDialogModule,
    MatSelectModule,
    PhotoInputComponent,
  ],
  entryComponents: [
    ConfirmDialogComponent
  ]
})
export class SharedModule { }
