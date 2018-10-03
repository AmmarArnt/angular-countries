import {NgModule} from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
  MatTableModule,
  MatSortModule,
  MatCardModule,
  MatToolbarModule,
  MatIconModule,
  MatButtonModule,
  MatFormFieldModule,
  MatCheckboxModule,
  MatInputModule,
  MatSnackBarModule
} from '@angular/material';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    MatTableModule,
    MatSortModule,
    MatCardModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatInputModule,
    MatSnackBarModule
  ],
  exports: [
    BrowserAnimationsModule,
    MatTableModule,
    MatSortModule,
    MatCardModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatInputModule,
    MatSnackBarModule
  ]
})
export class MaterialDesignModule {
}
