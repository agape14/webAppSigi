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
import { DelpredioComponent } from './delpredio/delpredio.component';
import { DelosdatoslegalesComponent } from './delosdatoslegales/delosdatoslegales.component';
import { DelosdatostecnicosComponent } from './delosdatostecnicos/delosdatostecnicos.component';
import { DelasunidadesComponent } from './delasunidades/delasunidades.component';
import { DelasunidadesAprobaciones } from '../aprobaciones/aprobaciones.component';


@Component({
  selector: 'app-detalle-incorporacion',
  templateUrl: './detalle-incorporacion.component.html',
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports : [MatIconModule, FormsModule, ReactiveFormsModule, MatStepperModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatOptionModule,
    MatButtonModule, MatCheckboxModule, MatRadioModule, NgClass, MatDatepickerModule, MatSlideToggleModule, MatTabsModule,MatSidenavModule,AsyncPipe,
    CurrencyPipe, NgFor, NgIf, NgTemplateOutlet, NgSwitch, NgSwitchCase,DelpredioComponent, DelosdatoslegalesComponent,DelosdatostecnicosComponent ,DelasunidadesComponent, DelasunidadesAprobaciones ],
})
export class DetalleIncorporacionComponent implements OnInit{
  formFieldHelpers: string[] = [''];
  panels: any[] = [];
  myForm: FormGroup;

  @ViewChild('drawer') drawer: MatDrawer;
    drawerMode: 'over' | 'side' = 'side';
    drawerOpened: boolean = true;
    selectedPanel: string = 'delpredio';
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
            id         : 'delpredio',
            icon       : 'heroicons_outline:user-circle',
            title      : 'Del Predio',
            description: 'Ver datos generales, ubicacion y mapa.',
        },
        {
            id         : 'delosdatoslegales',
            icon       : 'heroicons_outline:lock-closed',
            title      : 'De los datos Legales',
            description: 'Ver datos legales: generales, aspectos culturales y cargas.',
        },
        {
            id         : 'delosdatostecnicos',
            icon       : 'heroicons_outline:credit-card',
            title      : 'De los datos Técnicos',
            description: 'Ver datos generales, linderos, referencias, ocupacion, uso del suelo, edificacion y valorizacion, servicios basicos',
        },
        {
            id         : 'delasunidades',
            icon       : 'heroicons_outline:bell',
            title      : 'De las unidades Inmobiliarias',
            description: 'Ver el listado de las unidades inmobiliariasy datos de la unidad inmobiliaria',
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
        return this.panels.find(panel => panel.id === id);
    }

    trackByFn(index: number, item: any): any
    {
        return item.id || index;
    }
}
