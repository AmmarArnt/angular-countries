import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {ListComponent} from '../../components/list/list.component';
import {DetailsComponent} from '../../components/details/details.component';
import {PageNotFoundComponent} from '../../components/page-not-found/page-not-found.component';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: '/countries'},
  {path: 'countries', component: ListComponent},
  {path: 'countries/:id', component: DetailsComponent},
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
