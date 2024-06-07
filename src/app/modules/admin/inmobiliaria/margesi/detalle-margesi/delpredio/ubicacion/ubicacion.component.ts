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
    selector: 'margesi-ubicacion',
    templateUrl: './ubicacion.component.html',
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [FormsModule, ReactiveFormsModule, MatFormFieldModule, MatIconModule, MatInputModule, TextFieldModule, 
        MatSelectModule, MatOptionModule, MatButtonModule, MatSlideToggleModule],
      })
  export class UbicacionMargesi{
    ubicacion: UntypedFormGroup;
    _formBuilder = inject(FormBuilder);

    ngOnInit(): void
    {
        // Create the form
        this.ubicacion = this._formBuilder.group({
            habilitacion       : ['245'],
            descr_habilitacion     : ['porsanear'],
            tipo_via          : ['Avenida'],
            descr_via    : ['ABANCAY'],
            num_municipal: ['N 221 - 249'],
            manzana     : ['OFICINAS DE SEGURIDAD CIUDADANA'],
            lotes     : ['Registro de Inmueble Espacio (solo cocina) ubicado en el km. 6.5 Piedra Liza - Rímac'],
            nro_interior: [],
            distrito: [],
            zona: [],
            abcisa: [],
            Norte: [],
            Altitud: ['-77.026633'],
            Latitud: ['-12.048168']
  
        });
    }
}