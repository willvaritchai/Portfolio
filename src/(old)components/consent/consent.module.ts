import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ConsentComponent } from './consent.component';
import { consentRoutes } from './consent.routing';

@NgModule({
  declarations: [ConsentComponent],
  imports: [
    RouterModule.forChild(consentRoutes),
    CommonModule,
    MatIconModule,
    MatButtonModule,
  ],
  providers: [],
})
export class ConsentModule {}
