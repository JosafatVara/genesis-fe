import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatInputModule, MatFormFieldModule, MatDialogModule } from '@angular/material';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
  ],
  declarations: [],
  exports: [
    CommonModule,
    FormsModule,
    FlexLayoutModule,
    MatInputModule,
    MatFormFieldModule,
    MatDialogModule
  ]
})
export class SharedModule { }
