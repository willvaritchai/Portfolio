import {  NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HomeRoutes } from './home.routing';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { HomeComponent } from './home.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { PortHomeComponent } from '../port-home/port-home.component';
import { PortAboutComponent } from '../port_about/port-about.component';
import { MyExpComponent } from '../port_exp/port-exp.component';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { ProjectsComponent } from '../port_proj/port_proj.component';
import { SkillsComponent } from '../skills/skills.component';
import { MatMenuModule } from '@angular/material/menu';



@NgModule({
  declarations: [HomeComponent,
    NavbarComponent,
    PortHomeComponent,
    PortAboutComponent,
    MyExpComponent,
    ProjectsComponent,
    SkillsComponent
  ],
  imports: [
    RouterModule.forChild(HomeRoutes),
    CommonModule,
    MatIconModule,
    MatButtonModule,
    SlickCarouselModule,
    MatMenuModule,
  ],
})
export class HomeModule { }
