import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationComponent } from '../navigation/navigation.component';
import { RoomsService } from '../../services/rooms.service';
import { RoomComponent, roomData } from '../room/room.component';
import { ApplicationService } from '../../services/application.service';

@Component({
  selector: 'app-find-room-page',
  standalone: true,
  imports: [CommonModule, NavigationComponent, RoomComponent],
  templateUrl: './find-room-page.component.html',
  styleUrls: ['./find-room-page.component.scss']
})
export class FindRoomPageComponent {
  constructor(
    private roomsService: RoomsService,
    private applicationService: ApplicationService
  ) { }
  tags: string[] = []

  rooms: roomData[] = []
  handleApplicationAction(event: { action: string, room: roomData }) {
    console.log(event.room)
    this.applicationService.POSTcreateApplication((event.room as any)._id)
      .subscribe({
        next: (value) => {
          console.log(value)
        },
        error:(error)=>{
          console.log(error)
        }

      })
  }
  addRequestTags(tagsArray: string[]) {
    if(tagsArray.length !== 1||tagsArray[0].length>0)this.tags=[...this.tags,...tagsArray]
    this.requestRooms()
  }
  requestRooms() {
    this.roomsService.GETrequestRooms(this.tags)
      .subscribe({
        next: value => {
          this.rooms = (value as { rooms: roomData[] }).rooms
        },
        error: error => {
          console.log(error)
        }
      })

  }
  removeTag(idTag: number) {
    delete this.tags[idTag]
    this.tags = this.tags.filter(value => value !== undefined)
  }
}
