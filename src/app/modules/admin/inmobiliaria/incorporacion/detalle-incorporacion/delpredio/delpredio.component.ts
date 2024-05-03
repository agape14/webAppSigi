import { TextFieldModule } from '@angular/cdk/text-field';
import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormsModule, ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleChange, MatSlideToggleModule } from '@angular/material/slide-toggle';

@Component({
  selector: 'incorporacion-delpredio',
  templateUrl: './delpredio.component.html',
  encapsulation  : ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, MatFormFieldModule, MatIconModule, MatInputModule, TextFieldModule, MatSelectModule, MatOptionModule, MatButtonModule, MatSlideToggleModule],
})
export class DelpredioComponent  implements OnInit{
  accountForm: UntypedFormGroup;

  /**
   * Constructor
   */
  constructor(
      private _formBuilder: UntypedFormBuilder,
  )
  {
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void
  {
      // Create the form
      this.accountForm = this._formBuilder.group({
          codprovinmueble       : ['245'],
          estadoprovisional     : ['porsanear'],
          tipoinmueble          : ['matriz'],
          denominacionpredio    : ['Espacio (solo cocina) ubicado en el km. 6.5 Piedra Liza - Rímac'],
          descripcionpredio     : ['OFICINAS DE SEGURIDAD CIUDADANA'],
          denominacionregistral     : ['Registro de Inmueble Espacio (solo cocina) ubicado en el km. 6.5 Piedra Liza - Rímac'],
          habilitacion: ['otros'],
          deschabilitacion: [''],
          tipovia: ['otros'],
          desctipovia: [''],
          numeromunicipal: [''],
          manzana: [''],
          lotes: [''],
          numerointerior: [''],
          distrito : ['comas'],
          zona: [''],

          abcisae: [''],
          norte: [''],
          altitud: [''],
          latitud: [''],

      });
  }
}
