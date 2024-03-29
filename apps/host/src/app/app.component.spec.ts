import { TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { SharedMaterialUiModule } from '@challenge-md/ui';
import { AppComponent } from './app.component';
import { NxWelcomeComponent } from './nx-welcome.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        SharedMaterialUiModule,
        BrowserAnimationsModule,
        RouterTestingModule.withRoutes([
          { path: '', component: NxWelcomeComponent },
        ]),
        AppComponent,
        NxWelcomeComponent,
        
      ],
    }).compileComponents();
    provideAnimations();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'host'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('host');
  }); }

  // it('should render title', fakeAsync(() => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   const router = TestBed.inject(Router);
  //   fixture.ngZone?.run(() => router.navigate(['']));
  //   tick();
  //   fixture.detectChanges();
  //   const compiled = fixture.nativeElement as HTMLElement;
  //   expect(compiled.querySelector('h1')?.textContent).toContain('Welcome host');
  // }));
);
