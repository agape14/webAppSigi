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
    fecha: string;
    carga: string;
    entidad: string;
    vigencia: string;

  }


const ELEMENT_DATA: DataExample[] = [
    {
        position: 1,
        fecha: '2024-06-06',
        carga: 'Importación de datos de clientes',
        entidad: 'Departamento de ventas',
        vigencia: '2024-06-30'
      },
      {
        position: 2,
        fecha: '2024-06-07',
        carga: 'Actualización de stock de productos',
        entidad: 'Almacén central',
        vigencia: '2024-06-30'
      },
      {
        position: 3,
        fecha: '2024-06-08',
        carga: 'Análisis de ventas del mes de mayo',
        entidad: 'Departamento de marketing',
        vigencia: '2024-06-15'
      },
      {
        position: 4,
        fecha: '2024-06-09',
        carga: 'Preparación de informe financiero trimestral',
        entidad: 'Departamento de contabilidad',
        vigencia: '2024-06-20'
      },
      {
        position: 5,
        fecha: '2024-06-10',
        carga: 'Migración de datos a nuevo sistema CRM',
        entidad: 'Departamento de TI',
        vigencia: '2024-06-25'
      },
      {
        position: 6,
        fecha: '2024-06-11',
        carga: 'Revisión de contratos con proveedores',
        entidad: 'Departamento legal',
        vigencia: '2024-06-30'
      },
      {
        position: 7,
        fecha: '2024-06-12',
        carga: 'Planificación de campaña de marketing para el próximo trimestre',
        entidad: 'Departamento de marketing',
        vigencia: '2024-06-22'
      },
      {
        position: 8,
        fecha: '2024-06-13',
        carga: 'Desarrollo de nuevas funcionalidades para la aplicación web',
        entidad: 'Departamento de TI',
        vigencia: '2024-06-28'
      },
      {
        position: 9,
        fecha: '2024-06-14',
        carga: 'Capacitación al personal sobre nuevas políticas de la empresa',
        entidad: 'Departamento de recursos humanos',
        vigencia: '2024-06-18'
      },
      {
        position: 10,
        fecha: '2024-06-15',
        carga: 'Reunión con clientes potenciales',
        entidad: 'Departamento de ventas',
        vigencia: '2024-06-21'
      }
  ];

@Component({
    selector: 'margesi-delosdatoslegales-cargas',
    templateUrl: './cargas.component.html',
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [FormsModule, ReactiveFormsModule, MatFormFieldModule, MatIconModule, MatInputModule, TextFieldModule, 
        MatSelectModule, MatOptionModule, MatButtonModule, MatSlideToggleModule, MatDatepicker, MatDatepickerToggle,
        MatPaginatorModule, MatPaginator, MatSortModule, MatSort, MatTableModule],
      })
  export class DelosDatosLegalesCargasMargesi{
    datosGeneralesForm: UntypedFormGroup;
    _formBuilder = inject(FormBuilder);
    _liveAnnouncer = inject(LiveAnnouncer);
    pagination: IncorporacionPagination;
    dataSource = new MatTableDataSource<DataExample>(ELEMENT_DATA);
    @ViewChild(MatSort) sort: MatSort;

    @ViewChild(MatPaginator) paginator: MatPaginator;

    ngAfterViewInit() {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
    displayedColumns: string[] = ['position', 'fecha', 'carga', 'entidad', 'vigencia'];

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
    ngOnInit(): void
    {
      
    }
}