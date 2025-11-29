import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Auth } from '../../../core/services/auth';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  form: FormGroup;
  submitError: string | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: Auth,
    private router: Router
  ) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6), this.passwordHasUppercase]],
      confirmPassword: ['', [Validators.required]]
    }, {
      validators: this.passwordsMatch
    });
  }

  passwordHasUppercase(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (!value) {
      return null;
    }
    const hasUppercase = /[A-Z]/.test(value);
    return hasUppercase ? null : { missingUppercase: true };
  }

  passwordsMatch(group: AbstractControl): ValidationErrors | null {
    const formGroup = group as FormGroup;
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;
    if (!password || !confirmPassword) {
      return null;
    }
    return password === confirmPassword ? null : { passwordsMismatch: true };
  }

  onSubmit(): void {
    if (this.form.invalid) {
      return;
    }

    this.submitError = null;

    const email = this.form.get('email')?.value;
    const password = this.form.get('password')?.value;

    const success = this.authService.register({ email, password });
    
    if (!success) {
      this.submitError = 'User already exists';
      return;
    }

    this.router.navigate(['/login']);
  }
}
