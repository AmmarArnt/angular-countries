import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';

import {AppComponent} from './app.component';
import {ListComponent} from './components/list/list.component';
import {DetailsComponent} from './components/details/details.component';
import {PageNotFoundComponent} from './components/page-not-found/page-not-found.component';
import {FactsComponent} from './components/details/facts/facts.component';
import {FlagComponent} from './components/details/flag/flag.component';
import {ImprovementComponent} from './components/details/improvement/improvement.component';
import {MapComponent} from './components/details/map/map.component';
import {SocialMediaComponent} from './components/details/social-media/social-media.component';
import {MaterialDesignModule} from './shared/module/material-design.module';
import {AppRoutingModule} from './shared/module/app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    DetailsComponent,
    PageNotFoundComponent,
    FactsComponent,
    FlagComponent,
    ImprovementComponent,
    MapComponent,
    SocialMediaComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    MaterialDesignModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
