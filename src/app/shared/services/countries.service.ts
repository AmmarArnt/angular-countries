import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {BehaviorSubject, Observable} from 'rxjs';
import {map} from 'rxjs/operators';

import {Country} from '../entities/country.entity';
import {endpointCountries} from '../constants/endpoints';
import {Router} from '@angular/router';

/**
 *  Providing countries data
 */
@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  /**
   * List of all countries
   */
  list: BehaviorSubject<Country[]> = new BehaviorSubject<Country[]>([]);

  /**
   * Status
   * * <code>false</code> - is loading
   * * <code>true</code> - loaded
   */
  loaded: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  /**
   * Constructor
   *
   * Load countries data.
   *
   * @param http
   * @param router
   */
  constructor(private http: HttpClient, private router: Router) {
    this.load();
  }

  /**
   * Load countries data from backend service and transform to {@link Country} objects.
   *
   * If there is an error, the user will be redirect to an error page.
   */
  private load() {
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
   * Find an country by id (alpha code, 3 characters).
   *
   * @param id alpha code, 3 characters
   *
   * @return Country, if there is a country with this id.
   * <code>null</code>, if there is no country for this id.
   * <code>undefined</code>, if the data hasn't be loaded yet.
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
