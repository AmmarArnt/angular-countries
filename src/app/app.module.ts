import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';

import {AgmCoreModule} from '@agm/core';
import {JwSocialButtonsModule} from 'jw-angular-social-buttons';

import {AppComponent} from './app.component';
import {ListComponent} from './components/list/list.component';
import {DetailsComponent} from './components/details/details.component';
import {ErrorMessageComponent} from './components/error-message/error-message.component';
import {FactsComponent} from './components/details/facts/facts.component';
import {FlagComponent} from './components/details/flag/flag.component';
import {ImprovementComponent} from './components/details/improvement/improvement.component';
import {MapComponent} from './components/details/map/map.component';
import {SocialMediaComponent} from './components/details/social-media/social-media.component';
import {MaterialDesignModule} from './shared/module/material-design.module';
import {AppRoutingModule} from './shared/module/app-routing.module';
import {HeaderComponent} from './components/header/header.component';
import {googleCloudApiKey} from './shared/constants/map';

@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    DetailsComponent,
    ErrorMessageComponent,
    FactsComponent,
    FlagComponent,
    ImprovementComponent,
    MapComponent,
    SocialMediaComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    MaterialDesignModule,
    AppRoutingModule,
    JwSocialButtonsModule,
    AgmCoreModule.forRoot({
      apiKey: googleCloudApiKey,
      language: 'en'
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
