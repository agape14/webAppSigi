import {  NgClass, NgFor, NgIf } from '@angular/common';
import { TextFieldModule } from '@angular/cdk/text-field';
import { ChangeDetectionStrategy, Component, ElementRef, OnInit, ViewEncapsulation, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatTabsModule } from '@angular/material/tabs';
import {  MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { ViewChild} from '@angular/core';
import {LiveAnnouncer} from '@angular/cdk/a11y';
import Quill from 'quill';



@Component({
  selector: 'incorporacion-aprobaciones',
  templateUrl: './aprobaciones.component.html',
  encapsulation  : ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, MatFormFieldModule, MatIconModule, MatInputModule, TextFieldModule,
            MatSelectModule, MatOptionModule, MatButtonModule, MatSlideToggleModule, MatDatepickerModule, NgClass, NgFor, NgIf, MatTabsModule,
            MatPaginatorModule,  MatSortModule, MatTableModule],
})
export class DelasunidadesAprobaciones {

    @ViewChild('editor') editor: ElementRef;
    public QuillElement: Quill;

    datosAdministracioniForm: UntypedFormGroup;
    _formBuilder = inject(FormBuilder);

    ngOnInit(): void
    {
        this.datosAdministracioniForm = this._formBuilder.group({
            opinion_legal:[],
            numdoc: [],
            fecha:[],
            estadoacto: [],
            fechaaprobacion: [],
            observaciones: []
          });
    
    }

    ngAfterViewInit(){
        this.QuillElement = new Quill(this.editor.nativeElement, {
            modules: {},
            theme: 'snow',
            
        });
    }
}
