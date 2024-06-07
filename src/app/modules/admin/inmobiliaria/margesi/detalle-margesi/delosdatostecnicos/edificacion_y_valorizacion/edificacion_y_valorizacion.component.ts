import { TextFieldModule } from "@angular/cdk/text-field";
import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, ViewEncapsulation, inject } from "@angular/core";
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, UntypedFormGroup } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatOptionModule } from "@angular/material/core";
import { MatDatepicker, MatDatepickerModule, MatDatepickerToggle } from "@angular/material/datepicker";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";



@Component({
    selector: 'margesi-delosdatostecnicos-edificacion-valorizacion',
    templateUrl: './edificacion_y_valorizacion.component.html',
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [FormsModule, ReactiveFormsModule, MatFormFieldModule, MatIconModule, MatInputModule, TextFieldModule, 
        MatSelectModule, MatOptionModule, MatButtonModule, MatSlideToggleModule, MatDatepicker, MatDatepickerToggle,
    MatDatepickerModule, CommonModule],
      })
  export class DelosDatosTecnicosEdificacionValorizacion{
    datosAspectosEdificacionForm: UntypedFormGroup;
    _formBuilder = inject(FormBuilder);

    ngOnInit(): void
    {
 

        
        // Create the form
        this.datosAspectosEdificacionForm = this._formBuilder.group({
            tipo_edificacion: [],
            n_piso: [],
            construccion_mes: [],
            construccion_ano: [],
            material_predominante: [],
            estado_de_conservacion: [],
            piso: [],
            estructura_muro: [],
            estructura_techo: [],
            acabados_pisos: [],
            acabados_puertas: [],
            acabados_revest: [],
            acabados_bano: [],
            instalacion_elect_y_sanit: [],
            area_const_veri:[],
            valor_estimado: [],
            valor_total_area: [],
            moneda: [],
            tipo_de_cambio: [],
            valor_de_terreno: [],
            valor_de_edificacion: [],
            valor_comercial: [],
            valor_dolares: [],
            valor_por_m2_terreno: [],
            valor_de_arrendamiento: [],
            fecha_valorización: [],
            informe_valorizacion: []

        });
    }
    



get edificacion_y_valorizacion(): FormArray {
    return this.datosAspectosEdificacionForm.get('edificacion_y_valorizacion') as FormArray;
}

get cantidad_estructur_piso_etc(): FormArray {
    return this.datosAspectosEdificacionForm.get('cantidad_estructur_piso_etc') as FormArray;
  }

}