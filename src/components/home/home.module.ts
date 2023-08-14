import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './home.component';
import { HomeRoutes } from './home.routing';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  declarations: [HomeComponent],
  imports: [RouterModule.forChild(HomeRoutes),CommonModule],
  providers: [],
})
export class HomeModule {}
