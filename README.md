# Angular Countries

**Demo:** http://angular-countries.sebastiandorn.com


## Challenges

* Providing an accurate map section
  * *Solution:* Calculate the zoom level depending on country area.
* Highlighting a country is feature request for Google Maps API (https://issuetracker.google.com/issues/35816953). 
  There was a need to find a data provider for countries borders
  * *Solution:* Using a Fusion Table API (not all countries included).
* Main color usage in a decent way


## Further improvements

* Better error handling when API call fails
  * Retry
  * Disable search, when backend cannot be reached.
* Offline capability with service workers
  * Caching flag images
* Few faulty representations of the map section (small island countries)
* A few incorrect positioning of the marking (e. g. Antarctica & San Marino)
* Preloading border coordinates
* Pagination for countries list
* Improved email validation
* Add animation while loading countries data
* Write more unit & integration tests
  * For the component `error-message.component.ts`, the tests are exemplary ready under `src/app/components/error-message/error-message.component.spec.ts`.
* Write E2E tests
* Reduce build size with AOT compiler


## Settings to build

Insert your Google Cloud API Key in `src/app/shared/constants/map.ts`. 
The property is called `googleCloudApiKey`.
This key need the permission for **Map JavaScript API** and **Fusion Table API**.

Run `npm install` to download all dependencies.

### Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

### Build

Run `npm run build` to build the project. The build artifacts will be stored in the `dist/` directory.

