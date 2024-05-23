import { ChangeDetectionStrategy, Component, ViewEncapsulation, HostListener, ViewChild, inject  } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule, MatIconButton } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { IncorporacionPagination } from '../../inmobiliaria/incorporacion/incorporacion.types';
import { LiveAnnouncer } from '@angular/cdk/a11y';

export interface PagoArrendamiento {
  position: number;
  motivo: string;
  vencimiento: number | string;
  importe: string;
  interes_dias: string;
  dias: number;
  intereses: number;
  total: string;
}
export interface PagoVarios {
  position: number;
  motivo: string;
  detalle: string
  importe: string;
  igv: string;
  total: number;
  afectoIGV?: string;
}

export interface Ingresos extends PagoVarios { }


export interface PlanillaCobranzas {
  position: number;
  detalle: string
  importe: string;
  documento: string;
  estado: string;
}

export interface PlanillaDepositos { 
  position: number;
  banco: string;
  numero: string;
  importe: number;
  fecha_deposito: string;
  serie_rel: string;
  nro_rel: string
}
export interface NotadeCredito extends PagoVarios { }

export interface GuiadeRemision { 
  position: number;
  motivo: string;
  concepto: string;
  detalle: string;
  peso: string;
  um: string;
  bulto?: string
}

export interface Listados { 
  position: number;
  tipo_de_comprobante: string;
  serie: string;
  numero: string;
  fecha_emision: string;
  documento_identidad: string;
  ruc: string;
  nombre_completo: string;
  subtotal: string;
  igv: string;
  total: string;
  pagado: string;
  fecha_pago: string;
  planilla: string;
  pendiente: string;
  observacion: string;

}

const ELEMENT_DATA: PagoArrendamiento[] = [
  {position: 1, motivo: 'Renta comerciales 2023 noviembre', vencimiento: "31/05/2024", importe: '13,300.80', interes_dias: "0.09", dias: 0, intereses: 0.00, total: "10,300.80" },
];

const ELEMENT_DATA_PAGO_VARIOS: PagoVarios[] = [
  {position: 1, motivo: 'Reembolso por pago de servicio movil rpm', detalle: 'Renta comerciales 2023 noviembre', importe: "16.95", igv: '3.05', total: 20.00, afectoIGV: "con IGV" },
];
const ELEMENT_DATA_INGRESOS: Ingresos[] = [
  {position: 1, motivo: 'Reembolso por pago de servicio movil rpm', detalle: 'Reajuste de garantia', importe: "84.75", igv: '15.25', total: 100.00 },
];

const ELEMENT_DATA_PLANILLA_COBRANZAS: PlanillaCobranzas[] = [
  {position: 1, detalle: 'Reembolso por pago de servicio movil rpm', importe: '4.32', documento: "nota de debito BND1-2180", estado: 'VERIFICADO'},
];

const ELEMENT_DATA_PLANILLA_DEPOSITOS: PlanillaDepositos[] = [
  {position: 1, banco: 'Cuenta credito recaudado', numero: '05063937', importe: 214.35, fecha_deposito: '02/01/2024', serie_rel: 'B001', nro_rel:'14080/21'},
];

const ELEMENT_DATA_PLANILLA_NOTA_DE_CREDITO: NotadeCredito[] = [
  {position: 1, motivo: 'RENTA CASA HABITACION', detalle: 'RENTA CASA HABITACION 2024 ENE', importe: "101.69", igv: '18.31', total: 120.00, afectoIGV: "con IGV" },
];

const ELEMENT_DATA_PLANILLA_GUIA_DE_REMISION: GuiadeRemision[] = [
  {position: 1, motivo: 'TRASLADO ENTRE ESTABLECIMIENTO DE LA MISMA EMPRESA', concepto: 'ART 1700 LOCAL COMERCIAL', detalle: "detalle de la guia", peso: '90.00', um: 'C62', bulto: "" },
];

const ELEMENT_DATA_PLANILLA_LISTADO: Listados[] = [
  {position: 1, tipo_de_comprobante: 'TRASLADO ENTRE ESTABLECIMIENTO DE LA MISMA EMPRESA', serie: 'ART 1700 LOCAL COMERCIAL', numero: "detalle de la guia", fecha_emision: '90.00', 
  documento_identidad: '', ruc: '', nombre_completo: '', subtotal: '', igv:'',  total:'', pagado:'', fecha_pago:'', planilla:'', pendiente:'', observacion:''
}];


@Component({
  selector: 'app-ingresos',
  templateUrl: './ingresos.component.html',
  encapsulation  : ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone     : true,
  imports: [
    MatTabsModule, // Importar MatTabsModule
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatCheckboxModule,
    MatIconModule,
    FormsModule,
    MatTabsModule,
    MatPaginatorModule, MatSortModule, MatTableModule,
  ]
})
export class IngresosComponent {
  _liveAnnouncer = inject(LiveAnnouncer);
  pagination: IncorporacionPagination;
  dataSource = new MatTableDataSource<PagoArrendamiento>(ELEMENT_DATA);
  dataSourcePagoVarios = new MatTableDataSource<PagoVarios>(ELEMENT_DATA_PAGO_VARIOS)
  dataSourceIngresos = new MatTableDataSource<Ingresos>(ELEMENT_DATA_INGRESOS)
  dataSourcePlanillaCobranzas = new MatTableDataSource<PlanillaCobranzas>(ELEMENT_DATA_PLANILLA_COBRANZAS)
  dataSourcePlanillaDepositos = new MatTableDataSource<PlanillaDepositos>(ELEMENT_DATA_PLANILLA_DEPOSITOS)
  dataSourcePlanillaNotadeCredito = new MatTableDataSource<NotadeCredito>(ELEMENT_DATA_PLANILLA_NOTA_DE_CREDITO)
  dataSourcePlanillaGuiadeRemision = new MatTableDataSource<GuiadeRemision>(ELEMENT_DATA_PLANILLA_GUIA_DE_REMISION)
  dataSourcePlanillaListado = new MatTableDataSource<Listados>(ELEMENT_DATA_PLANILLA_LISTADO)

  @ViewChild(MatSort) sort: MatSort;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  maxHeight: number;
  constructor()
    {
      this.maxHeight = window.innerHeight;
    }
  
    @HostListener('window:resize', ['$event'])
    onResize(event) {
      this.maxHeight = window.innerHeight;
    }
    ngAfterViewInit() {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
    displayedColumns: string[] = ['position', 'motivo', 'vencimiento', 'importe',  'interes_dias', 'dias', 'intereses', 'total'];
    displayedColumnsPagoVarios: string[] = ['position', 'motivo', 'detalle', 'importe',  'igv', 'total', 'afectoIGV'];
    displayedColumnsIngresos: string[] = ['position', 'motivo', 'detalle', 'importe',  'igv', 'total'];
    displayedColumnsPlanillaCobranzas: string[] = ['position', 'detalle', 'importe',  'documento', 'estado'];
    displayedColumnsPlanillaDepositos: string[] = ['position', 'banco', 'numero',  'importe', 'fecha_deposito', 'serie_rel', 'nro_rel'];
    displayedColumnsPlanillaNotadeCredito: string[] = ['position', 'motivo', 'detalle', 'importe',  'igv', 'total', 'afectoIGV'];
    displayedColumnsPlanillaGuiadeRemision: string[] = ['position', 'motivo', 'concepto', 'detalle',  'peso', 'um', 'bulto'];
    displayedColumnsPlanillaListado: string[] = ['position', 'tipo_de_comprobante', 'serie', 'numero',  'peso', 'fecha_emision', 'documento_identidad', 'ruc', 'nombre_completo'
      , 'subtotal', 'igv', 'total', 'pagado', 'fecha_pago', 'planilla', 'obeservacion'
    ];


  
    applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }
    announceOrdenarCambio(ordenarEstado: Sort) {

        if (ordenarEstado.direction) {
          this._liveAnnouncer.announce(`Sorted ${ordenarEstado.direction}ending`);
        } else {
          this._liveAnnouncer.announce('Sorting cleared');
        }
      }
}
