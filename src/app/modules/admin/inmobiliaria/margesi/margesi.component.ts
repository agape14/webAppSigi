import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-margesi',
  templateUrl: './margesi.component.html',
  encapsulation  : ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone     : true,
  imports        : [RouterOutlet],

})
export class MargesiComponent {
  constructor()
    {
    }
}
