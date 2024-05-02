import { inject } from '@angular/core';
import { Routes } from '@angular/router';
import { IngresosComponent } from './ingresos/ingresos.component';
import { TesoreriaComponent } from './tesoreria.component';
import { MotivosComponent } from './motivos/motivos.component';
import { ImpbancoComponent } from './impbanco/impbanco.component';
import { ExpbancoComponent } from './expbanco/expbanco.component';
import { IngresosService } from 'app/modules/admin/tesoreria/ingresos/ingresos.service';
import { MotivosService } from 'app/modules/admin/tesoreria/motivos/motivos.service';
import { IngresosListComponent } from 'app/modules/admin/tesoreria/ingresos/list/ingresos.component';

export default [
    {
        path      : '',
        pathMatch : 'full',
        redirectTo: 'tesoreria',
    },
    {
        path     : 'tesoreria',
        component: TesoreriaComponent,
        children : [
            {
                path     : 'ingresos',
                component: IngresosListComponent,
                resolve  : {
                    brands    : () => inject(IngresosService).getBrands(),
                    categories: () => inject(IngresosService).getCategories(),
                    products  : () => inject(IngresosService).getProducts(),
                    tags      : () => inject(IngresosService).getTags(),
                    vendors   : () => inject(IngresosService).getVendors(),
                },
            },
            {
                path     : 'motivos',
                component: MotivosComponent,
                resolve  : {
                    brands    : () => inject(MotivosService).getBrands(),
                    categories: () => inject(MotivosService).getCategories(),
                    products  : () => inject(MotivosService).getProducts(),
                    tags      : () => inject(MotivosService).getTags(),
                    vendors   : () => inject(MotivosService).getVendors(),
                },
            },
            {
                path     : 'impbanco',
                component: ImpbancoComponent,
                resolve  : {
                    brands    : () => inject(ImpService).getBrands(),
                    categories: () => inject(ImpService).getCategories(),
                    products  : () => inject(ImpService).getProducts(),
                    tags      : () => inject(ImpService).getTags(),
                    vendors   : () => inject(ImpService).getVendors(),
                },
            },
            {
                path     : 'expbanco',
                component: ExpbancoComponent,
                resolve  : {
                    brands    : () => inject(ExpService).getBrands(),
                    categories: () => inject(ExpService).getCategories(),
                    products  : () => inject(ExpService).getProducts(),
                    tags      : () => inject(ExpService).getTags(),
                    vendors   : () => inject(ExpService).getVendors(),
                },
            },
        ],
    },
] as Routes;
