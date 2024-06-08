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
    selector: 'margesi-actos-sobre-predio-contrato',
    templateUrl: './contrato.component.html',
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [FormsModule, ReactiveFormsModule, MatFormFieldModule, MatIconModule, MatInputModule, TextFieldModule, 
        MatSelectModule, MatOptionModule, MatButtonModule, MatSlideToggleModule, MatDatepicker, MatDatepickerToggle,
    MatDatepickerModule],
      })
  export class MargesiActosSobrePredioDelContrato{
    Formcontrato: UntypedFormGroup;
    _formBuilder = inject(FormBuilder);

    ngOnInit(): void
    {
        // Create the form
        this.Formcontrato = this._formBuilder.group({
            numero_contrato: ['VALOR DE ENTORNO'],
            numero_de_adenda: ['10504799'],
            fecha_ini: ['Antonieta Jesus Aliaga Ramirez'],
            fecha_fin: [''],
            renta: [],
            garantia: [],
            saldo_garantia: [],
            uso_generico: [],
            uso_especifico: [],
            num_fisico: [],
            fecha_firma_contrato: [],
            contrato_firmado: [],

        });
    }
}