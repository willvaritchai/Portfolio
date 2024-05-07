import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EventDetalComponent } from './event-detail.component';
import { EventDetalRoutes } from './event-detail.routing';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { EventListComponent } from '../event-list/event-list.component';
import { MemberComponent } from './member/member.component';
import { DetailComponent, KilometerFormatPipe } from './detail/detail.component';
import { EditEventDetalComponent } from './edit/edit-event-detail.component';
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
import { CreateEventDetalComponent } from './create-event/create-event-detail.component';
import { MatRadioModule } from '@angular/material/radio';
import { MatDialogModule } from '@angular/material/dialog';
import { MapDisplayComponent } from '../google-map/map-display.component';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSliderModule } from '@angular/material/slider'
import { EventDetalService } from './event-detail.service';
import { CustomDateFormatPipeModule } from 'src/services/custom-date-pipe/CustomDatePipeService.module';
import { NoPasteServiceModule } from 'src/services/no-paste/NoPasteService.module';
import { PreventUpDownScrollModule } from 'src/services/prevent-up-down-scroll/PreventUpDownScroll.module';
import { ForceLogOutService } from 'src/services/force-log-out/ForceLogOut.service';
import { NumberOnlyServiceModule } from 'src/services/number-only/NumberOnly.module';
import { VehicleCollectionsComponent } from './vehicle-collections/vehicle-collections.component';
import { CostTypeComponent } from './cost_type/cost-type.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CustomDateFormatPipe } from 'src/services/custom-date-pipe/CustomDatePipeService.service';

@NgModule({
  declarations: [
    EventDetalComponent,
    MemberComponent,
    DetailComponent,
    EditEventDetalComponent,
    CreateEventDetalComponent,
    VehicleCollectionsComponent,
    CostTypeComponent,
    KilometerFormatPipe
  ],
  imports: [RouterModule.forChild(EventDetalRoutes),
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
    NoPasteServiceModule,
    PreventUpDownScrollModule,
    NumberOnlyServiceModule,
    MatTooltipModule,

  ],
  providers: [],
  exports: [
    MemberComponent,
    DetailComponent
  ],
})
export class EventDetailModule { }
