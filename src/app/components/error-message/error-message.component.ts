import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ErrorMessage} from '../../shared/entities/error-message.entity';
import {Subscription} from 'rxjs';
import {APP_DEFAULT_ERROR_MESSAGE, errorMessageCannotFindPage} from '../../shared/constants/error-messages';

@Component({
  selector: 'app-error-message',
  templateUrl: './error-message.component.html',
  styleUrls: ['./error-message.component.scss'],
  providers: [
    {provide: APP_DEFAULT_ERROR_MESSAGE, useValue: errorMessageCannotFindPage}
  ]
})
export class ErrorMessageComponent implements OnInit, OnDestroy {

  /**
   * Error message to display at this page
   */
  message: ErrorMessage;

  /**
   * Subscription for routing data (needed for clean up)
   */
  subscriptionData: Subscription;

  /**
   * Constructor
   * @param activatedRoute
   * @param defaultErrorMessage Default error message: Cannot find page
   */
  constructor(private activatedRoute: ActivatedRoute, @Inject(APP_DEFAULT_ERROR_MESSAGE) private defaultErrorMessage: ErrorMessage) {
  }

  /**
   * Initialisation
   * * Load error message from routing data.
   */
  ngOnInit() {
    this.subscriptionData = this.activatedRoute.data.subscribe(
      (data) => {
        if (data != null && data.message != null) {
          this.message = data.message;
        } else {
          this.message = this.defaultErrorMessage;
        }
      }
    );
  }

  /**
   * Clean up
   */
  ngOnDestroy() {
    if (this.subscriptionData != null) {
      this.subscriptionData.unsubscribe();
    }
  }

}
