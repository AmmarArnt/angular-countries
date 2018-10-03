import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-improvement',
  templateUrl: './improvement.component.html',
  styleUrls: ['./improvement.component.scss']
})
export class ImprovementComponent implements OnInit {

  constructor(private snackBar: MatSnackBar) {
  }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    const info = form.valid ? 'Thank you for message!' : 'The form is invalid.';
    this.openSnackBar(info);

    console.log(info, form.value);

    if (form.valid) {
      form.resetForm();
    }
  }

  private openSnackBar(message: string, action: string = 'Close') {
    this.snackBar.open(message, action, {
      duration: 3000,
    });
  }
}
