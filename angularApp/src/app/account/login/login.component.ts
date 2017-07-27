import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Credentials, LoginService } from "../../shared";
import { Router } from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  userForm: FormGroup;
  credentials: Credentials = new Credentials();

  constructor(
    private fb: FormBuilder,
    private LoginService: LoginService,
    private router: Router
  ) { }

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.userForm = this.fb.group({
      "userName": [this.credentials.userName, [
        Validators.required,
      ]],
      "password": [this.credentials.password, [
        Validators.required,

      ]],
    });
  }

  login() {
    this.LoginService.login(this.userForm.value)
      .subscribe(data => {
        if (data) this.router.navigate(['/home']);
      });
  }
}


