import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { NavigationComponent } from '../navigation/navigation.component';

@Component({
  selector: 'app-stats',
  standalone:true,
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss'],
  imports:[NavigationComponent]
})
export class StatsComponent implements OnInit {
  totalRooms = 156;
  occupiedRooms = 124;
  totalApplications = 342;
  avgApplications = 2.2;

  ngOnInit(): void {
    Chart.register(...registerables);
    this.createOccupancyChart();
    this.createApplicationsChart();
  }

  private createOccupancyChart(): void {
    const ctx = document.getElementById('occupancyChart') as HTMLCanvasElement;
    new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['Заселено', 'Свободно'],
        datasets: [{
          data: [this.occupiedRooms, this.totalRooms - this.occupiedRooms],
          backgroundColor: [
            '#4CAF50',
            '#F44336'
          ],
          borderWidth: 0
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              font: {
                family: 'Roboto',
                size: 14
              },
              color: '#fff'
            }
          }
        },
        cutout: '70%'
      }
    });
  }

  private createApplicationsChart(): void {
    // Пример данных - топ 10 комнат по заявкам
    const topRooms = ['A-204', 'B-105', 'C-301', 'D-412', 'E-207', 'F-309', 'G-118', 'H-205', 'I-306', 'J-104'];
    const applicationsCount = [42, 38, 35, 28, 25, 22, 19, 17, 15, 13];

    const ctx = document.getElementById('applicationsChart') as HTMLCanvasElement;
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: topRooms,
        datasets: [{
          label: 'Количество заявок',
          data: applicationsCount,
          backgroundColor: '#3F51B5',
          borderColor: '#303F9F',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            enabled: true
          }
        },
        scales: {
          x: {
            ticks: {
              color: '#b0b0b0',
              font: {
                family: 'Roboto',
                size: 12
              }
            },
            grid: {
              display: false
            }
          },
          y: {
            beginAtZero: true,
            ticks: {
              color: '#b0b0b0',
              font: {
                family: 'Roboto',
                size: 12
              }
            },
            grid: {
              color: 'rgba(255, 255, 255, 0.1)'
            }
          }
        }
      }
    });
  }
}
