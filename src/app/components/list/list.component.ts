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

  displayedColumns: string[] = ['flag', 'name', 'population'];
  dataSource: MatTableDataSource<Country>;

  private queryParamsSubscription: Subscription;

  @ViewChild(MatSort) sort: MatSort;

  constructor(private countriesService: CountriesService, private activatedRoute: ActivatedRoute) {
    this.dataSource = new MatTableDataSource([]);

    this.queryParamsSubscription = this.activatedRoute.queryParams.subscribe(
      (queryParams) => {
        this.dataSource.filter = (queryParams['search'] || '').trim().toLowerCase();
      }
    );
  }

  ngOnInit() {
    this.dataSource.sort = this.sort;

    this.dataSource.data = this.countriesService.list.getValue();
    this.countriesService.list.subscribe(
      (newCountriesList: Country[]) => {
        this.dataSource.data = newCountriesList;
      }
    );
  }

  ngOnDestroy() {
    if (this.queryParamsSubscription != null) {
      this.queryParamsSubscription.unsubscribe();
    }
  }

}
