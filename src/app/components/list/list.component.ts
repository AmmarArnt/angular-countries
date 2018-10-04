import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {MatSort, MatTableDataSource} from '@angular/material';
import {Subscription} from 'rxjs';

import {Country} from '../../shared/entities/country.entity';
import {CountriesService} from '../../shared/services/countries.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, OnDestroy {

  /**
   * Displayed columns
   */
  displayedColumns: string[] = ['flag', 'name', 'population'];

  /**
   * Table data source object (list data, filter, sorting)
   */
  dataSource: MatTableDataSource<Country>;

  /**
   * Subscription for url query params (needed for clean up)
   */
  private subscriptionQueryParams: Subscription;

  /**
   * Subscription for {@link CountriesService} (needed for clean up)
   */
  private subscriptionCountriesService: Subscription;

  /**
   * Container for sorting table data
   */
  @ViewChild(MatSort) sort: MatSort;

  /**
   * Constructor
   * @param countriesService Delivers the country data.
   * @param activatedRoute
   */
  constructor(private countriesService: CountriesService, private activatedRoute: ActivatedRoute) {
    this.dataSource = new MatTableDataSource([]);
  }

  /**
   * Initialisation
   * * Reference sorting
   * * Insert & update countries data in table
   * * Update table while user is searching
   */
  ngOnInit() {
    this.dataSource.sort = this.sort;

    this.dataSource.data = this.countriesService.list.getValue();
    this.subscriptionCountriesService = this.countriesService.list.subscribe(
      (newCountriesList: Country[]) => {
        this.dataSource.data = newCountriesList;
      }
    );

    this.subscriptionQueryParams = this.activatedRoute.queryParams.subscribe(
      (queryParams) => {
        this.dataSource.filter = (queryParams['search'] || '').trim().toLowerCase();
      }
    );
  }

  /**
   * Clean up
   */
  ngOnDestroy() {
    if (this.subscriptionQueryParams != null) {
      this.subscriptionQueryParams.unsubscribe();
    }

    if (this.subscriptionCountriesService != null) {
      this.subscriptionCountriesService.unsubscribe();
    }
  }

}
