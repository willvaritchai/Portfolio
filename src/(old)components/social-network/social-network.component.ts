import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
@Component({
  selector: 'social-network',
  templateUrl: './social-network.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SocialNetworkComponent {
  /**
   * Constructor
   */
  constructor() {
  }
}
