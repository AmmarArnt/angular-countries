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
   */
  constructor(private activatedRoute: ActivatedRoute) {
  }

  /**
   * Initialisation
   * * Load error message from routing data.
   */
  ngOnInit() {
    this.subscriptionData = this.activatedRoute.data.subscribe(
      (data) => {
        if (data != null) {
          this.message = data.message;
        } else {
          this.message = errorMessageCannotFindPage;
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
