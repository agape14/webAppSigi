import { AsyncPipe, CurrencyPipe, NgClass, NgFor, NgIf, NgTemplateOutlet, NgSwitch, NgSwitchCase  } from '@angular/common';
import { Component, OnInit, ViewEncapsulation,ViewChild, ChangeDetectorRef } from '@angular/core';
import { FormsModule, ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators,FormBuilder, FormGroup } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatStepperModule } from '@angular/material/stepper';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSlideToggleChange, MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDrawer, MatSidenavModule } from '@angular/material/sidenav';
import { Subject, takeUntil } from 'rxjs';
import { FuseMediaWatcherService } from '@fuse/services/media-watcher';
import { DatosGeneralesMargesi } from './delpredio/datos_generales/datos_generales.component';
import { UbicacionMargesi } from './delpredio/ubicacion/ubicacion.component';
import { FotosMargesi } from './delpredio/fotos/fotos.component';
import { DelosDatosLegalesDatosGeneralesMargesi } from './delosdatoslegales/datos_generales/datos_generales.component';
import { DelosDatosLegalesAspectosCulturalesMargesi } from './delosdatoslegales/aspectos_culturales/aspectos_culturales.component';
import { DelosDatosTecnicosDatosGenerales } from './delosdatostecnicos/datos_generales/datos_generales.component';
import { DelosDatosTecnicosLinderosMargesi } from './delosdatostecnicos/linderos/linderos.component';
import { DelosDatosTecnicosReferenciasMargesi } from './delosdatostecnicos/referencias/referencias.component';
import { DelosDatosTecnicosOcupacionMargesi } from './delosdatostecnicos/ocupacion/ocupacion.component';
import { DelosDatosTecnicosCaractUsosDelSuelo } from './delosdatostecnicos/caract_usos_del_suelo/caract_usos_del_suelo.component';
import { DelosDatosTecnicosEdificacionValorizacion } from './delosdatostecnicos/edificacion_y_valorizacion/edificacion_y_valorizacion.component';
import { DelosDatosTecnicosServiciosBasicosMargesi } from './delosdatostecnicos/servicios_basicos/servicios_basicos.component';
import { DelosDatosLegalesCargasMargesi } from './delosdatoslegales/cargas/cargas.component';
import { MargesiListaDeLaUnidadesInmobiliarias } from './delasunidadesinmobiliarias/lista_delas_unidades_inmobiliarias/lista_delas_unidades_inmobiliarias.component.';
import { MargesiDatosDeLaUnidadesInmobiliarias } from './delasunidadesinmobiliarias/datos_delas_unidades_inmobiliarias/datos_delas_unidades_inmobiliarias.component';
import { MargesiListaActosdePredios } from './actos_sobre_predio/lista_actos_sobre_predio/lista_actos_sobre_predio.component';
import { MargesiDatosdePredios } from './actos_sobre_predio/datos_actos_sobre_predio/datos_actos_sobre_predio.component';

@Component({
  selector: 'app-detalle-margesi',
  templateUrl: './detalle-margesi.component.html',
  encapsulation: ViewEncapsulation.None,
  standalone: true,  
  imports : [MatIconModule, FormsModule, ReactiveFormsModule, MatStepperModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatOptionModule,
    MatButtonModule, MatCheckboxModule, MatRadioModule, NgClass, MatDatepickerModule, MatSlideToggleModule, MatTabsModule,MatSidenavModule,AsyncPipe,
    CurrencyPipe, NgFor, NgIf, NgTemplateOutlet, NgSwitch, NgSwitchCase, DatosGeneralesMargesi, UbicacionMargesi, FotosMargesi, DelosDatosLegalesDatosGeneralesMargesi, DelosDatosLegalesAspectosCulturalesMargesi,
    DelosDatosTecnicosLinderosMargesi, DelosDatosTecnicosDatosGenerales, DelosDatosTecnicosReferenciasMargesi, DelosDatosTecnicosOcupacionMargesi, DelosDatosTecnicosCaractUsosDelSuelo, DelosDatosTecnicosEdificacionValorizacion,
    DelosDatosTecnicosServiciosBasicosMargesi, DelosDatosLegalesCargasMargesi, MargesiListaDeLaUnidadesInmobiliarias, MargesiDatosDeLaUnidadesInmobiliarias,
    MargesiListaActosdePredios, MargesiDatosdePredios
 ],
})
export class DetalleMargesiComponent implements OnInit{
  formFieldHelpers: string[] = [''];
  panels: any[] = [];
  panels_delosdatoslegales: any[] = [];
  panels_delosdatostecnicos: any[] = [];
  panels_delosinmobiliarios: any[] = [];
  panels_delosactospredio_lista: any[] = [];

  myForm: FormGroup;

  @ViewChild('drawer') drawer: MatDrawer;
    drawerMode: 'over' | 'side' = 'side';
    drawerOpened: boolean = true;
    selectedPanel: string = 'predio_datos_generales';
    selectedPanel2: string = 'de_los_datos_legales_datos_generales';
    selectedPanel3: string = 'de_los_datos_tecnicos_datos_generales';
    selectedPanel4: string = 'de_los_datos_lista_inmobiliarios';
    selectedPanel5: string = 'de_los_actos_predios_lista';

    private _unsubscribeAll: Subject<any> = new Subject<any>();
  
  constructor(private _formBuilder: UntypedFormBuilder,private formBuilder: FormBuilder,
    private _changeDetectorRef: ChangeDetectorRef,
    private _fuseMediaWatcherService: FuseMediaWatcherService,
  )
  {
  }

  ngOnInit(): void
    {
      // Setup available panels
      this.panels = [
        {
            id         : 'predio_datos_generales',
            icon       : 'heroicons_outline:user-circle',
            title      : 'Datos Generales',
            description: 'Ver datos generales.',
        },
        {
            id         : 'ubicacion',
            icon       : 'heroicons_outline:lock-closed',
            title      : 'Ubicacion',
            description: 'Ver ubicacion',
        },
        {
            id         : 'mapa',
            icon       : 'heroicons_outline:credit-card',
            title      : 'Mapa',
            description: 'Datos tefnicos',
        },
        {
            id         : 'fotos',
            icon       : 'heroicons_outline:bell',
            title      : 'Fotos', 
            description: 'Ver el listado de fotos de la',
        },
      ];

      this.panels_delosdatoslegales = [
        {
            id         : 'de_los_datos_legales_datos_generales',
            icon       : 'heroicons_outline:user-circle',
            title      : 'De los Datos Legales, Datos Generales',
            description: 'Ver datos legales generales.',
        },
        {
            id         : 'aspectos_culturales',
            icon       : 'heroicons_outline:lock-closed',
            title      : 'Aspectos Culturales',
            description: 'Ver Aspectos Culturales',
        },
        {
            id         : 'cargas',
            icon       : 'heroicons_outline:credit-card',
            title      : 'Cargas',
            description: 'Ver Cargas',
        },

      ];

      this.panels_delosdatostecnicos = [
        {
            id         : 'de_los_datos_tecnicos_datos_generales',
            icon       : 'heroicons_outline:user-circle',
            title      : 'Datos Generales',
            description: 'Ver datos tecnicos generales.',
        },
        {
            id         : 'linderos',
            icon       : 'heroicons_outline:lock-closed',
            title      : 'Linderos',
            description: 'Ver Linderos',
        },
        {
            id         : 'referencias',
            icon       : 'heroicons_outline:credit-card',
            title      : 'Referencias',
            description: 'Ver Referencias',
        },
        {
            id         : 'ocupacion',
            icon       : 'heroicons_outline:credit-card',
            title      : 'Ocupacion',
            description: 'Ver Ocupacion',
        },
        {
            id         : 'caracteristicas_usos_del_suelo',
            icon       : 'heroicons_outline:credit-card',
            title      : 'Caracteristicas del uso del Suelo',
            description: 'Ver Caracteristicas del uso del Suelo',
        },
        {
            id         : 'edificacion_valorizacion',
            icon       : 'heroicons_outline:credit-card',
            title      : 'Edificacion y Valorizacion',
            description: 'Ver Edificacion y Valorizacion',
        },
        {
            id         : 'servicios_basicos',
            icon       : 'heroicons_outline:credit-card',
            title      : 'Servicios Basicos',
            description: 'Ver Servicios Basicos',
        },
      ];

      this.panels_delosinmobiliarios = [
        {
            id         : 'de_los_datos_lista_inmobiliarios',
            icon       : 'heroicons_outline:user-circle',
            title      : 'Lista de los Datos Inmobiliarios',
            description: 'Ver listado inmobiliarios.',
        },
        {
            id         : 'de_los_datos_datos_inmobiliarios',
            icon       : 'heroicons_outline:lock-closed',
            title      : 'Datos de los Datos Inmobiliarios',
            description: 'Ver datos inmobiliarios',
        },
   
      ];
      this.panels_delosactospredio_lista = [
        {
            id         : 'de_los_actos_predios_lista',
            icon       : 'heroicons_outline:user-circle',
            title      : 'Lista de los Actos de Predio',
            description: 'Ver listado Actos Predios.',
        },
        {
            id         : 'de_los_datos_actos_predios_datos',
            icon       : 'heroicons_outline:lock-closed',
            title      : 'Datos de los Datos Inmobiliarios',
            description: 'Ver datos actos predios',
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

      this.myForm = this.formBuilder.group({
        datos_itl: this.formBuilder.group({
          nro_itl: [''],
          desc_nro_itl: [''],
          cod_prov_inm: [''],
          dir_prov_inm: [''],
          area: ['']
        }),

        datos_itl_2: this.formBuilder.group({
          fechaCreacion: [''],
          dato_de_itl: [''],
          dato_para_itl: [''],
          dato_estado_itl: ['']
        }),

        asuntos_itl: this.formBuilder.group({
          asunto_itl: [''],
          fechaAprobado: ['']
        }),

        referencias: [''] // Agrega el control de formulario 'referencias' aquí
      });

    }

    ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
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

    goToPanelInfoDatosLegales(panel: string): void
    {
        this.selectedPanel2 = panel;

        // Close the drawer on 'over' mode
        if ( this.drawerMode === 'over' )
        {
            this.drawer.close();
        }
    }

    goToPanelInfoDatosTecnicos(panel: string): void
    {
        this.selectedPanel3 = panel;

        // Close the drawer on 'over' mode
        if ( this.drawerMode === 'over' )
        {
            this.drawer.close();
        }
    }


    goToPanelInfoDatosInmobiliarios(panel: string): void
    {
        this.selectedPanel4 = panel;

        // Close the drawer on 'over' mode
        if ( this.drawerMode === 'over' )
        {
            this.drawer.close();
        }
    }

    goToPanelInfoActosPredio(panel: string): void
    {
        this.selectedPanel5 = panel;

        // Close the drawer on 'over' mode
        if ( this.drawerMode === 'over' )
        {
            this.drawer.close();
        }
    }

    getPanelInfo(id: string): any
    {
        return this.panels.find(panel => panel.id === id);
    }

    getPanelInfoDatosLegales(id: string): any
    {
        return this.panels_delosdatoslegales.find(panel => panel.id === id);
    }

    getPanelInfoDatosTecnicos(id: string): any
    {
        return this.panels_delosdatostecnicos.find(panel => panel.id === id);
    }

    getPanelInfoDatosInmobiliarios(id: string): any
    {
        return this.panels_delosinmobiliarios.find(panel => panel.id === id);
    }

    getPanelInfoActosPredios(id: string): any
    {
        return this.panels_delosactospredio_lista.find(panel => panel.id === id);
    }

    trackByFn(index: number, item: any): any
    {
        return item.id || index;
    }
}
