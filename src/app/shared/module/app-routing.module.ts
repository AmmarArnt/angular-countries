import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {ListComponent} from '../../components/list/list.component';
import {DetailsComponent} from '../../components/details/details.component';
import {ErrorMessageComponent} from '../../components/error-message/error-message.component';
import {errorMessageCannotFindCountry, errorMessageCannotFindPage, errorMessageCannotReachBackend} from '../constants/error-messages';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: '/countries'},
  {path: 'countries', component: ListComponent},
  {path: 'countries/:id', component: DetailsComponent},
  {path: 'error/country', component: ErrorMessageComponent, data: {message: errorMessageCannotFindCountry}},
  {path: 'error/backend', component: ErrorMessageComponent, data: {message: errorMessageCannotReachBackend}},
  {path: '**', component: ErrorMessageComponent, data: {message: errorMessageCannotFindPage}}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
