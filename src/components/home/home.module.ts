import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HomeRoutes } from './home.routing';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { HomeComponent } from './home.component';



@NgModule({
  declarations: [HomeComponent],
  imports: [
    RouterModule.forChild(HomeRoutes),
    CommonModule,
    MatIconModule,
    MatButtonModule,
  ],
})
export class HomeModule { }
