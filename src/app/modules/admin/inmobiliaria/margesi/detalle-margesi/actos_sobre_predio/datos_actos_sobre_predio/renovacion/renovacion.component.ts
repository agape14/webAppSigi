import { TextFieldModule } from "@angular/cdk/text-field";
import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, ViewEncapsulation, inject } from "@angular/core";
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, UntypedFormGroup } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatOptionModule } from "@angular/material/core";
import { MatDatepicker, MatDatepickerModule, MatDatepickerToggle } from "@angular/material/datepicker";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";



@Component({
    selector: 'margesi-actos-sobre-predio-del-renovacion',
    templateUrl: './renovacion.component.html',
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [FormsModule, ReactiveFormsModule, MatFormFieldModule, MatIconModule, MatInputModule, TextFieldModule, 
        MatSelectModule, MatOptionModule, MatButtonModule, MatSlideToggleModule, MatDatepicker, MatDatepickerToggle,
    MatDatepickerModule],
      })
  export class MargesiActosSobrePredioRenovacion{
    renovacion: UntypedFormGroup;
    _formBuilder = inject(FormBuilder);

    ngOnInit(): void
    {
        // Create the form
        this.renovacion = this._formBuilder.group({
            solic_renov_contrato_fech: ['VALOR DE ENTORNO'],
            solic_renov_contrato_texto: ['10504799'],
            respuesta_arrendatario_fech: ['Antonieta Jesus Aliaga Ramirez'],
            respuesta_arrendatario_texto: [''],
            manifiesta_arrendatario: [],
            notif_reso_contrato_fech: [],
            notif_reso_contrato_texto: [],
            solicita_conciliacion_fech: [],
            solicita_conciliacion_texto: [],
            acta_conciliacion_fech: [],
            acta_conciliacion_texto: [],
            apto_renov_contrato: [],
            acciones_legales_inmueble: [],
            resolucion_contrato_fech: [],
            resolucion_contrato_texto: [],
            causales_Resolucion: [],

        });
    }
}