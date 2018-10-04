import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {BehaviorSubject, Observable} from 'rxjs';
import {map} from 'rxjs/operators';

import {Country} from '../entities/country.entity';
import {endpointCountries} from '../constants/endpoints';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  list: BehaviorSubject<Country[]> = new BehaviorSubject<Country[]>([]);

  loaded: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient, private router: Router
  ) {
    this.http.get(endpointCountries).pipe(
      map((objs: Object[]) => objs.map(
        (item: Object) => Country.fromJson(item)
      ))
    ).subscribe(
      (list) => {
        this.loaded.next(true);
        this.list.next(list);
      },
      () => {
        this.router.navigate(['/error', 'backend']);
      }
    );

  }

  /**
   * Null => Country does not exists.
   * Undefiend => No data has been loaded.
   *
   * @param id
   */
  getCountryById(id: string): Observable<Country> {
    return this.list.pipe(
      map((list: Country[]) =>
        list.find((item: Country) => item.id === id)
      ),
      map((country: Country) => country === undefined && this.loaded.getValue() ? null : country)
    );
  }
}
