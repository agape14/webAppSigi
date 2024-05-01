import { inject } from '@angular/core';
import { Routes } from '@angular/router';
import { IngresosComponent } from './ingresos/ingresos.component';
import { IngresosService } from 'app/modules/admin/tesoreria/ingresos/ingresos.service';
import { IngresosListComponent } from 'app/modules/admin/tesoreria/ingresos/list/ingresos.component';

export default [
    {
        path      : '',
        pathMatch : 'full',
        redirectTo: 'tesoreria',
    },
    {
        path     : 'tesoreria',
        component: IngresosComponent,
        children : [
            {
                path     : '',
                component: IngresosListComponent,
                resolve  : {
                    brands    : () => inject(IngresosService).getBrands(),
                    categories: () => inject(IngresosService).getCategories(),
                    products  : () => inject(IngresosService).getProducts(),
                    tags      : () => inject(IngresosService).getTags(),
                    vendors   : () => inject(IngresosService).getVendors(),
                },
            },
        ],
    },
] as Routes;
