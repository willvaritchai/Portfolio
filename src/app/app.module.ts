import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { appRoutes } from './app.routing';
import { RouterModule } from '@angular/router';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { IconsModule } from 'src/assets/icons/icons.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatRadioModule } from '@angular/material/radio';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { ForceLogOutService } from 'src/services/force-log-out/ForceLogOut.service';
import { GetExtraDataService } from 'src/services/get-extra-data/GetExtraData.service';
import { NumberOnlyServiceModule } from 'src/services/number-only/NumberOnly.module';
import { CustomDateFormatPipe } from 'src/services/custom-date-pipe/CustomDatePipeService.service';



@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes, { scrollPositionRestoration: "top" }),
    IconsModule,
    MatIconModule,
    MatRadioModule,
    MatSelectModule,
    BrowserAnimationsModule,
    FormsModule,
    CommonModule,
    MatDialogModule,

  ],
  exports: [RouterModule],
  providers: [
    ForceLogOutService,
    GetExtraDataService,
    CustomDateFormatPipe
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
