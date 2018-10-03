import {NgModule} from '@angular/core';

import {FbLikeComponent} from './fb-link.component';
import {GooglePlusComponent} from './google-plus.component';
import {TweetComponent} from './tweet.component';

@NgModule({
  declarations: [
    FbLikeComponent,
    GooglePlusComponent,
    TweetComponent
  ],
  exports: [
    FbLikeComponent,
    GooglePlusComponent,
    TweetComponent
  ]
})
export class SocialMediaModule {
}
