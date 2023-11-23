import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidationFormsService {


  errorMessages: any;

  formRules = {
    nonEmpty: '^[a-zA-Z0-9]+([_ -]?[a-zA-Z0-9])*$',
    usernameMin: 5,
    passwordMin: 6,

  };

  formErrors = {
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    accept: false,
  };

  constructor() {
    this.errorMessages = {
      name: {
        required: 'name is required',

      },
      username: {
        required: 'Username is required',
        minLength: `Username must be ${this.formRules.usernameMin} characters or more`,
        pattern: 'Must contain letters and/or numbers, no trailing spaces'
      },
      email: {
        required: 'required',
        email: 'Invalid email address',
      },
      password: {
        required: 'Password is required',
        minLength: `Password must be at least ${this.formRules.passwordMin} characters`
      },
      confirmPassword: {
        required: 'Password confirmation is required',
        passwordMismatch: 'Passwords must match'
      },
      accept: {
        requiredTrue: 'You have to accept our Terms and Conditions'
      },
    };
  }
}
