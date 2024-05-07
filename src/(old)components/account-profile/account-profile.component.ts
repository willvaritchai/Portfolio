import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
@Component({
  selector: 'account-profile',
  templateUrl: './account-profile.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccountProfileComponent {
  /**
   * Constructor
   */
  constructor() {
  }
}
