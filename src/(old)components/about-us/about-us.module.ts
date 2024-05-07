import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AboutUsComponent } from './about-us.component';
import { AboutUsRoutes } from './about-us.routing';
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

@NgModule({
  declarations: [
    AboutUsComponent
  ],
  imports: [RouterModule.forChild(AboutUsRoutes),
    MatIconModule,
    MatToolbarModule,
    MatInputModule,
    MatFormFieldModule,
    CommonModule,
    MatChipsModule,
    CustomDateFormatPipeModule,
    MatTooltipModule
  ],
  providers: [],
  exports: []
})
export class AboutUsModule { }
