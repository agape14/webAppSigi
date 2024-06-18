import { TextFieldModule } from "@angular/cdk/text-field";
import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, ElementRef, ViewChild, ViewEncapsulation, inject } from "@angular/core";
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, UntypedFormGroup } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatOptionModule } from "@angular/material/core";
import {  MatDatepickerModule } from "@angular/material/datepicker";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import Quill from "quill";



@Component({
    selector: 'margesi-itls-analisis',
    templateUrl: './analisis.component.html',
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [FormsModule, ReactiveFormsModule, MatFormFieldModule, MatIconModule, MatInputModule, TextFieldModule, 
        MatSelectModule, MatOptionModule, MatButtonModule, MatSlideToggleModule,   MatDatepickerModule, 
],
      })
  export class DelosDatosITLAnalisis{
    @ViewChild('editor') editor: ElementRef;
    public QuillElement: Quill;

    delosDatosITLAnalisis: UntypedFormGroup;
    _formBuilder = inject(FormBuilder);

    ngOnInit(): void
    {
        this.delosDatosITLAnalisis = this._formBuilder.group({
            texto: [],



        });
    }

    ngAfterViewInit(){
        this.QuillElement = new Quill(this.editor.nativeElement, {
            modules: {},
            theme: 'snow',
            
        });
    }
}
