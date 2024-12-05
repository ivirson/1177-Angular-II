import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { AppComponent } from './app.component';
import { LoadingService } from './common/services/loading.service';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let loadingServiceSpy: jasmine.SpyObj<LoadingService>;

  beforeEach(async () => {
    loadingServiceSpy = jasmine.createSpyObj('LoadingService', [], {
      isLoading: of(true),
    });

    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: () => '1',
              },
            },
          },
        },
        { provide: LoadingService, useValue: loadingServiceSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should have isLoading$ defined and set from LoadingService', () => {
    component.isLoading$.subscribe((isLoading) => {
      expect(isLoading).toBeTrue();
    });

    expect(loadingServiceSpy.isLoading).toBeDefined();
  });

  it('should render "Loading..." when isLoading$ is true', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('div').textContent).toContain('');
  });
});
