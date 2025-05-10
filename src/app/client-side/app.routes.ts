import { Routes } from '@angular/router';
import { FindRoomPageComponent } from './components/find-room-page/find-room-page.component';
import { AccountComponent } from './components/account/account.component';
import { StatsComponent } from './components/stats/stats.component';
import { LoginComponent } from './components/login/login.component';
import { ConsiderComponent } from './components/consider/consider.component';
import { RoomsAddComponent } from './components/rooms-add/rooms-add.component';

export const routes: Routes = [
  {path:'',component:FindRoomPageComponent},
  {path:'account',component:AccountComponent},
  {path:'stats',component:StatsComponent},
  {path:'login',component:LoginComponent},
  {path:'consider',component:ConsiderComponent},
  {path:'roomsadd',component:RoomsAddComponent},
];
