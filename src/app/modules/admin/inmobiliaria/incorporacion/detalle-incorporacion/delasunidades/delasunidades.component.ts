import {  NgClass, NgFor, NgIf } from '@angular/common';
import { TextFieldModule } from '@angular/cdk/text-field';
import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatTabsModule } from '@angular/material/tabs';
import { IncorporacionPagination } from '../../incorporacion.types';
import {  MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { ViewChild} from '@angular/core';
import {LiveAnnouncer} from '@angular/cdk/a11y';

export interface DataExample {
    cod_prov: string;
    position: number;
    cod_ui: number | string;
    interior: string;
  }


const ELEMENT_DATA: DataExample[] = [
    {position: 1, cod_prov: 'Hydrogen', cod_ui: 1.0079, interior: 'H'},
    {position: 2, cod_prov: 'Helium', cod_ui: 4.0026, interior: 'He'},
    {position: 3, cod_prov: 'Lithium', cod_ui: 6.941, interior: 'Li'},
    {position: 4, cod_prov: 'Beryllium', cod_ui: 9.0122, interior: 'Be'},
    {position: 5, cod_prov: 'Boron', cod_ui: 10.811, interior: 'B'},
    {position: 6, cod_prov: 'Carbon', cod_ui: 12.0107, interior: 'C'},
    {position: 7, cod_prov: 'Nitrogen', cod_ui: 14.0067, interior: 'N'},
    {position: 8, cod_prov: 'Oxygen', cod_ui: 15.9994, interior: 'O'},
    {position: 9, cod_prov: 'Fluorine', cod_ui: 18.9984, interior: 'F'},
    {position: 10, cod_prov: 'Neon', cod_ui: 20.1797, interior: 'Ne'},
    {position: 11, cod_prov: 'Sodium', cod_ui: 22.9897, interior: 'Na'},
    {position: 12, cod_prov: 'Magnesium', cod_ui: 24.305, interior: 'Mg'},
    {position: 13, cod_prov: 'Aluminum', cod_ui: 26.9815, interior: 'Al'},
    {position: 14, cod_prov: 'Silicon', cod_ui: 28.0855, interior: 'Si'},
    {position: 15, cod_prov: 'Phosphorus', cod_ui: 30.9738, interior: 'P'},
    {position: 16, cod_prov: 'Sulfur', cod_ui: 32.06, interior: 'S'},
    {position: 17, cod_prov: 'Chlorine', cod_ui: 35.45, interior: 'Cl'},
    {position: 18, cod_prov: 'Potassium', cod_ui: 39.0983, interior: 'K'},
    {position: 19, cod_prov: 'Calcium', cod_ui: 40.078, interior: 'Ca'},
    {position: 20, cod_prov: 'Scandium', cod_ui: 44.9559, interior: 'Sc'},
    {position: 21, cod_prov: 'Titanium', cod_ui: 47.867, interior: 'Ti'},
    {position: 22, cod_prov: 'Vanadium', cod_ui: 50.9415, interior: 'V'},
    {position: 23, cod_prov: 'Chromium', cod_ui: 51.9961, interior: 'Cr'},
    {position: 24, cod_prov: 'Manganese', cod_ui: 54.938, interior: 'Mn'},
    {position: 25, cod_prov: 'Iron', cod_ui: 55.845, interior: 'Fe'},
    {position: 26, cod_prov: 'Cobalt', cod_ui: 58.9332, interior: 'Co'},
    {position: 27, cod_prov: 'Nickel', cod_ui: 58.6934, interior: 'Ni'},
    {position: 28, cod_prov: 'Copper', cod_ui: 63.546, interior: 'Cu'},
    {position: 29, cod_prov: 'Zinc', cod_ui: 65.38, interior: 'Zn'},
    {position: 30, cod_prov: 'Gallium', cod_ui: 69.723, interior: 'Ga'},

  ];

@Component({
  selector: 'incorporacion-delasunidades',
  templateUrl: './delasunidades.component.html',
  encapsulation  : ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, MatFormFieldModule, MatIconModule, MatInputModule, TextFieldModule,
            MatSelectModule, MatOptionModule, MatButtonModule, MatSlideToggleModule, MatDatepickerModule, NgClass, NgFor, NgIf, MatTabsModule,
            MatPaginatorModule,  MatSortModule, MatSort, MatTableModule],
})
export class DelasunidadesComponent {
    _liveAnnouncer = inject(LiveAnnouncer);
    pagination: IncorporacionPagination;
    dataSource = new MatTableDataSource<DataExample>(ELEMENT_DATA);
    @ViewChild(MatSort) sort: MatSort;

    @ViewChild(MatPaginator) paginator: MatPaginator;

    ngAfterViewInit() {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
    displayedColumns: string[] = ['position', 'cod_prov', 'cod_ui', 'interior'];

    applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }
    announceOrdenarCambio(ordenarEstado: Sort) {

        if (ordenarEstado.direction) {
          this._liveAnnouncer.announce(`Sorted ${ordenarEstado.direction}ending`);
        } else {
          this._liveAnnouncer.announce('Sorting cleared');
        }
      }
}
