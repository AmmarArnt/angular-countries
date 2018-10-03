import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {isPlatformBrowser} from '@angular/common';

/**
 * source: https://auralinna.blog/post/2018/scroll-to-top-on-angular-route-change
 */
@Injectable({
  providedIn: 'root'
})
export class ScrollTopService {

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private router: Router
  ) {
  }

  setScrollTop() {
    if (isPlatformBrowser(this.platformId)) {
      this.router.events.subscribe((event: NavigationEnd) => {
        window.scroll(0, 0);
      });
    }
  }
}
