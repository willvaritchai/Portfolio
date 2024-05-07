import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ChatsComponent } from './event-chat/event-chats.component';
import { ChatsRoutes } from './chats.routing';
import { CommonModule } from '@angular/common';
// import { BrowserModule } from '@angular/platform-browser';
import { MatToolbarModule } from '@angular/material/toolbar';
import { HttpClientModule } from '@angular/common/http';
import { IconsModule } from 'src/assets/icons/icons.module';
import { MatIconModule } from '@angular/material/icon';
import { ChatsListComponent } from './chat-list.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { ReviewComponent } from './review/review.component';
import { StarRatingModule } from 'angular-star-rating';
import { DoneComponent } from './done/done.component';
import { MatTooltipModule } from '@angular/material/tooltip';




@NgModule({
  declarations: [
    ChatsComponent,
    ChatsListComponent,
    ReviewComponent,
    DoneComponent
  ],
  imports: [
    RouterModule.forChild(ChatsRoutes),
    CommonModule,
    MatToolbarModule,
    // BrowserModule,
    HttpClientModule,
    FormsModule,
    MatIconModule,
    MatExpansionModule,
    MatDialogModule,
    MatMenuModule,
    MatTooltipModule,
    StarRatingModule.forRoot(),
    // EventDetailModule
    // NgbModal,
    // AppRoutingModule
  ],
  providers: [],
  // bootstrap: [AppComponent]
})
export class ChatsModule { }
