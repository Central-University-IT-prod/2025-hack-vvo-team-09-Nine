import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
type userType = 'admin' | 'student'
export interface userAuthData {
  email: string,
  password: string
}
@Injectable({
  providedIn: 'root'
})
export class UserCookieService {
  constructor(
    private cookieService: CookieService
  ) {}

  /**
   * Получает тип пользователя из cookies.
   * @returns Тип пользователя ('admin' | 'student') или null, если не установлен.
   */
  getUserType(): userType | null {
    return this.cookieService.get('userType') as 'admin' | 'student' | null
  }

  /**
   * Сохраняет тип пользователя в cookies.
   * @param userType Тип пользователя ('admin' или 'student').
   */
  setUserType(userType: userType) {
    this.cookieService.set('userType', userType)
  }

  /**
   * Получает данные авторизации пользователя из cookies.
   * @returns Объект userAuthData или null, если данных нет.
   */
  getUserAuthData(): userAuthData | null {
    const userAuthData = this.cookieService.get('userAuthData')
    if (!userAuthData) return null
    return JSON.parse(userAuthData)
  }

  /**
   * Сохраняет данные авторизации пользователя в cookies.
   * @param userAuthData Объект с данными авторизации пользователя.
   */
  setUserAuthData(userAuthData: userAuthData) {
    this.cookieService.set('userAuthData', JSON.stringify(userAuthData))
  }

}
