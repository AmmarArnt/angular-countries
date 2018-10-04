import {async, ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';
import {ErrorMessageComponent} from './error-message.component';
import {ActivatedRoute} from '@angular/router';
import {ErrorMessage} from '../../shared/entities/error-message.entity';
import {Component, DebugElement} from '@angular/core';
import {APP_DEFAULT_ERROR_MESSAGE} from '../../shared/constants/error-messages';
import {By} from '@angular/platform-browser';


describe('ErrorMessageComponent', () => {
  let spyOnSubscribe: jasmine.Spy;

  class MockActivatedRoute {
    data = {
      subscribe() {
      }
    };
  }

  const defaultMessage: ErrorMessage = {
    icon: 'default-icon',
    button: 'default-button',
    headline: 'default-headline',
    reloadApplication: false
  };

  const sampleMessage: ErrorMessage = {
    icon: undefined,
    button: 'sample-button',
    headline: 'sample-headline',
    reloadApplication: true
  };

  describe('[unit tests]', () => {
    let component: ErrorMessageComponent;

    beforeEach(() => {
      const mock = new MockActivatedRoute();
      component = new ErrorMessageComponent(mock as ActivatedRoute, undefined);
      (component as any).defaultErrorMessage = defaultMessage;
    });

    describe('ngOnInit', () => {

      it('subscribe() has been called.', () => {
        spyOnSubscribe = spyOn((component as any).activatedRoute.data, 'subscribe')
          .and.callFake((x) => x(undefined));

        component.ngOnInit();

        expect(spyOnSubscribe).toHaveBeenCalled();
      });

      it('set message if data is defined.', fakeAsync(() => {
        spyOnSubscribe = spyOn((component as any).activatedRoute.data, 'subscribe')
          .and.callFake((x) => x({message: sampleMessage}));

        component.ngOnInit();
        tick();

        expect(component.message).toBe(sampleMessage);
      }));

      it('should set message to \'defaultErrorMessage\' if data is undefined.', fakeAsync(() => {
        spyOnSubscribe = spyOn((component as any).activatedRoute.data, 'subscribe')
          .and.callFake((x) => x(undefined));

        component.ngOnInit();
        tick();

        expect(component.message).toBe(defaultMessage);
      }));

      it('should set message to \'defaultErrorMessage\' if data is null.', fakeAsync(() => {
        spyOnSubscribe = spyOn((component as any).activatedRoute.data, 'subscribe')
          .and.callFake((x) => x(null));

        component.ngOnInit();
        tick();

        expect(component.message).toBe(defaultMessage);
      }));

      it('should set message to \'defaultErrorMessage\' if data message is null.', fakeAsync(() => {
        spyOnSubscribe = spyOn((component as any).activatedRoute.data, 'subscribe')
          .and.callFake((x) => x({message: null}));

        component.ngOnInit();
        tick();

        expect(component.message).toBe(defaultMessage);
      }));

    });


    describe('ngOnDestroy', () => {

      it('should unsubscribe a existing subscription.', () => {
        (component as any).subscriptionData = {
          unsubscribe() {
          }
        };
        const spy = spyOn((component as any).subscriptionData, 'unsubscribe').and.callThrough();

        component.ngOnDestroy();

        expect(spy).toHaveBeenCalled();
      });

      it('should not crash without a subscription.', () => {
        (component as any).subscriptionData = undefined;

        expect(() => component.ngOnDestroy()).not.toThrow();
      });

    });

  });


  describe('[integration tests]', () => {

    @Component({
      selector: 'mat-card',
      template: '<ng-content></ng-content>'
    })
    class MockMatCardComponent {
    }

    @Component({
      selector: 'mat-card-header',
      template: '<ng-content></ng-content>'
    })
    class MockMatCardHeaderComponent {
    }

    @Component({
      selector: 'mat-card-content',
      template: '<ng-content></ng-content>'
    })
    class MockMatCardContentComponent {
    }

    @Component({
      selector: 'mat-icon',
      template: '<ng-content></ng-content>'
    })
    class MockMatIconComponent {
    }

    let component: ErrorMessageComponent;
    let fixture: ComponentFixture<ErrorMessageComponent>;
    let debugElement: DebugElement;

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [
          ErrorMessageComponent,
          MockMatCardComponent,
          MockMatCardHeaderComponent,
          MockMatCardContentComponent,
          MockMatIconComponent
        ],
        providers: [
          {provide: ActivatedRoute, useClass: MockActivatedRoute},
          {provide: APP_DEFAULT_ERROR_MESSAGE, useValue: defaultMessage},
        ]
      })
        .compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(ErrorMessageComponent);
      component = fixture.componentInstance;
      component.message = defaultMessage;
      debugElement = fixture.debugElement;
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should display headline text', () => {
      const e = debugElement.query(By.css('.app-headline')).nativeElement.innerText;
      expect(e).toContain(defaultMessage.headline);
    });

    it('should display button text (reloadApplication = false)', () => {
      const e = debugElement.query(By.css('[mat-stroked-button]')).nativeElement.innerText;
      expect(e).toContain(defaultMessage.button);
    });

    it('should display button text (reloadApplication = true)', () => {
      component.message = sampleMessage;
      fixture.detectChanges();

      const e = debugElement.query(By.css('[mat-stroked-button]')).nativeElement.innerText;
      expect(e).toContain(sampleMessage.button);
    });

    it('should display icon text', () => {
      const e = debugElement.query(By.css('mat-icon')).nativeElement.innerText;
      expect(e).toContain(defaultMessage.icon);
    });

    it('should hide icon if there is no icon', () => {
      component.message = sampleMessage;
      fixture.detectChanges();

      const e = debugElement.query(By.css('mat-icon'));
      expect(e).toBeFalsy();
    });

    it('should use routerLink if reloadApplication = false', () => {
      const routerLink = debugElement.queryAll(By.css('[routerLink]'));
      expect(routerLink.length).toBeGreaterThan(0);

      const href = debugElement.queryAll(By.css('[href]'));
      expect(href.length).toBe(0);
    });

    it('should use href if reloadApplication = true', () => {
      component.message = sampleMessage;
      fixture.detectChanges();

      const routerLink = debugElement.queryAll(By.css('[routerLink]'));
      expect(routerLink.length).toBe(0);

      const href = debugElement.queryAll(By.css('[href]'));
      expect(href.length).toBeGreaterThan(0);
    });

  });

});
