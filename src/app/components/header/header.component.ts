import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  searchTerm: string;

  private queryParamsSubscription: Subscription;

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.queryParamsSubscription = this.activatedRoute.queryParams.subscribe(
      (queryParams) => {
        this.searchTerm = queryParams['search'];
      }
    );
  }

  onSearch() {
    this.router.navigate(['countries'], {queryParams: {'search': this.searchTerm}});
  }

  ngOnDestroy() {
    if (this.queryParamsSubscription != null) {
      this.queryParamsSubscription.unsubscribe();
    }
  }

}
