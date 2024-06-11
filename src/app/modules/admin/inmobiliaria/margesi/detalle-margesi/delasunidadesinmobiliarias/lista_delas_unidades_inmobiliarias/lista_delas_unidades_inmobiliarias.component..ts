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

    cum: string,
    cuim: string,
    interior: string,
    area: string,
    ocupacion: string
  }

const ELEMENT_DATA: DataExample[] = [
    {
        position: 1,
        cum: '27',
        cuim: '1',
        interior: '170',
        area: '58.28',
        ocupacion: 'Desocupado'
      },
      {
        position: 2,
        cum: '27',
        cuim: '2',
        interior: '174',
        area: '81.11',
        ocupacion: 'Ocupado'
      },
  ];


@Component({
    selector: 'margesi-lista-delas-unidades-inmobiliarias',
    templateUrl: './lista_delas_unidades_inmobiliarias.component.html',
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [FormsModule, ReactiveFormsModule, MatFormFieldModule, MatIconModule, MatInputModule, TextFieldModule, 
        MatSelectModule, MatOptionModule, MatButtonModule, MatSlideToggleModule, 
    MatDatepickerModule, CommonModule, 
    MatPaginatorModule,  MatSortModule, MatTableModule],
      })
  export class MargesiListaDeLaUnidadesInmobiliarias{
    datosAspectosEdificacionForm: UntypedFormGroup;
    _formBuilder = inject(FormBuilder);
    _liveAnnouncer = inject(LiveAnnouncer);
    pagination: IncorporacionPagination;
    dataSource = new MatTableDataSource<DataExample>(ELEMENT_DATA);
    @ViewChild(MatSort) sort: MatSort;
    displayedColumns: string[] = ['position','cum','cuim','interior','area','ocupacion'

     ];
    announceOrdenarCambio(ordenarEstado: Sort) {

        if (ordenarEstado.direction) {
          this._liveAnnouncer.announce(`Sorted ${ordenarEstado.direction}ending`);
        } else {
          this._liveAnnouncer.announce('Sorting cleared');
        }
      }

    @ViewChild(MatPaginator) paginator;
    ngOnInit(): void
    {

    }
    
}