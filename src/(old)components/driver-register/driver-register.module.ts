import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { EventListComponent } from '../event-list/event-list.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { NgxMatDatetimePickerModule, NgxMatTimepickerModule } from '@angular-material-components/datetime-picker';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
// import { OwlDateTimeModule, OwlNativeDateTimeModule } from '@danielmoncada/angular-datetime-picker';
// import {owlMomentDateTimeModule} from 'ng-pick-datetime/date-time/adapter/moment-adapter/moment-date-time.module';
// import { MatMomentDateModule } from '@angular/material-moment-adapter'; 
// import { OwlDateTimeModule, OwlNativeDateTimeModule, OWL_DATE_TIME_FORMATS } from 'ng-pick-datetime';
// import { OwlMomentDateTimeModule } from 'ng-pick-datetime-moment';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from '@danielmoncada/angular-datetime-picker';
import { MatRadioModule } from '@angular/material/radio';
import { MatDialogModule } from '@angular/material/dialog';
import { MapDisplayComponent } from '../google-map/map-display.component';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSliderModule } from '@angular/material/slider'
import { DriverRegisterComponent } from './driver-register.component';
import { DriverRegisterRoutes } from './driver-register.routing';
import {  DriverSettingComponent } from './driver-setting/driver-setting.component';
import { FilesManagementService } from 'src/services/FilesManagementService.service';
import { CustomDateFormatPipeModule } from 'src/services/custom-date-pipe/CustomDatePipeService.module';
import { NumberOnlyServiceModule } from 'src/services/number-only/NumberOnly.module';
import { PreventInputServiceModule } from 'src/services/prevent-input/PreventInput.module';
import { NoPasteServiceModule } from 'src/services/no-paste/NoPasteService.module';
import { PreventUpDownScrollModule } from 'src/services/prevent-up-down-scroll/PreventUpDownScroll.module';

@NgModule({
  declarations: [
    DriverRegisterComponent,
    DriverSettingComponent,
  ],
  imports: [RouterModule.forChild(DriverRegisterRoutes),
    MatIconModule,
    MatToolbarModule,
    MatInputModule,
    MatFormFieldModule,
    CommonModule,
    // BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    // MatDatepickerModule,
    // MatNativeDateModule,
    // BrowserModule,
    // HttpClientModule,
    // BrowserAnimationsModule,
    // // MatDatepickerModule,
    NgxMatTimepickerModule,
    MatButtonModule,
    NgxMatDatetimePickerModule,
    // MatMomentDateModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    MatIconModule,
    MatRadioModule,
    MatDialogModule,
    MapDisplayComponent,
    MatSelectModule,
    MatAutocompleteModule,
    MatSliderModule,
    CustomDateFormatPipeModule,
    NumberOnlyServiceModule,
    PreventInputServiceModule,
    NoPasteServiceModule,
    PreventUpDownScrollModule
  ],
  providers: [

  ],
  exports: [
  ],
})
export class DriverRegisterModule { }
