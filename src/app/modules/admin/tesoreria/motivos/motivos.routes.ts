import { inject } from '@angular/core';
import { Routes } from '@angular/router';
import { MotivosComponent } from './motivos.component';
import { MotivosService } from './motivos.service';
//import { MotivosListComponent } from './list/Motivos.component';
//import { DetalleMotivosComponent } from './detalle-Motivos/detalle-Motivos.component';

export default [
    {
        path      : '',
        pathMatch : 'full',
        redirectTo: '',
    },
    {
        path     : '',
        component: MotivosComponent,
        resolve  : {
            brands    : () => inject(MotivosService).getBrands(),
            categories: () => inject(MotivosService).getCategories(),
            products  : () => inject(MotivosService).getProducts(),
            tags      : () => inject(MotivosService).getTags(),
            vendors   : () => inject(MotivosService).getVendors(),
        },
        /*children : [
            {
                path     : '',
                component: MotivosComponent,
                resolve  : {
                    brands    : () => inject(MotivosService).getBrands(),
                    categories: () => inject(MotivosService).getCategories(),
                    products  : () => inject(MotivosService).getProducts(),
                    tags      : () => inject(MotivosService).getTags(),
                    vendors   : () => inject(MotivosService).getVendors(),
                },
            },
        ],*/
    },
] as Routes;
