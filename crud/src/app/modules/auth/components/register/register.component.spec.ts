import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { NGX_MASK_CONFIG } from 'ngx-mask';
import { of, throwError } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { RegisterComponent } from './register.component';

const mockConfig: unknown = {
  validation: false,
};

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    authServiceSpy = jasmine.createSpyObj('AuthService', ['register']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [
        RegisterComponent,
        HttpClientTestingModule,
        NoopAnimationsModule,
      ],
      providers: [
        { provide: NGX_MASK_CONFIG, useValue: mockConfig },
        { provide: AuthService, useValue: authServiceSpy },
        { provide: Router, useValue: routerSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should call setDocumentNumberSubscription', () => {
      spyOn(component, 'setDocumentNumberSubscription');
      component.ngOnInit();
      expect(component.setDocumentNumberSubscription).toHaveBeenCalled();
    });
  });

  describe('setDocumentNumberSubscription', () => {
    it('should subscribe to documentNumber valueChanges and log the value', () => {
      const documentNumberControl = component.form.get('documentNumber');
      spyOn(console, 'log');
      documentNumberControl?.setValue('12345678901');
      expect(console.log).toHaveBeenCalledWith('12345678901');
    });
  });

  describe('validateDocumentNumber', () => {
    it('should return requiredDocument if value is null', () => {
      const result = component.validateDocumentNumber({
        value: null,
      } as FormControl);
      expect(result).toEqual({ requiredDocument: true });
    });

    it('should return emptyDocument if value is empty string', () => {
      const result = component.validateDocumentNumber({
        value: '  ',
      } as FormControl);
      expect(result).toEqual({ emptyDocument: true });
    });

    it('should return repeatedCharacters for invalid CPF with repeated digits', () => {
      const result = component.validateDocumentNumber({
        value: '11111111111',
      } as FormControl);
      expect(result).toEqual({ repeatedCharacters: true });
    });

    it('should return invalidDocument for CPF with invalid check digits', () => {
      const result = component.validateDocumentNumber({
        value: '12345678901',
      } as FormControl);
      expect(result).toEqual({ invalidDocument: true });
    });

    it('should return null for a valid CPF', () => {
      const result = component.validateDocumentNumber({
        value: '12345678909',
      } as FormControl);
      expect(result).toBeNull();
    });
  });

  describe('onSubmit', () => {
    it('should call authService.register and navigate to login on success', () => {
      authServiceSpy.register.and.returnValue(of(undefined));
      component.form.patchValue({
        name: 'Test',
        profession: 'Developer',
        birthDate: '2000-01-01',
        documentNumber: '12345678909',
        phone: '123456789',
        email: 'test@example.com',
        password: 'password',
        passwordConfirm: 'password',
        address: {
          zipCode: '12345',
          street: 'Main Street',
          number: '123',
          complement: 'Apt 1',
          neighborhood: 'Downtown',
          city: 'City',
          state: 'State',
        },
      });
      component.onSubmit();
      expect(authServiceSpy.register).toHaveBeenCalledWith(
        component.form.getRawValue()
      );
      expect(routerSpy.navigate).toHaveBeenCalledWith(['/auth/login']);
    });

    it('should log error on authService.register failure', () => {
      const error = { message: 'Registration failed' };
      authServiceSpy.register.and.returnValue(throwError(() => error));
      spyOn(console, 'log');
      component.onSubmit();
      expect(console.log).toHaveBeenCalledWith(error);
    });
  });
});
