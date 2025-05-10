import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoomComponent, roomData } from '../room/room.component';
import { accountData } from '../account/account.component';
import { NavigationComponent } from '../navigation/navigation.component';
interface applicationServer {
  message?: string;
  applicationStatus?: 'pending' | 'approved' | 'rejected';
  accountId: string;
  roomId: string;
}
interface applicationClient {
  account: accountData,
  room: roomData
}
@Component({
  selector: 'app-consider',
  standalone: true,
  imports: [CommonModule, RoomComponent,NavigationComponent],
  templateUrl: './consider.component.html',
  styleUrls: ['./consider.component.scss']
})
export class ConsiderComponent {
  applications: applicationClient[] = [
    {room:{
        id: '1',
        name: "A-204",
        peopleMax: 4,
        peopleCurrent: 2,
        floor: 2,
        description: "Уютная комната с видом на внутренний двор. Есть кондиционер и рабочие столы.",
        applications: [
          { name: "Иван Иванов", tg: "@ivan_ivanov" },
          { name: "Алексей Смирнов", tg: "@smirnov_alex" }
        ],
        imageUrl: "https://images.cdn-cian.ru/images/2257438263-4.jpg",
        showAdditional: false
      },
      account:{
        gender:'male',
        faculty:'ФКН',
        course:3,
        about:'Я не знаю, что писать',
        tg:'@forezfun',
        name:'Герман Крюковский',
        accountType:'student'
      }
    },
    {room:{
        id: '1',
        name: "A-204",
        peopleMax: 4,
        peopleCurrent: 2,
        floor: 2,
        description: "Уютная комната с видом на внутренний двор. Есть кондиционер и рабочие столы.",
        applications: [
          { name: "Иван Иванов", tg: "@ivan_ivanov" },
          { name: "Алексей Смирнов", tg: "@smirnov_alex" }
        ],
        imageUrl: "https://images.cdn-cian.ru/images/2257438263-4.jpg",
        showAdditional: false
      },
      account:{
        gender:'male',
        faculty:'ФКН',
        course:3,
        about:'Я не знаю, что писать',
        tg:'@forezfun',
        name:'Герман Крюковский',
        accountType:'student'
      }
    }
  ]
  currentId: number = 0
  isCharacteristicsModalOpen:boolean=false
  openCharacteristicsModal(){
    this.isCharacteristicsModalOpen=true
  }
  closeCharacteristicsModal(){
    this.isCharacteristicsModalOpen=false
  }
  handleApplicationAction(event: {action: string, room: roomData}) {

  }
}
