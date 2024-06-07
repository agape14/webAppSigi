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
import { MatPaginator } from "@angular/material/paginator";
import { MatSelectModule } from "@angular/material/select";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { MatSort, Sort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { IncorporacionPagination } from "app/modules/admin/inmobiliaria/incorporacion/incorporacion.types";

export interface Tabla {
    position: number;
    piso: string;
    muro: number | string;
    techo: string;
    pisos: string;
    puertas: string;
    revest: string;
    bano: string;
    area_const_verif: string;
    val_estimado: string;
    val_piso: string;
  }

const ELEMENT_DATA: Tabla[] = [
    {position: 1, piso: '323', muro: 'da', techo: '', pisos: '', puertas: '', revest: '', bano: '', area_const_verif: '', val_estimado:'', val_piso:'' 
    },
  

  ];


@Component({
    selector: 'margesi-delosdatostecnicos-servicios-basicos',
    templateUrl: './servicios_basicos.component.html',
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [FormsModule, ReactiveFormsModule, MatFormFieldModule, MatIconModule, MatInputModule, TextFieldModule, 
        MatSelectModule, MatOptionModule, MatButtonModule, MatSlideToggleModule, MatDatepicker, MatDatepickerToggle,
    MatDatepickerModule],
      })
  export class DelosDatosTecnicosServiciosBasicosMargesi{
    datosAspectosTecnicosServiciosBasicosForm: UntypedFormGroup;
    _formBuilder = inject(FormBuilder);
    _liveAnnouncer = inject(LiveAnnouncer);
    pagination: IncorporacionPagination;
    dataSource = new MatTableDataSource<Tabla>(ELEMENT_DATA);
    @ViewChild(MatSort) sort: MatSort;

    @ViewChild(MatPaginator) paginator: MatPaginator;

    ngAfterViewInit() {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
    displayedColumns: string[] = ['position', 'cod_prov', 'cod_ui', 'interior'];

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
        this.datosAspectosTecnicosServiciosBasicosForm = this._formBuilder.group({
            desague_instalado: [],
                agua_instalada: [],
                luz_instalada: [],
                desague_factura_servicios: [],
                agua_factura_servicios: [],
                luz_factura_servicios: [],
                agua_suministro: [],
                luz_suministro: [],
                proveedor_luz: [],
                proveedor_agua: [],
                agua_observacion_tecnica: [],
                luz_observacion_tecnica: []
        });
    }
}