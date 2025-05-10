import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AccountService } from 'services/account.service';
import { UserCookieService } from 'services/user-cookie.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  constructor(
    private accountService: AccountService,
    private userCookieService: UserCookieService,
    private fb: FormBuilder
  ) { }
  profileForm = this.fb.group({
    name: ['', Validators.required],
    tg: [''],
    faculty: ['', Validators.required],
    course: ['', Validators.required],
    gender: ['', Validators.required],
    about: [''],
  });

  faculties = [
    'Факультет информационных технологий',
    'Экономический факультет',
    'Юридический факультет'
  ];

  courses = [1, 2, 3, 4, 5, 6];
  genders = ['Мужской', 'Женский'];

  onSubmit() {
    if (this.profileForm.valid) {
      const { email, password } = this.userCookieService.getUserAuthData()!
      const data = {
        ...this.profileForm.value,
        email: email,
        password: password
      }
      console.log(this.profileForm.value);
      this.accountService.PUTupdateAccount(data as any)
        .subscribe({
          next: (value) => {
            console.log(value)
          },
          error: (error) => {
            console.log(error)
          }
        })
    }
  }
}
