import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
interface applicationData {
  name: string;
  tg: string;
}
export interface roomAddData{

}
export interface roomData {
  imageUrl: string;
  id: string;
  name: string;
  peopleMax: number;
  peopleCurrent: number;
  floor: number;
  description: string;
  applications?: applicationData[];
  showAdditional?: boolean;
  applicationStatus?: 'pending' | 'approved' | 'rejected';
  message?: string;
}
@Component({
  selector: 'app-room',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss']
})
export class RoomComponent {
  @Input() roomData!: roomData;
  @Input() typeRoom!: 'application' | 'room' | 'admin';
  @Output() applicationAction = new EventEmitter<{action: string, room: roomData}>();

  showCancel = false;

  copyToClipboard(tg: string) {
    navigator.clipboard.writeText(tg).then(() => {
      alert(`Телеграм ${tg} скопирован в буфер обмена`);
    });
  }

  toggleRoomInfo(room: roomData) {
    room.showAdditional = !room.showAdditional;
  }

  applyForRoom() {
    this.applicationAction.emit({action: 'apply', room: this.roomData});
  }

  cancelApplication() {
    this.applicationAction.emit({action: 'cancel', room: this.roomData});
  }

  viewRejectionReason() {
    alert(`Причина отклонения: ${this.roomData.message || 'Не указана'}`);
  }

  approveRoom(){
    this.applicationAction.emit({action: 'approve', room: this.roomData});
  }
  rejectRoom(){
    this.applicationAction.emit({action: 'reject', room: this.roomData});
  }
}
