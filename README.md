# Angular Countries

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.2.3.

**Demo:** http://angular-countries.sebastiandorn.com

## Settings to build

Insert your Google Cloud API Key in `src/app/shared/constants/map.ts`. 
The property is called `googleCloudApiKey`.
This key need the permission for **Map JavaScript API** and **Fusion Table API**.

Run `npm install` to download all dependencies.

### Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

### Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Challenges

* Providing an accurate map section - Solution: Calculate the zoom level depending on country area.
* Highlighting a country is feature request for Google Maps API (https://issuetracker.google.com/issues/35816953). There was a need to find a data provider for countries borders - Solution: Using a Fusion Table API (not all countries included).
* Main color usage in a decent way

## Further improvements

* Error handling
  * Retry
  * Disable search, if backend cannot be reached.
* Offline capability (service workers)
  * Caching flag images
* Few faulty representations of the map section (small island countries)
* A few incorrect positioning of the marking (e. g. Antarctica & San Marino)
* Preloading border coordinates
* Pagination for countries list
* Email validation
* Loading animation while loading countries data
* Write unit & integration tests for all components & services
  * For the component `error-message.component.ts`, the tests are exemplary ready under `src/app/components/error-message/error-message.component.spec.ts`.
* Write E2E tests

