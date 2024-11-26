import { Component, DestroyRef, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  FormControl,
  FormControlState,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Router } from '@angular/router';
import { NgxMaskDirective } from 'ngx-mask';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMaskDirective,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent implements OnInit {
  form: FormGroup = new FormGroup({
    name: new FormControl(null, [Validators.required]),
    profession: new FormControl(null, [Validators.required]),
    birthDate: new FormControl(null, [Validators.required]),
    documentNumber: new FormControl('', [
      Validators.minLength(11),
      Validators.maxLength(11),
      this.validateDocumentNumber,
    ]),
    phone: new FormControl(null, [Validators.required]),
    email: new FormControl(null, [Validators.required]),
    password: new FormControl(null, [Validators.required]),
    passwordConfirm: new FormControl(null, [Validators.required]),
    address: new FormGroup({
      zipCode: new FormControl(null, [Validators.required]),
      street: new FormControl(null, [Validators.required]),
      number: new FormControl(null, [Validators.required]),
      complement: new FormControl(null, [Validators.required]),
      neighborhood: new FormControl(null, [Validators.required]),
      city: new FormControl(null, [Validators.required]),
      state: new FormControl(null, [Validators.required]),
    }),
  });

  constructor(
    private authService: AuthService,
    private router: Router,
    private destroyRef: DestroyRef
  ) {}

  ngOnInit(): void {
    this.setDocumentNumberSubscription();
  }

  setDocumentNumberSubscription(): void {
    this.form.get('documentNumber')?.valueChanges.subscribe((value) => {
      console.log(this.form.get('documentNumber')?.value);
    });
  }

  onSubmit(): void {
    const payload = this.form.getRawValue();
    this.authService
      .register(payload)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        complete: () => {
          this.router.navigate(['/auth/login']);
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  // Método que valida se um CPF fornecido é válido
  validateDocumentNumber({
    value,
  }: FormControlState<string>): { [key: string]: boolean } | null {
    if (!value) return { requiredDocument: true };

    value = value.replace(/[^\d]+/g, '');
    if (value == '') return { emptyDocument: true };

    // Elimina CPFs invalidos conhecidos
    if (value.length != 11 || value === value[0].repeat(value.length)) {
      return { repeatedCharacters: true };
    }

    // Valida 1o digito
    let add = 0;

    for (let i = 0; i < 9; i++) {
      add += parseInt(value.charAt(i)) * (10 - i);
    }

    let rev = 11 - (add % 11);

    if (rev == 10 || rev == 11) rev = 0;

    if (rev != parseInt(value.charAt(9))) return { invalidDocument: true };

    // Valida 2o digito
    add = 0;
    for (let i = 0; i < 10; i++) {
      add += parseInt(value.charAt(i)) * (11 - i);
    }

    rev = 11 - (add % 11);

    if (rev == 10 || rev == 11) rev = 0;
    if (rev != parseInt(value.charAt(10))) return { invalidDocument: true };

    return null;
  }
}
