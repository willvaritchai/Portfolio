import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
@Component({
  selector: 'user-management',
  templateUrl: './user-management.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserManagementComponent {
  /**
   * Constructor
   */
  constructor() {
  }
}
