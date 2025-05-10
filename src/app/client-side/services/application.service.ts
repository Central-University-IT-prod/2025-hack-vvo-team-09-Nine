import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AccountService } from './account.service';
import { UserCookieService } from './user-cookie.service';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {
  constructor(
    private httpClient: HttpClient,
    private userCookieService: UserCookieService
  ) { }
  POSTcreateApplication(roomId: string) {
    const authData = this.userCookieService.getUserAuthData()
    const data = { roomId: roomId, ...authData }
    console.log(data)
    return this.httpClient.post(`http://localhost:5000/application/`, data)
  }
  GETgetAccountApplications() {
    const authData = this.userCookieService.getUserAuthData()!
    const params = new HttpParams()
      .append('email', authData.email)
      .append('password', authData.password)
    return this.httpClient.post(`http://localhost:5000/application/account`, {params})
  }
}
