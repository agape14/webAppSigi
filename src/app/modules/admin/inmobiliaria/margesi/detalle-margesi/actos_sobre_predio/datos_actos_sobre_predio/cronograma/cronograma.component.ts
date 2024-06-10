import { LiveAnnouncer } from "@angular/cdk/a11y";
import { TextFieldModule } from "@angular/cdk/text-field";
import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, ViewChild, ViewEncapsulation, inject } from "@angular/core";
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, UntypedFormGroup } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatOptionModule } from "@angular/material/core";
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
    estado: string;
    cuota: string;
    ano: string;
    mes: string;
    vencimiento: string;
    renta: string;
    interes_acum: string;
    adicional: string;
    total_pagar: string;
    estado_1: string;
    cancelado: string;
    fecha_pago: string;
    canal: string;
    fecha_limite_depago_emilia: string;
    enviado_banco: string;
    accion_banco: string;
    tipo_comprob: string;
    ruc: string;
    comprob_emitid_nombre: string;
    concepto: string;
  }


const ELEMENT_DATA: DataExample[] = [
    {
        position: 1,
        estado: "Activa",
        cuota: "1",
        ano: "2024",
        mes: "06",
        vencimiento: "2024-06-15",
        renta: "100.00",
        interes_acum: "0.00",
        adicional: "0.00",
        total_pagar: "100.00",
        estado_1: "Pendiente",
        cancelado: "No",
        fecha_pago: null,
        canal: null,
        fecha_limite_depago_emilia: null,
        enviado_banco: "No",
        accion_banco: null,
        tipo_comprob: null,
        ruc: "12345678901",
        comprob_emitid_nombre: "Empresa S.A.",
        concepto: "Cuota 1 - 2024"
      },
      {
        position: 2,
        estado: "Activa",
        cuota: "2",
        ano: "2024",
        mes: "07",
        vencimiento: "2024-07-15",
        renta: "100.00",
        interes_acum: "0.00",
        adicional: "0.00",
        total_pagar: "100.00",
        estado_1: "Pendiente",
        cancelado: "No",
        fecha_pago: null,
        canal: null,
        fecha_limite_depago_emilia: null,
        enviado_banco: "No",
        accion_banco: null,
        tipo_comprob: null,
        ruc: "12345678901",
        comprob_emitid_nombre: "Empresa S.A.",
        concepto: "Cuota 2 - 2024"
      },
      {
        position: 3,
        estado: "Activa",
        cuota: "3",
        ano: "2024",
        mes: "08",
        vencimiento: "2024-08-15",
        renta: "100.00",
        interes_acum: "0.00",
        adicional: "0.00",
        total_pagar: "100.00",
        estado_1: "Pendiente",
        cancelado: "No",
        fecha_pago: null,
        canal: null,
        fecha_limite_depago_emilia: null,
        enviado_banco: "No",
        accion_banco: null,
        tipo_comprob: null,
        ruc: "12345678901",
        comprob_emitid_nombre: "Empresa S.A.",
        concepto: "Cuota 3 - 2024"
      }
  ];


@Component({
    selector: 'margesi-actos-sobre-predio-cronograma',
    templateUrl: './cronograma.component.html',
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [FormsModule, ReactiveFormsModule, MatFormFieldModule, MatIconModule, MatInputModule, TextFieldModule, 
        MatSelectModule, MatOptionModule, MatButtonModule, MatSlideToggleModule, 
        MatPaginatorModule,  MatSortModule, MatTableModule],
      })
  export class MargesiActosSobrePredioCronograma{
    _liveAnnouncer = inject(LiveAnnouncer);
    pagination: IncorporacionPagination;
    dataSource = new MatTableDataSource<DataExample>(ELEMENT_DATA);
    @ViewChild(MatSort) sort: MatSort;

    @ViewChild(MatPaginator) paginator: MatPaginator;

    ngAfterViewInit() {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
    displayedColumns: string[] = [
'position', 'estado', 'cuota', 'ano', 'mes', 'vencimiento', 'renta', 'interes_acum', 'adicional', 'total_pagar', 'estado_1', 'cancelado', 'fecha_pago', 'canal', 'fecha_limite_depago_emilia', 'enviado_banco', 'accion_banco', 'tipo_comprob', 'ruc', 'comprob_emitid_nombre', 'concepto'
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