import { AsyncPipe, CurrencyPipe, NgClass, NgFor, NgIf, NgTemplateOutlet, NgSwitch, NgSwitchCase  } from '@angular/common';
import { TextFieldModule } from '@angular/cdk/text-field';
import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormArray, FormsModule, ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDatepickerModule } from '@angular/material/datepicker';

@Component({
  selector: 'incorporacion-delosdatostecnicos',
  templateUrl: './delosdatostecnicos.component.html',
  encapsulation  : ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, MatFormFieldModule, MatIconModule, MatInputModule, TextFieldModule,
            MatSelectModule, MatOptionModule, MatButtonModule, MatSlideToggleModule, MatDatepickerModule, NgClass, NgFor, NgIf],
})
export class DelosdatostecnicosComponent {
    delosdatostecnicosForm: UntypedFormGroup;
    formFieldFecFabrica: UntypedFormGroup;
    formFieldFechaInsc: string[] = [''];

    constructor(private _formBuilder: UntypedFormBuilder,)
    {

    }

    ngOnInit(): void
    {
        // Create the form
        this.delosdatostecnicosForm = this._formBuilder.group({
            fecha_ultima_expedicion: [''],
            codigo_catastral: [''],
            zonificacion: [''],
            zonificacion_combo: [''],
            area_total: [''],
            area_techada: [''],
            area_libre: [''],
            linderos: this._formBuilder.array([]),
            referencias: this._formBuilder.array([]),
            ocupacion: this._formBuilder.array([]),
            caracteristicas_uso_del_suelo: this._formBuilder.array([]),
            edificacion_y_valorizacion: this._formBuilder.array([]),
            servicios_basicos: this._formBuilder.array([])

        });
        this.configListLinderos()
        this.configReferencias();
        this.configOcupacion();
        this.configCaractDelSuelo();
        this.configEdificacionValorizacion();
        this.configServiciosBasicos();
    }

    get linderos(): FormArray {
        return this.delosdatostecnicosForm.get('linderos') as FormArray;
    }

    get referencias(): FormArray {
        return this.delosdatostecnicosForm.get('referencias') as FormArray;
    }

    get ocupacion(): FormArray {
        return this.delosdatostecnicosForm.get('ocupacion') as FormArray;
    }

    get caracteristicas_uso_del_suelo(): FormArray {
        return this.delosdatostecnicosForm.get('caracteristicas_uso_del_suelo') as FormArray;
    }

    get edificacion_y_valorizacion(): FormArray {
        return this.delosdatostecnicosForm.get('edificacion_y_valorizacion') as FormArray;
    }

    get servicios_basicos(): FormArray {
        return this.delosdatostecnicosForm.get('servicios_basicos') as FormArray;
    }


    configListLinderos():void {
        const linderos = this.delosdatostecnicosForm.get('linderos') as FormArray;


        while (linderos.length !== 0) {
            linderos.removeAt(0);
          }


          for (let i = 0; i < 4; i++) {

          linderos.push(
            this._formBuilder.group({
              linder_user: [''],
              colidancia_registral: [''],
              tramos: [''],
              distancia: [''],
              nro_municipal: ['']
            })
          );
        }
    }

    configReferencias():void {
        const referencias = this.delosdatostecnicosForm.get('referencias') as FormArray;

        referencias.push(
            this._formBuilder.group({
                nombre_de_la_via: [],
                proximidad_a_esquina: [],
                ml_orientacion_hacia_esquina: [],
                nombre_de_la_via_2: [],
                distancia_a_la_via_principal: [],
                ml_orientacion_hacia_esquina2: [],
                acceso: []
            })
        )
    }

    configOcupacion():void {
        const ocupacion = this.delosdatostecnicosForm.get('ocupacion') as FormArray;

        ocupacion.push(
            this._formBuilder.group({
                oocupacion: [],
                situacion_legal: [],
                nivel_ocupacion: [],
                porcentaje_area_ocupada: [],
                antiguedad_desde: [],
                antiguedad_hasta: [],
                anos: [],
                meses: [],
                dias: [],
                ocupante: [],
                tipo_de_doc: [],
                numero_de_doc: []
            })
        )
    }

    configCaractDelSuelo(){
        const caracteristicas_uso_del_suelo = this.delosdatostecnicosForm.get('caracteristicas_uso_del_suelo') as FormArray;

        caracteristicas_uso_del_suelo.push(
            this._formBuilder.group({
                topografia: [],
                tipo_de_suelo: [],
                tipo_de_predio: [],
                detalle: [],
                nivel_de_uso: [],
                uso_generico: [],
                uso_especifico: [],
                otra_informacion: []
            })
        )
    }

    configEdificacionValorizacion(){
        const edificacion_y_valorizacion = this.delosdatostecnicosForm.get('edificacion_y_valorizacion') as FormArray;

        edificacion_y_valorizacion.push(
            this._formBuilder.group({
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
            })
        )
    }

    configServiciosBasicos(){
        const servicios_basicos = this.delosdatostecnicosForm.get('servicios_basicos') as FormArray;

        servicios_basicos.push(
            this._formBuilder.group({
                desague_instalado: [],
                agua_instalada: [],
                luz_instalada: [],
                desague_factura_servicios: [],
                agua_factura_servicios: [],
                luz_factura_servicios: [],
                agua_suministro: [],
                luz_suministro: [],
                proveedor: [],
                agua_observacion_tecnica: [],
                luz_observacion_tecnica: []
            })
        )
    }



}
