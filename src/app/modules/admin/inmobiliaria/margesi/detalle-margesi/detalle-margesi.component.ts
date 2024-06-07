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

@Component({
  selector: 'app-detalle-margesi',
  templateUrl: './detalle-margesi.component.html',
  encapsulation: ViewEncapsulation.None,
  standalone: true,  
  imports : [MatIconModule, FormsModule, ReactiveFormsModule, MatStepperModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatOptionModule,
    MatButtonModule, MatCheckboxModule, MatRadioModule, NgClass, MatDatepickerModule, MatSlideToggleModule, MatTabsModule,MatSidenavModule,AsyncPipe,
    CurrencyPipe, NgFor, NgIf, NgTemplateOutlet, NgSwitch, NgSwitchCase, DatosGeneralesMargesi, UbicacionMargesi, FotosMargesi, DelosDatosLegalesDatosGeneralesMargesi, DelosDatosLegalesAspectosCulturalesMargesi,
    DelosDatosTecnicosLinderosMargesi, DelosDatosTecnicosDatosGenerales, DelosDatosTecnicosReferenciasMargesi, DelosDatosTecnicosOcupacionMargesi, DelosDatosTecnicosCaractUsosDelSuelo, DelosDatosTecnicosEdificacionValorizacion,
    DelosDatosTecnicosServiciosBasicosMargesi
 ],
})
export class DetalleMargesiComponent implements OnInit{
  formFieldHelpers: string[] = [''];
  panels: any[] = [];
  panels_delosdatoslegales: any[] = [];
  panels_delosdatostecnicos: any[] = [];
  myForm: FormGroup;

  @ViewChild('drawer') drawer: MatDrawer;
    drawerMode: 'over' | 'side' = 'side';
    drawerOpened: boolean = true;
    selectedPanel: string = 'datos_generales';
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
            id         : 'datos_generales',
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
            id         : 'datos_generales',
            icon       : 'heroicons_outline:user-circle',
            title      : 'Datos Generales',
            description: 'Ver datos generales.',
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
            id         : 'datos_generales',
            icon       : 'heroicons_outline:user-circle',
            title      : 'Datos Generales',
            description: 'Ver datos generales.',
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

    getPanelInfo(id: string): any
    {
        return this.panels.find(panel => panel.id === id) ;
    }

    getPanelDelosLegales(id: string): any
    {
        return this.panels_delosdatoslegales.find(panel => panel.id === id);
    }

    getPanelDelosDatosTecnicos(id: string): any
    {
        return this.panels_delosdatostecnicos.find(panel => panel.id === id);
    }

    trackByFn(index: number, item: any): any
    {
        return item.id || index;
    }
}
