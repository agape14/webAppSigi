import { LiveAnnouncer } from "@angular/cdk/a11y";
import { TextFieldModule } from "@angular/cdk/text-field";
import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ViewChild, ViewEncapsulation, inject } from "@angular/core";
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, UntypedFormGroup } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatOptionModule } from "@angular/material/core";
import {  MatDatepickerModule } from "@angular/material/datepicker";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import {  MatPaginator, MatPaginatorModule } from "@angular/material/paginator";
import { MatSelectModule } from "@angular/material/select";
import { MatDrawer, MatSidenavModule } from "@angular/material/sidenav";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { MatSort, MatSortModule, Sort } from "@angular/material/sort";
import { MatTableModule } from "@angular/material/table";
import { MatTabsModule } from "@angular/material/tabs";
import { FuseMediaWatcherService } from "@fuse/services/media-watcher";
import { IncorporacionPagination } from "app/modules/admin/inmobiliaria/incorporacion/incorporacion.types";
import { Subject, takeUntil } from "rxjs";
import { DelosDatosITLAntecedentesDelPredio } from "./antecedentes/delpredio/delpredio.component";
import { DelosDatosITLAntecedentesDelArrendatario } from "./antecedentes/delarrendatario/delarrendatario.component";
import { DelosDatosITLAntecedentesDelArrendatarioDirecto } from "./antecedentes/delarrendetariodirecto/delarrendatario.directo.component";
import { DelosDatosITLAntecedentesDelContrato } from "./antecedentes/delcontrato/delcontrato.component";
import { DelosDatosITLAntecedentesDelFiador } from "./antecedentes/delfiador/delfiador.component";
import { DelosDatosITLAntecedentesDelosDatosCobranzas } from "./antecedentes/delosdatoscobranza/delosdatoscobranza.component";
import { MargesiDatosAprobacionesitls } from "./aprobaciones/aprobaciones.component";
import { MargesiDatosDeImpresionitls } from "./datosdeimpresion/datosdeimpresion.component";
import { DelosDatosITLAntecedentesDelCaso } from "./antecedentes/antecedentesdelcaso/antecedentesdelcaso.component";
import { DelosDatosITLAnalisis } from "./analisis/analisis.component";
import { DelosDatosITLConclusiones } from "./conclusiones/conclusiones.component";




@Component({
    selector: 'margesi-datos-itls',
    templateUrl: './itls.component.html',
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [FormsModule, ReactiveFormsModule, MatFormFieldModule, MatIconModule, MatInputModule, TextFieldModule, 
        MatSelectModule, MatOptionModule, MatButtonModule, MatSlideToggleModule, 
    MatDatepickerModule, CommonModule, MatTabsModule, MatPaginatorModule,  MatSortModule, MatTableModule, MatTabsModule, MatSidenavModule,
    DelosDatosITLAntecedentesDelPredio, DelosDatosITLAntecedentesDelArrendatario,DelosDatosITLAntecedentesDelArrendatarioDirecto,
    DelosDatosITLAntecedentesDelContrato, DelosDatosITLAntecedentesDelFiador, DelosDatosITLAntecedentesDelosDatosCobranzas, MargesiDatosAprobacionesitls,
    MargesiDatosDeImpresionitls, DelosDatosITLAntecedentesDelCaso, DelosDatosITLAnalisis, DelosDatosITLConclusiones
],
      })
  export class MargesiDatositls{
    panels: any[] = [];
    selectedPanel: string = 'delarrendatario';
    drawerOpened: boolean = true;
    drawerMode: 'over' | 'side' = 'side';
    private _unsubscribeAll: Subject<any> = new Subject<any>();
    @ViewChild('drawer') drawer: MatDrawer;
    datosAdministracioniTILForm: UntypedFormGroup;
    _formBuilder = inject(FormBuilder);
    _liveAnnouncer = inject(LiveAnnouncer);
    pagination: IncorporacionPagination;
    @ViewChild(MatSort) sort: MatSort;
    displayedColumns: string[] = ['position', 'piso','estructura_techo', 'acabados_pisos', 'acabados_puertas', 'acabados_revest', 'acabados_bano', 'estructura_muro' ];
    constructor( private _changeDetectorRef: ChangeDetectorRef,
      private _fuseMediaWatcherService: FuseMediaWatcherService,){}
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
      this.datosAdministracioniTILForm = this._formBuilder.group({
        n_itil: [],
        descripcion_itil: [],
        cum: [],
        cuim: [],
        direccion: [],
        area: [],
        situacion_legal: [],
        nivel_ocupacion: [],
        areaocupada: [],
        fecha_creacion: [],
        delapersona:[],
        para:[],
        estado_itl: [],
        acto: [],
        asunto: [],
        motivo: []

      });
      this.panels = [
        {
          id         : 'delpredio',
          icon       : 'heroicons_outline:user-circle',
          title      : 'Del Predio',
          description: 'Ver Del Predio.',
        },
        {
          id         : 'delarrendatariodirecto',
          icon       : 'heroicons_outline:user-circle',
          title      : 'Del Arrendatario directo',
          description: 'Ver Arrendatario directo.',
        },
        {
          id         : 'delarrendatario',
          icon       : 'heroicons_outline:user-circle',
          title      : 'Del Arrendatario',
          description: 'Ver Arrendatario',
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
            id         : 'delosdatoscobranzas',
            icon       : 'heroicons_outline:lock-closed',
            title      : 'De los Datos Cobranzas',
            description: 'Ver De los Datos Cobranzas',
        },
        {
            id         : 'antecedentes_del_caso',
            icon       : 'heroicons_outline:lock-closed',
            title      : 'Antecedentes del Caso',
            description: 'Ver Antecedentes del Caso',
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
