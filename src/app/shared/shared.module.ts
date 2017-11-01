import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatInputModule, MatFormFieldModule, MatDialogModule, MatSelectModule, MatTableModule, MatPaginatorModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { PhotoInputComponent } from './components/photo-input/photo-input.component';

@NgModule({
  imports: [
    FlexLayoutModule,
    CommonModule
  ],
  declarations: [PhotoInputComponent],
  exports: [
    CommonModule,
    FormsModule,
    FlexLayoutModule,
    MatInputModule,
    MatFormFieldModule,
    MatDialogModule,
    MatSelectModule,
    MatPaginatorModule,
    PhotoInputComponent,
  ]
})
export class SharedModule { }
