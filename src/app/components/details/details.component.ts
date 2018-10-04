import {Component, OnDestroy, OnInit} from '@angular/core';
import {BehaviorSubject, Subscription} from 'rxjs';
import {Country} from '../../shared/entities/country.entity';
import {ActivatedRoute, Router} from '@angular/router';
import {CountriesService} from '../../shared/services/countries.service';
import {flatMap} from 'rxjs/operators';
import {ScrollTopService} from '../../shared/services/scroll-top.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit, OnDestroy {

  // TODO: document code

  /**
   * Data set for display a country
   */
  public country: BehaviorSubject<Country> = new BehaviorSubject<Country>(undefined);

  /**
   * Subscription for url params (needed for clean up)
   */
  private subscriptionParams: Subscription;

  /**
   * Subscription for empty country (needed for clean up)
   */
  private subscriptionCountry: Subscription;

  /**
   * Constructor
   * @param activatedRoute
   * @param countriesService Delivers the country data.
   * @param router
   * @param scrollTopService Scroll to top - after navigation.
   */
  constructor(private activatedRoute: ActivatedRoute,
              private countriesService: CountriesService,
              private router: Router,
              private scrollTopService: ScrollTopService) {
  }

  /**
   * Initialisation
   * * Load country data
   * * Navigate to error page
   * * Scroll to top, after navigation
   */
  ngOnInit() {
    this.loadCountryData();
    this.navigateToErrorPageIfThereIsNoCountry();
    this.scrollTopService.setScrollTop();
  }

  /**
   * Load country data with url parameter.
   */
  private loadCountryData() {
    this.subscriptionParams = this.activatedRoute.params.pipe(
      flatMap((params) => this.countriesService.getCountryById(params['id']))
    ).subscribe(
      (country: Country) => this.country.next(country)
    );
  }

  /**
   * If there is no country, redirect to error page.
   */
  private navigateToErrorPageIfThereIsNoCountry() {
    this.subscriptionCountry = this.country.subscribe(
      (country: Country) => {
        if (country === null) {
          this.router.navigate(['/error', 'country']);
        }
      }
    );
  }

  /**
   * Clean up
   */
  ngOnDestroy() {
    if (this.subscriptionParams != null) {
      this.subscriptionParams.unsubscribe();
    }

    if (this.subscriptionCountry != null) {
      this.subscriptionParams.unsubscribe();
    }
  }

}
