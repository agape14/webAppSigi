import { TextFieldModule } from "@angular/cdk/text-field";
import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, ViewEncapsulation, inject } from "@angular/core";
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, UntypedFormGroup } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatOptionModule } from "@angular/material/core";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";



@Component({
    selector: 'margesi-datos-generales',
    templateUrl: './datos_generales.component.html',
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [FormsModule, ReactiveFormsModule, MatFormFieldModule, MatIconModule, MatInputModule, TextFieldModule, 
        MatSelectModule, MatOptionModule, MatButtonModule, MatSlideToggleModule],
      })
  export class DatosGeneralesMargesi{
    datos_generales: UntypedFormGroup;
    _formBuilder = inject(FormBuilder);

    ngOnInit(): void
    {
        // Create the form
        this.datos_generales = this._formBuilder.group({
            CUM       : ['245'],
            Estado     : ['porsanear'],
            tipoinmueble          : ['matriz'],
            denominacionpredio    : ['AV BANCAY N 221 - 249'],
            descripcionpredio     : ['OFICINAS DE SEGURIDAD CIUDADANA'],
            denominacionregistral     : ['Registro de Inmueble Espacio (solo cocina) ubicado en el km. 6.5 Piedra Liza - Rímac'],
            fotos_delainespeccion: []
  
        });
    }
}