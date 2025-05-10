// navigation.component.ts
import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { UserCookieService } from '../../services/user-cookie.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [CommonModule,FormsModule,RouterLink],
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent {
  mobileMenuActive = false;
  inputValue:string = ''
  @Output() tagsEmitter = new EventEmitter<string[]>();
  constructor(
    private cookieService: UserCookieService,
    private router: Router
  ) {}

  getAccType(): 'admin'|'student' {
    return this.cookieService.getUserType()||'student'
  }
  find(){
    const currentPath = this.router.url
    const tagsArray:string[]=this.inputValue.split(' ')
    if(currentPath !== '/'){this.router.navigateByUrl('/')}
    this.tagsEmitter.emit(tagsArray)
  }
  toggleMobileMenu() {
    this.mobileMenuActive = !this.mobileMenuActive;
  }
  test(){
    console.log('click')
  }
}
