import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-document',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.scss']
})
export class DocumentComponent {
  studentCardFile: File | null = null;
  previewUrl: string | ArrayBuffer | null = null;

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.studentCardFile = input.files[0];
      
      // Превью файла
      const reader = new FileReader();
      reader.onload = () => {
        this.previewUrl = reader.result;
      };
      reader.readAsDataURL(this.studentCardFile);
    }
  }

  uploadDocument() {
    if (this.studentCardFile) {
      console.log('Загружаем файл:', this.studentCardFile);
      // Логика загрузки на сервер
    }
  }
}
