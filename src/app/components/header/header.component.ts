import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  /**
   * Insert search keyword
   */
  searchTerm: string;

  /**
   * Subscription for url query params (needed for clean up)
   */
  private subscriptionQueryParams: Subscription;

  /**
   * Constructor
   * @param router
   * @param activatedRoute
   */
  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
  }

  /**
   * Initialisation
   * * Update search term, if query params has been changed.
   */
  ngOnInit() {
    this.subscriptionQueryParams = this.activatedRoute.queryParams.subscribe(
      (queryParams) => {
        this.searchTerm = queryParams['search'];
      }
    );
  }

  /**
   * Search action: Update query params and navigate to list page.
   */
  onSearch() {
    this.router.navigate(['countries'], {queryParams: {'search': this.searchTerm}});
  }

  /**
   * Clean up
   */
  ngOnDestroy() {
    if (this.subscriptionQueryParams != null) {
      this.subscriptionQueryParams.unsubscribe();
    }
  }

}
