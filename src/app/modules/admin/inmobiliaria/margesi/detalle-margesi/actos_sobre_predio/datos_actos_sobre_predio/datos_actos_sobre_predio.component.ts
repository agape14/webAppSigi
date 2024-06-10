import { LiveAnnouncer } from "@angular/cdk/a11y";
import { TextFieldModule } from "@angular/cdk/text-field";
import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ViewChild, ViewEncapsulation, inject } from "@angular/core";
import { FormBuilder, FormsModule, ReactiveFormsModule, UntypedFormGroup } from "@angular/forms";
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
import { MatTabGroup, MatTabsModule } from "@angular/material/tabs";
import { FuseMediaWatcherService } from "@fuse/services/media-watcher";
import { IncorporacionPagination } from "app/modules/admin/inmobiliaria/incorporacion/incorporacion.types";
import { Subject, takeUntil } from "rxjs";
import { MatDrawer, MatSidenavModule } from '@angular/material/sidenav';
import { MargesiActosSobrePredioDelArrendatario } from "./delArrendatario/delarrendatario.component";
import { MargesiActosSobrePredioDelContrato } from "./contrato/contrato.component";
import { MargesiActosSobrePredioDelFiador } from "./delFiador/delfiador.component";
import { MargesiActosSobrePredioCronograma } from "./cronograma/cronograma.component";
import { MargesiActosSobrePredioEstadoCuenta } from "./estadoCuenta/estadocuenta.component";
import { MargesiActosSobrePredioInspecciones } from "./inspecciones/inspecciones.component";
import { MargesiActosSobrePredioRenovacion } from "./renovacion/renovacion.component";
import { MargesiActosSobrePredioAplicacionGarantia } from "./aplicacion_garantia/aplicacion_garantia.component";


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
    selector: 'margesi-datos-sobre-predio',
    templateUrl: './datos_actos_sobre_predio.component.html',
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [FormsModule, ReactiveFormsModule, MatFormFieldModule, MatIconModule, MatInputModule, TextFieldModule, 
        MatSelectModule, MatOptionModule, MatButtonModule, MatSlideToggleModule, 
    MatDatepickerModule, CommonModule, 
    MatPaginatorModule,  MatSortModule, MatTableModule,
MatTabsModule, MatTabGroup, MatDrawer, MatSidenavModule,
MargesiActosSobrePredioDelArrendatario, MargesiActosSobrePredioDelContrato, MargesiActosSobrePredioDelFiador,
MargesiActosSobrePredioCronograma, MargesiActosSobrePredioEstadoCuenta,
MargesiActosSobrePredioInspecciones, MargesiActosSobrePredioRenovacion,
MargesiActosSobrePredioAplicacionGarantia
],
      })
  export class MargesiDatosdePredios{
    datos_actos_sobre_predioForm: UntypedFormGroup;
    _formBuilder = inject(FormBuilder);
    _liveAnnouncer = inject(LiveAnnouncer);
    pagination: IncorporacionPagination;
    dataSource = new MatTableDataSource<DataExample>(ELEMENT_DATA);
    @ViewChild(MatSort) sort: MatSort;
    displayedColumns: string[] = ['position','cum','cuim','acto_administracion','nro_doc_aprob','fecha_opinion_legal',
    'inicio','fin','fecha_opinion_legal','inicio','administrado','fecha_conclusion', 'estado'
 
     ];
     panels: any[] = [];
     selectedPanel: string = 'delarrendatario';
     drawerOpened: boolean = true;
     drawerMode: 'over' | 'side' = 'side';
     private _unsubscribeAll: Subject<any> = new Subject<any>();
     @ViewChild('drawer') drawer: MatDrawer;

     constructor(   private _changeDetectorRef: ChangeDetectorRef,
        private _fuseMediaWatcherService: FuseMediaWatcherService,){}
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
        this.datos_actos_sobre_predioForm = this._formBuilder.group({
            tipo_de_acto: [],
            numero: [],
            itl: [],
            cuim: [],    
        });

        this.panels = [
            {
                id         : 'delarrendatario',
                icon       : 'heroicons_outline:user-circle',
                title      : 'Del Arrendatario',
                description: 'Ver Arrendatario.',
            },
            {
                id         : 'contrato',
                icon       : 'heroicons_outline:lock-closed',
                title      : 'Del Contrato',
                description: 'Ver Contrato',
            },
            {
                id         : 'delfiador',
                icon       : 'heroicons_outline:lock-closed',
                title      : 'Del Fiador / Letra de Cambio',
                description: 'Ver Fiador / Letra de Cambio',
            },
            {
                id         : 'cronograma',
                icon       : 'heroicons_outline:lock-closed',
                title      : 'Cronograma',
                description: 'Ver Cronograma',
            },
            {
                id         : 'estado_de_cuenta',
                icon       : 'heroicons_outline:lock-closed',
                title      : 'Estado de Cuenta',
                description: 'Ver Estado de Cuenta',
            },
            {
                id         : 'inspecciones',
                icon       : 'heroicons_outline:credit-card',
                title      : 'Inspecciones',
                description: 'Ver Inspecciones',
            },
            {
                id         : 'renovacion_resolucion',
                icon       : 'heroicons_outline:bell',
                title      : 'Renovacion/Resolucion', 
                description: 'Ver Renovacion/Resolucion',
            },
            {
                id         : 'aplicacion_garantia',
                icon       : 'heroicons_outline:bell',
                title      : 'Aplicacion de Garantia', 
                description: 'Ver Aplicacion de Garantia',
            },
          ];

          this._fuseMediaWatcherService.onMediaChange$
          .pipe(takeUntil(this._unsubscribeAll))
          .subscribe(({matchingAliases}) =>
          {
              // Set the drawerMode and drawerOpened
              if ( matchingAliases.includes('lg') )
              {
                  this.drawerMode = 'side';
                  this.drawerOpened = true;
              }
              else
              {
                  this.drawerMode = 'over';
                  this.drawerOpened = false;
              }

              // Mark for check
              this._changeDetectorRef.markForCheck();
          });
    }

    trackByFn(index: number, item: any): any
    {
        return item.id || index;
    }

    getPanelInfo(id: string): any
    {
        return this.panels.find(panel => panel.id === id);
    }
    goToPanel(panel: string): void
    {
        this.selectedPanel = panel;

        // Close the drawer on 'over' mode
        if ( this.drawerMode === 'over' )
        {
            this.drawer.close();
        }
    }

}