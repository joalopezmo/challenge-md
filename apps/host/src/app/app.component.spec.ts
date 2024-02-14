// import { TestBed } from '@angular/core/testing';
// import { RouterTestingModule } from '@angular/router/testing';
// import { SharedMaterialUiModule } from '@challenge-md/ui';
// import { AppComponent } from './app.component';
// import { NxWelcomeComponent } from './nx-welcome.component';

// describe('AppComponent', () => {
//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       imports: [
//         SharedMaterialUiModule,
//         RouterTestingModule.withRoutes([
//           { path: '', component: NxWelcomeComponent },
//         ]),
//         AppComponent,
//         NxWelcomeComponent,
//       ],
//     }).compileComponents();
//   });

  // it('should create the app', () => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   const app = fixture.componentInstance;
  //   expect(app).toBeTruthy();
  // });

  // it(`should have as title 'host'`, () => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   const app = fixture.componentInstance;
  //   expect(app.title).toEqual('host');
  // });

  // it('should render title', fakeAsync(() => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   const router = TestBed.inject(Router);
  //   fixture.ngZone?.run(() => router.navigate(['']));
  //   tick();
  //   fixture.detectChanges();
  //   const compiled = fixture.nativeElement as HTMLElement;
  //   expect(compiled.querySelector('h1')?.textContent).toContain('Welcome host');
  // }));
  import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
  
  describe('AppComponent', () => {
    let component: AppComponent;
    let fixture: ComponentFixture<AppComponent>;
  
    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [RouterTestingModule],
      }).compileComponents();
    });
  
    beforeEach(() => {
      fixture = TestBed.createComponent(AppComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
  
    it('should create the app', () => {
      expect(component).toBeTruthy();
    });
  
    it(`should have as title 'host'`, () => {
      expect(component.title).toEqual('host');
    });
  
  });
  
