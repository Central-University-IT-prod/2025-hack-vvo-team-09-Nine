import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NgIf, NgFor } from '@angular/common';
import { trigger, transition, style, animate } from '@angular/animations';
import { NavigationComponent } from '../navigation/navigation.component';
import { accountRegData, AccountService } from '../../services/account.service';
import { UserCookieService } from '../../services/user-cookie.service';
import { accountData } from '../account/account.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, NgFor, NgIf, NavigationComponent],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [
    trigger('fade', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms ease-out', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        animate('300ms ease-in', style({ opacity: 0 })),
      ]),
    ])
  ]
})
export class LoginComponent implements OnInit {
  registerForm!: FormGroup;
  loginForm!: FormGroup;
  isRegisterMode = true;
  isLoading = false;

  userTypes = [
    { value: 'student', display: 'Студент' },
    { value: 'admin', display: 'Администратор' }
  ];

  constructor(
    private fb: FormBuilder,
    private userCookieService: UserCookieService,
    private router: Router,
    private accountService:AccountService
  ) { }

  ngOnInit(): void {
    this.initForms();
  }

  private initForms(): void {
    this.registerForm = this.fb.group({
      accountType: ['student', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, { validator: this.passwordMatchValidator });

    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  private passwordMatchValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');

    if (password?.value !== confirmPassword?.value) {
      return { 'mismatch': true };
    }
    return null;
  }

  onSubmit(): void {
    if (this.isRegisterMode) {
      if (this.registerForm.invalid) return;
      this.isLoading = true;
      this.accountService.POSTcreateAccount(this.registerForm.value)
        .subscribe({
          next:(value)=>{
            console.log(value)
            this.userCookieService.setUserType(this.registerForm.value.accountType)
            this.userCookieService.setUserAuthData({email:this.registerForm.value.email, password:this.registerForm.value.password})
            this.router.navigateByUrl('/account')
          },
          error:(error)=>{
            console.log(error)
          }
        })
    } else {
      if (this.loginForm.invalid) return;
      this.isLoading = true;
      this.accountService.GEtgetAccount(this.registerForm.value)
        .subscribe({
          next:(value:accountData)=>{
            console.log(value)
            this.userCookieService.setUserType(value.accountType)
            this.userCookieService.setUserAuthData({email:this.registerForm.value.email, password:this.registerForm.value.password})
            this.router.navigateByUrl('/account')
          },
          error:(error)=>{
            console.log(error)
          }
        })
    }
  }

  toggleMode(): void {
    this.isRegisterMode = !this.isRegisterMode;
  }
}
