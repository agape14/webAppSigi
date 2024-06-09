import { LiveAnnouncer } from "@angular/cdk/a11y";
import { TextFieldModule } from "@angular/cdk/text-field";
import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, ViewChild, ViewEncapsulation, inject } from "@angular/core";
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, UntypedFormGroup } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatOptionModule } from "@angular/material/core";
import { MatDatepicker, MatDatepickerModule, MatDatepickerToggle } from "@angular/material/datepicker";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatPaginator, MatPaginatorModule } from "@angular/material/paginator";
import { MatSelectModule } from "@angular/material/select";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { MatSort, MatSortModule, Sort } from "@angular/material/sort";
import { MatTableDataSource, MatTableModule } from "@angular/material/table";
import { IncorporacionPagination } from "app/modules/admin/inmobiliaria/incorporacion/incorporacion.types";


export interface DataExample {
    position: number;

    cum: string,
    cuim: string,
    acto_administracion: string,
    nro_doc_aprob: string,
    fecha_opinion_legal: string,
    inicio: string;
    fin: string;
    administrado: string;
    fecha_conclusion: string;
    estado: string;
  }

const ELEMENT_DATA: DataExample[] = [
    {
        "position": 1,
        "cum": "27",
        "cuim": "1",
        "acto_administracion": "170",
        "nro_doc_aprob": "58.28",
        "fecha_opinion_legal": "Desocupado",
        "inicio": "",
        "fin": "",
        "administrado": "",
        "fecha_conclusion": "",
        "estado": ""
      },
      {
        "position": 2,
        "cum": "35",
        "cuim": "2",
        "acto_administracion": "185",
        "nro_doc_aprob": "67.14",
        "fecha_opinion_legal": "Ocupado",
        "inicio": "2023-10-04",
        "fin": "2024-02-15",
        "administrado": "Pedro Gómez",
        "fecha_conclusion": "2024-02-15",
        "estado": "Concluido"
      },
      {
        "position": 3,
        "cum": "42",
        "cuim": "3",
        "acto_administracion": "198",
        "nro_doc_aprob": "74.39",
        "fecha_opinion_legal": "Desocupado",
        "inicio": "",
        "fin": "",
        "administrado": "",
        "fecha_conclusion": "",
        "estado": "En trámite"
      },
      {
        "position": 4,
        "cum": "18",
        "cuim": "4",
        "acto_administracion": "212",
        "nro_doc_aprob": "82.54",
        "fecha_opinion_legal": "Ocupado",
        "inicio": "2024-01-12",
        "fin": "",
        "administrado": "María Pérez",
        "fecha_conclusion": "",
        "estado": "En curso"
      },
      {
        "position": 5,
        "cum": "29",
        "cuim": "5",
        "acto_administracion": "221",
        "nro_doc_aprob": "89.69",
        "fecha_opinion_legal": "Desocupado",
        "inicio": "",
        "fin": "",
        "administrado": "",
        "fecha_conclusion": "",
        "estado": "Pendiente"
      }
  
  ];


@Component({
    selector: 'margesi-lista-actos-sobre-predio',
    templateUrl: './lista_actos_sobre_predio.component.html',
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [FormsModule, ReactiveFormsModule, MatFormFieldModule, MatIconModule, MatInputModule, TextFieldModule, 
        MatSelectModule, MatOptionModule, MatButtonModule, MatSlideToggleModule, MatDatepicker, MatDatepickerToggle,
    MatDatepickerModule, CommonModule, 
    MatPaginatorModule, MatPaginator, MatSortModule, MatSort, MatTableModule],
      })
  export class MargesiListaActosdePredios{
    _formBuilder = inject(FormBuilder);
    _liveAnnouncer = inject(LiveAnnouncer);
    pagination: IncorporacionPagination;
    dataSource = new MatTableDataSource<DataExample>(ELEMENT_DATA);
    @ViewChild(MatSort) sort: MatSort;
    displayedColumns: string[] = ['position','cum','cuim','acto_administracion','nro_doc_aprob','fecha_opinion_legal',
    'inicio','fin','administrado','fecha_conclusion', 'estado'
 
     ];
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

    }
    
}