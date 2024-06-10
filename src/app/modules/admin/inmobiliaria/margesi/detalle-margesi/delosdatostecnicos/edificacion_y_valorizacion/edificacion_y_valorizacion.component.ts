import { LiveAnnouncer } from "@angular/cdk/a11y";
import { TextFieldModule } from "@angular/cdk/text-field";
import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, ViewChild, ViewEncapsulation, inject } from "@angular/core";
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, UntypedFormGroup } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatOptionModule } from "@angular/material/core";
import {  MatDatepickerModule } from "@angular/material/datepicker";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import {  MatPaginator, MatPaginatorModule } from "@angular/material/paginator";
import { MatSelectModule } from "@angular/material/select";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { MatSort, MatSortModule, Sort } from "@angular/material/sort";
import { MatTableDataSource, MatTableModule } from "@angular/material/table";
import { IncorporacionPagination } from "app/modules/admin/inmobiliaria/incorporacion/incorporacion.types";


export interface DataExample {
    position: number;

    piso: string,
    estructura_muro: string,
    estructura_techo: string,
    acabados_pisos: string,
    acabados_puertas: string,
    acabados_revest: string,
    acabados_bano: string,
    area_const_veri:string,
    valor_estimado: string,
    valor_piso: string
  }

const ELEMENT_DATA: DataExample[] = [
    {
        position: 1,
        piso: 'Duplex',
        estructura_muro: 'Ladrillo',
        estructura_techo: 'Tejas',
        acabados_pisos: 'Cerámica',
        acabados_puertas: 'Madera maciza',
        acabados_revest: 'Pintura',
        acabados_bano: 'Azulejos',
        area_const_veri: '100 m²',
        valor_estimado: '$150.000',
        valor_piso: '$120.000'
      },
      {
        position: 2,
        piso: 'Piso bajo',
        estructura_muro: 'Hormigón',
        estructura_techo: 'Tejado plano',
        acabados_pisos: 'Madera',
        acabados_puertas: 'Metal',
        acabados_revest: 'Azulejos',
        acabados_bano: 'Gres porcelánico',
        area_const_veri: '80 m²',
        valor_estimado: '$120.000',
        valor_piso: '$100.000'
      },
      {
        position: 3,
        piso: 'Piso intermedio',
        estructura_muro: 'Bloque de hormigón',
        estructura_techo: 'Azotea',
        acabados_pisos: 'Mármol',
        acabados_puertas: 'PVC',
        acabados_revest: 'Papel pintado',
        acabados_bano: 'Mármol',
        area_const_veri: '120 m²',
        valor_estimado: '$200.000',
        valor_piso: '$180.000'
      },
  ];


@Component({
    selector: 'margesi-delosdatostecnicos-edificacion-valorizacion',
    templateUrl: './edificacion_y_valorizacion.component.html',
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [FormsModule, ReactiveFormsModule, MatFormFieldModule, MatIconModule, MatInputModule, TextFieldModule, 
        MatSelectModule, MatOptionModule, MatButtonModule, MatSlideToggleModule, 
    MatDatepickerModule, CommonModule, 
    MatPaginatorModule,  MatSortModule, MatTableModule],
      })
  export class DelosDatosTecnicosEdificacionValorizacion{
    datosAspectosEdificacionForm: UntypedFormGroup;
    _formBuilder = inject(FormBuilder);
    _liveAnnouncer = inject(LiveAnnouncer);
    pagination: IncorporacionPagination;
    dataSource = new MatTableDataSource<DataExample>(ELEMENT_DATA);
    @ViewChild(MatSort) sort: MatSort;
    displayedColumns: string[] = ['position', 'piso','estructura_techo', 'acabados_pisos', 'acabados_puertas', 'acabados_revest', 'acabados_bano', 'estructura_muro' ];
    announceOrdenarCambio(ordenarEstado: Sort) {

        if (ordenarEstado.direction) {
          this._liveAnnouncer.announce(`Sorted ${ordenarEstado.direction}ending`);
        } else {
          this._liveAnnouncer.announce('Sorting cleared');
        }
      }

    @ViewChild(MatPaginator) paginator: MatPaginator;
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