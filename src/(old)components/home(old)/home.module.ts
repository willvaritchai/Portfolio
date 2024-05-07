import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './home.component';
import { HomeRoutes } from './home.routing';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { EventListComponent } from '../event-list/event-list.component';
import { MatChipsModule } from '@angular/material/chips';
import { CustomDateFormatPipe } from 'src/services/custom-date-pipe/CustomDatePipeService.service';
import { CustomDateFormatPipeModule } from 'src/services/custom-date-pipe/CustomDatePipeService.module';
import { MatTooltipModule } from '@angular/material/tooltip';
import { InputSearchComponent } from '../input-search/input-search.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';


@NgModule({
  declarations: [
    HomeComponent,
    EventListComponent,
    InputSearchComponent
  ],
  imports: [RouterModule.forChild(HomeRoutes),
    MatIconModule,
    MatToolbarModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    CommonModule,
    MatChipsModule,
    CustomDateFormatPipeModule,
    MatTooltipModule,
    MatProgressSpinnerModule
  ],
  providers: [],
  exports: [EventListComponent, InputSearchComponent]
})
export class HomeModule { }
