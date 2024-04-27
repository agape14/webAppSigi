import { CommonModule,NgClass } from '@angular/common';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormsModule, ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators,FormBuilder, FormGroup } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatStepperModule } from '@angular/material/stepper';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSlideToggleChange, MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';

@Component({
  selector: 'app-detalle-incorporacion',
  templateUrl: './detalle-incorporacion.component.html',
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports : [MatIconModule, FormsModule, ReactiveFormsModule, MatStepperModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatOptionModule, MatButtonModule, MatCheckboxModule, MatRadioModule, NgClass, MatDatepickerModule, MatSlideToggleModule, MatTabsModule],
})
export class DetalleIncorporacionComponent implements OnInit{
  formFieldHelpers: string[] = [''];
  panels: any[] = [];
  myForm: FormGroup;
  constructor(private _formBuilder: UntypedFormBuilder,private formBuilder: FormBuilder)
  {
  }

  ngOnInit(): void
    {
      // Setup available panels
      this.panels = [
        {
            id         : 'delpredio',
            icon       : 'heroicons_outline:user-circle',
            title      : 'Del Predio',
            description: 'Ver datos generales, ubicacion y mapa.',
        },
        {
            id         : 'delosdatoslegales',
            icon       : 'heroicons_outline:lock-closed',
            title      : 'De los datos Legales',
            description: 'Ver datos legales: generales, aspectos culturales y cargas.',
        },
        {
            id         : 'delosdatostecnicos',
            icon       : 'heroicons_outline:credit-card',
            title      : 'De los datos Técnicos',
            description: 'Ver datos generales, linderos, referencias, ocupacion, uso del suelo, edificacion y valorizacion, servicios basicos',
        },
        {
            id         : 'delasunidadesinmobiliarias',
            icon       : 'heroicons_outline:bell',
            title      : 'De las unidades Inmobiliarias',
            description: 'Ver el listado de las unidades inmobiliariasy datos de la unidad inmobiliaria',
        },
      ];

      this.myForm = this.formBuilder.group({
        datos_itl: this.formBuilder.group({
          // Agrega aquí tus controles de formulario
          nro_itl: [''],
          desc_nro_itl: [''],
          cod_prov_inm: [''],
          dir_prov_inm: [''],
          area: ['']
        }),

        datos_itl_2: this.formBuilder.group({
          // Agrega aquí tus controles de formulario
          fechaCreacion: [''],
          dato_de_itl: [''],
          dato_para_itl: [''],
          dato_estado_itl: ['']
        }),

        asuntos_itl: this.formBuilder.group({
          // Agrega aquí tus controles de formulario
          asunto_itl: [''],
          fechaAprobado: ['']
        }),
        // Otros grupos de formulario y controles aquí...
      });
    }
    getPanelInfo(id: string): any
    {
        return this.panels.find(panel => panel.id === id);
    }

}
