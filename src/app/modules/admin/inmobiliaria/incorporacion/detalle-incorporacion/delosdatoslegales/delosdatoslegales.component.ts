import { AsyncPipe, CurrencyPipe, NgClass, NgFor, NgIf, NgTemplateOutlet, NgSwitch, NgSwitchCase  } from '@angular/common';
import { TextFieldModule } from '@angular/cdk/text-field';
import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormsModule, ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDatepickerModule } from '@angular/material/datepicker';

@Component({
  selector: 'incorporacion-delosdatoslegales',
  templateUrl: './delosdatoslegales.component.html',
  encapsulation  : ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, MatFormFieldModule, MatIconModule, MatInputModule, TextFieldModule, 
            MatSelectModule, MatOptionModule, MatButtonModule, MatSlideToggleModule, MatDatepickerModule, NgClass, NgFor, NgIf],
})
export class DelosdatoslegalesComponent implements OnInit{
  delosdatoslegalesForm: UntypedFormGroup;
  formFieldFecFabrica: UntypedFormGroup;
  formFieldFechaInsc: string[] = [''];
  
  constructor(private _formBuilder: UntypedFormBuilder,)
  {

  }
  ngOnInit(): void
  {
      // Create the form
      this.delosdatoslegalesForm = this._formBuilder.group({
        observaciones     : ['Registro de Inmueble Espacio (solo cocina) ubicado en el km. 6.5 Piedra Liza - Rímac'],
          formaadquisicion: ['aportecapital'],
          detformaadquisicion: [''],

          tituloregistral: ['ley'],
          dispositivolegal: [''],

          antregtomofoja: [''],
          antregficha: [''],
          antregpartida: [''],

          titregactual: ['corporacion'],
          fechaInscripcion: [''],

          arearegistral: [''],
          fabinscrita: [''],
          fechaFabrica: [''],
          dominio: [''],

          entadministradora: [''],

          tipobiencultural: ['ambiente'],
          nameadjunto: [''],

          microzona: ['Microzonaa3'],
          tipointerv: ['conservacion'],

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
