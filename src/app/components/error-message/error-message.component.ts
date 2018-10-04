import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ErrorMessage} from '../../shared/entities/error-message.entity';
import {Subscription} from 'rxjs';
import {errorMessageCannotFindPage} from '../../shared/constants/error-messages';

@Component({
  selector: 'app-error-message',
  templateUrl: './error-message.component.html',
  styleUrls: ['./error-message.component.scss']
})
export class ErrorMessageComponent implements OnInit, OnDestroy {

  message: ErrorMessage;

  subscription: Subscription;

  constructor(private activatedRoute: ActivatedRoute, private router: Router) {

  }

  ngOnInit() {
    this.subscription = this.activatedRoute.data.subscribe(
      (data) => {
        if (data != null) {
          this.message = data.message;
        } else {
          this.message = errorMessageCannotFindPage;
        }
      }
    );
  }

  ngOnDestroy() {
    if (this.subscription != null) {
      this.subscription.unsubscribe();
    }
  }

}
