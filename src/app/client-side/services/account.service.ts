import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseRoute } from '.';
import { Observable } from 'rxjs';
import { accountData, changeAccountData } from '../components/account/account.component';
export interface accountRegData{
  email:string;
  password:string;
  accountType:'admin'|'student'
}
@Injectable({
  providedIn: 'root'
})
export class AccountService {
  constructor(
    private httpClient:HttpClient
  ) {}
  POSTcreateAccount(accountData:accountRegData){
    return this.httpClient.post(`${baseRoute}account/`,accountData)
  }
  GEtgetAccount(accountData:accountRegData){
    const params = new HttpParams()
      .append('email', accountData.email)
      .append('password', accountData.password)
    console.log(accountData)
    return this.httpClient.get(`${baseRoute}account/`,{params}) as Observable<accountData>
  }
  PUTupdateAccount(accountData:accountData&{email:string,password:string}){
    const params = new HttpParams()
      .append('gender', accountData.gender)
      .append('faculty', accountData.faculty)
      .append('course', accountData.course)
      .append('about', accountData.about)
      .append('tg', accountData.tg)
      .append('name', accountData.name)
      .append('email', accountData.email)
      .append('password', accountData.password)
    console.log(accountData)
    return this.httpClient.put(`${baseRoute}account/`,params) as Observable<accountData>
  }
}
