import {Component, OnInit} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
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
export class DetailsComponent implements OnInit {

  public country: BehaviorSubject<Country> = new BehaviorSubject<Country>(undefined);


  constructor(private activatedRoute: ActivatedRoute,
              private countriesService: CountriesService,
              private router: Router,
              private scrollTopService: ScrollTopService) {
  }

  ngOnInit() {
    this.activatedRoute.params.pipe(
      flatMap((params) => this.countriesService.getCountryById(params['id']))
    ).subscribe(
      (country: Country) => this.country.next(country)
    );

    this.country.subscribe(
      (country: Country) => {
        if (country === null) {
          this.router.navigate(['/error', 'country']);
        }
      }
    );

    this.scrollTopService.setScrollTop();
  }

}
