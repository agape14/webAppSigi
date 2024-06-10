import { TextFieldModule } from "@angular/cdk/text-field";
import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, ViewEncapsulation, inject } from "@angular/core";
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, UntypedFormGroup } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatOptionModule } from "@angular/material/core";
import {  MatDatepickerModule } from "@angular/material/datepicker";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";



@Component({
    selector: 'margesi-delosdatoslegales-datosgenerales',
    templateUrl: './datos_generales.component.html',
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [FormsModule, ReactiveFormsModule, MatFormFieldModule, MatIconModule, MatInputModule, TextFieldModule, 
        MatSelectModule, MatOptionModule, MatButtonModule, MatSlideToggleModule, 
    MatDatepickerModule],
      })
  export class DelosDatosLegalesDatosGeneralesMargesi{
    datosGeneralesForm: UntypedFormGroup;
    _formBuilder = inject(FormBuilder);

    ngOnInit(): void
    {
        // Create the form
        this.datosGeneralesForm = this._formBuilder.group({
            forma_adquisicion: ['ADJUDICACION'],
            detalle: ['ADJUDICACION'],
            titulo_Registral: ['OTROS'],
            dispositivo__Legal: ['22-40041613.pdf'],
            antecedentes_registrales_tomo_foja: [''],
            ficha: [''],
            partida: ['40041613'],
            titular_registral: ['Municipalidad Metropolitana de Lima'],
            fecha_inscripcion: ['08/09/2005'],
            area_Registral: ['8.38'],
            m2fabricainscrita: ['NO'],
            fechafabrica: [''],
            dominio: ['PRIVADO'],
            entidad_Administradora: ['EMILIMA'],
            observaciones: [''],

        });
    }
}