import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoomComponent, roomData } from '../../room/room.component';
type statusType='accepted'|'pending'|'rejected'
interface application{
  idRoom:number;
  status:statusType;
  message?:string;
}
@Component({
  selector: 'app-applications',
  standalone: true,
  imports: [CommonModule,RoomComponent],
  templateUrl: './applications.component.html',
  styleUrls: ['./applications.component.scss']
})
export class ApplicationsComponent {
  applications: application[] = [
    {
      idRoom: 1,
      status: 'pending',
    },
    {
      idRoom: 2,
      status: 'accepted',
    },
    {
      idRoom: 3,
      status: 'rejected',
      message: 'Недостаточно мест'
    }
  ];
  rooms:roomData[]=[
    {
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
      showAdditional: false,
      applicationStatus: 'pending',
    },
    {
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
      showAdditional: false,
      applicationStatus: 'approved'
    },
    {
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
      showAdditional: false,
      applicationStatus: 'rejected'
    }
  ];
  getStatusText(status: string): string {
    const statusMap: Record<string, string> = {
      'pending': 'В обработке',
      'accepted': 'Одобрена',
      'rejected': 'Отклонена'
    };
    return statusMap[status] || status;
  }

  handleApplicationAction(event: {action: string, room: roomData}) {
    switch(event.action) {
      case 'apply':

        break;
      case 'cancel':
        this.cancelApplication(event.room.id);
        break;
    }
  }
  cancelApplication(idRoom:string){
    console.log(idRoom)
  }
}
