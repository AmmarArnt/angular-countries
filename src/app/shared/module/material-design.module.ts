import {NgModule} from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatTableModule, MatSortModule, MatCardModule} from '@angular/material';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    MatTableModule,
    MatSortModule,
    MatCardModule
  ],
  exports: [
    BrowserAnimationsModule,
    MatTableModule,
    MatSortModule,
    MatCardModule
  ]
})
export class MaterialDesignModule {
}
