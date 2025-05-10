import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { roomData } from '../room/room.component';
import { RoomsService } from '../../services/rooms.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { NavigationComponent } from '../navigation/navigation.component';

@Component({
  selector: 'app-rooms-add',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,NavigationComponent],
  templateUrl: './rooms-add.component.html',
  styleUrls: ['./rooms-add.component.scss']
})
export class RoomsAddComponent {

  constructor(
    private fb: FormBuilder,
    private roomService: RoomsService
  ) { }


  roomForm = this.fb.group({
    name: [null, Validators.required],
    floor: [null, Validators.required],
    capacity: [null, Validators.required],
    description: [''],
    tags:['']
  });

  submitRoom(): void {
    if (this.roomForm.invalid) return;

    const formValue = this.roomForm.value;
    const roomData = {
      peopleMax: formValue.capacity,
      peopleCurrent: 0,
      name: formValue.name,
      description: formValue.description,
      floor: formValue.floor,
      accounts:[],
      tags:formValue.tags!.split(' ')
    };

    this.roomService.POSTcreateRoom(roomData as any).subscribe({
      next: (value) => {
        console.log(value)
      },
      error: (err) => {
        console.error('Ошибка при добавлении комнаты:', err);
        alert('Произошла ошибка при добавлении комнаты');
      }
    });
  }
}
