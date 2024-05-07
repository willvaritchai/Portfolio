import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SudoSignInComponent } from './sudo-sign-in.component';
import { SudoSignInRoutes } from './sudo-sign-in.routing';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MSAL_GUARD_CONFIG, MSAL_INSTANCE, MsalBroadcastService, MsalGuard, MsalInterceptor, MsalModule, MsalService } from '@azure/msal-angular';
import { IPublicClientApplication, PublicClientApplication } from '@azure/msal-browser';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { MSALGuardConfigFactory, MSALInstanceFactory } from 'src/app/app.module';



@NgModule({
  declarations: [SudoSignInComponent],
  imports: [
    RouterModule.forChild(SudoSignInRoutes),
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MsalModule,
  ],
  providers: [
    MsalService,
    MsalGuard,
    MsalBroadcastService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MsalInterceptor,
      multi: true,
    },
    {
      provide: MSAL_INSTANCE,
      useFactory: MSALInstanceFactory,
    },
    {
      provide: MSAL_GUARD_CONFIG,
      useFactory: MSALGuardConfigFactory
    },
  ],
})
export class SudoSignInModule { }
