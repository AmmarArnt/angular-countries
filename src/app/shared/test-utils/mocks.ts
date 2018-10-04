import {Component, NgModule} from '@angular/core';
import {ErrorMessage} from '../entities/error-message.entity';

export class MockActivatedRoute {
  data = {
    subscribe() {
    }
  };
}

export const defaultMessage: ErrorMessage = {
  icon: 'default-icon',
  button: 'default-button',
  headline: 'default-headline',
  reloadApplication: false
};

export const sampleMessage: ErrorMessage = {
  icon: undefined,
  button: 'sample-button',
  headline: 'sample-headline',
  reloadApplication: true
};


/* tslint:disable:component-selector */
@Component({
  selector: 'mat-card',
  template: '<ng-content></ng-content>'
})
export class MockMatCardComponent {
}

@Component({
  selector: 'mat-card-header',
  template: '<ng-content></ng-content>'
})
export class MockMatCardHeaderComponent {
}

@Component({
  selector: 'mat-card-content',
  template: '<ng-content></ng-content>'
})
export class MockMatCardContentComponent {
}

@Component({
  selector: 'mat-icon',
  template: '<ng-content></ng-content>'
})
export class MockMatIconComponent {
}

/* tslint:enable:component-selector */


@NgModule({
  declarations: [
    MockMatCardComponent,
    MockMatCardHeaderComponent,
    MockMatCardContentComponent,
    MockMatIconComponent
  ],
  exports: [
    MockMatCardComponent,
    MockMatCardHeaderComponent,
    MockMatCardContentComponent,
    MockMatIconComponent
  ]
})
export class MockMatModule {

}
