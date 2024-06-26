import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-ingresos',
  templateUrl: './ingresos.component.html',
  encapsulation  : ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone     : true,
  imports: [
    MatTabsModule, // Importar MatTabsModule
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    FormsModule
  ]
})
export class IngresosComponent {
  constructor()
    {
    }
}
