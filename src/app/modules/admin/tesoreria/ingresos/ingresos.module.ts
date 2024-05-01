import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IngresosComponent } from './ingresos.component';
import { MatTabsModule } from '@angular/material/tabs';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import { FormsModule } from '@angular/forms'; 

@NgModule({
  declarations: [IngresosComponent],
  imports: [
    CommonModule,
    MatTabsModule, // Agrega MatTabsModule aquí
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    // Otros módulos necesarios
  ]
})
export class IngresosModule { }
