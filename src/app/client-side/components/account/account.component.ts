import { Component, OnInit } from '@angular/core';
import { ProfileComponent } from './profile/profile.component';
import { DocumentComponent } from './document/document.component';
import { NgIf } from '@angular/common';
import { NavigationComponent } from '../navigation/navigation.component';
import { ApplicationsComponent } from './applications/applications.component';
import { UserCookieService } from '../../services/user-cookie.service';
import { Route, Router } from '@angular/router';
export interface changeAccountData{
  gender:'male'|'female';
  faculty:string;
  course:number;
  about:string;
  tg:string;
  name:string;
}
export interface accountData extends changeAccountData{
  accountType:'student'|'admin'
}
@Component({
  selector: 'app-account',
  standalone: true,
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
  imports: [ProfileComponent,DocumentComponent,NgIf,NavigationComponent,ApplicationsComponent]
})
export class AccountComponent implements OnInit{
  constructor(
    private userCookieService:UserCookieService,
    private router:Router
  ){}
  ngOnInit(): void {
    const userAuthData = this.userCookieService.getUserAuthData()
    if(userAuthData===null){
      this.router.navigateByUrl('/login')
      return
    }
  }
  activeTab: 'profile' | 'documents' | 'applications' = 'profile';
}
