import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { User, LoginService, Registration } from "../../shared";
import { Router } from "@angular/router";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  userForm: FormGroup;
  user: Registration = new Registration();

  constructor(
    private fb: FormBuilder,
    private login: LoginService,
    private router: Router
  ) { }

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.userForm = this.fb.group({
      "firstName": [this.user.firstName, [
        Validators.required,
      ]],
      "lastName": [this.user.lastName, [
        Validators.required,
      ]],
      "email": [this.user.email, [
        Validators.required,
        Validators.pattern("[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}")
      ]],
      "password": [this.user.password, [
        Validators.required,
      ]],
      "userName": [this.user.userName, [
        Validators.required
      ]],      
    });
  }

  registerUser() {
    this.login.register(this.userForm.value).subscribe(data => {
      console.log("succes");
      this.router.navigate(['/login'])
    })    
  }
}
