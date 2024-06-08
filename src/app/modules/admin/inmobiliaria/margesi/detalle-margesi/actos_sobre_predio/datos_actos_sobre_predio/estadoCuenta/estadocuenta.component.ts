import { LiveAnnouncer } from "@angular/cdk/a11y";
import { TextFieldModule } from "@angular/cdk/text-field";
import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, ViewChild, ViewEncapsulation, inject } from "@angular/core";
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, UntypedFormGroup } from "@angular/forms";
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
    concepto: string;
    cuota: string;
    ano: string;
    mes: string;
    importe: string;
    interes_diario: string;
    interes_atraso: string;
    interes_acum: string;
    total: string;
    estado: string;
    emitido: string;
    cancelado: string;
    ticket: string;
    fecha_pago: string;
    documento_pago: string;
    fecha_vence: string;
    fecha_registro: string;
    inicio_banco: string;
    vence_banco: string;
  }





@Component({
    selector: 'margesi-actos-sobre-predio-estado-cuenta',
    templateUrl: './estadocuenta.component.html',
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [FormsModule, ReactiveFormsModule, MatFormFieldModule, MatIconModule, MatInputModule, TextFieldModule, 
        MatSelectModule, MatOptionModule, MatButtonModule, MatSlideToggleModule, MatDatepicker, MatDatepickerToggle,
        MatPaginatorModule, MatPaginator, MatSortModule, MatSort, MatTableModule, CommonModule],
      })
  export class MargesiActosSobrePredioEstadoCuenta{
    dataArray1: DataExample[] = [
        {
            position: 1,
            concepto: "Pago mensual",
            cuota: "1",
            ano: "2024",
            mes: "06",
            importe: "100.00",
            interes_diario: "0.00",
            interes_atraso: "0.00",
            interes_acum: "0.00",
            total: "100.00",
            estado: "Pendiente",
            emitido: "2024-06-01",
            cancelado: "No",
            ticket: null,
            fecha_pago: null,
            documento_pago: null,
            fecha_vence: "2024-06-15",
            fecha_registro: "2024-06-01",
            inicio_banco: null,
            vence_banco: null,
          },
          {
            position: 2,
            concepto: "Pago mensual",
            cuota: "2",
            ano: "2024",
            mes: "07",
            importe: "100.00",
            interes_diario: "0.00",
            interes_atraso: "0.00",
            interes_acum: "0.00",
            total: "100.00",
            estado: "Pendiente",
            emitido: "2024-07-01",
            cancelado: "No",
            ticket: null,
            fecha_pago: null,
            documento_pago: null,
            fecha_vence: "2024-07-15",
            fecha_registro: "2024-07-01",
            inicio_banco: null,
            vence_banco: null,
          },
          {
            position: 3,
            concepto: "Pago mensual",
            cuota: "3",
            ano: "2024",
            mes: "08",
            importe: "100.00",
            interes_diario: "0.00",
            interes_atraso: "0.00",
            interes_acum: "0.00",
            total: "100.00",
            estado: "Pendiente",
            emitido: "2024-08-01",
            cancelado: "No",
            ticket: null,
            fecha_pago: null,
            documento_pago: null,
            fecha_vence: "2024-08-15",
            fecha_registro: "2024-08-01",
            inicio_banco: null,
            vence_banco: null,
          }
    ];
    _liveAnnouncer = inject(LiveAnnouncer);
    pagination: IncorporacionPagination;
    dataSource = new MatTableDataSource<DataExample>(this.dataArray1);
    @ViewChild(MatSort) sort: MatSort;
    textLimit: number= 50;
    @ViewChild(MatPaginator) paginator: MatPaginator;

    ngAfterViewInit() {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
    displayedColumns: string[] = [
        'position', 'concepto', 'cuota', 'ano', 'mes', 'importe', 'interes_diario', 'interes_atraso', 'interes_acum', 'total', 'estado', 'emitido', 'cancelado', 'ticket', 'fecha_pago', 'documento_pago', 'fecha_vence', 'fecha_registro', 'inicio_banco', 'vence_banco'
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
      showMore(text: string) {
        return text.length > this.textLimit ? text.substring(0, this.textLimit) + '...' : text;
      }
}