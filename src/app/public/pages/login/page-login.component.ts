import { HttpClient } from "@angular/common/http";
import { Component, inject } from "@angular/core";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";

@Component({
  selector: 'app-page-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './page-login.component.html',
})
export class PageLoginComponent {
  private http = inject(HttpClient);

  loginForm: FormGroup;
  private formBuilder = inject(FormBuilder);

  constructor() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  onLogin() {
    if (this.loginForm.invalid) return;

    const { email, password } = this.loginForm.value;

    return this.http.post('https://localhost:3000/api/v1/auth/login', { email, password }, { withCredentials: true }).subscribe(
      (response) => {
        console.log(response);
      }
    );

  }

  onLogout() {
    return this.http.post('https://localhost:3000/api/v1/auth/logout', {}, { withCredentials: true }).subscribe(
      (response) => {
        console.log(response);
      }
    );
  }
}
