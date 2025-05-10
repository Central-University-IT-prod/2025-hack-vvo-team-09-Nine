import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { roomData } from '../components/room/room.component';
import { baseRoute } from '.';
@Injectable({
  providedIn: 'root'
})
export class RoomsService {
  constructor(
    private httpClient: HttpClient
  ) { }
  GETrequestRooms(tags: string[]) {
    let params = new HttpParams().set('tags', tags.join(','));
    return this.httpClient.get(`${baseRoute}room/all`, {params})
  }
  POSTcreateRoom(roomData: roomData) {
    return this.httpClient.post(`${baseRoute}room/`, roomData)
  }
}
