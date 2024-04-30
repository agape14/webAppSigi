import { inject } from '@angular/core';
import { Routes } from '@angular/router';
import { IncorporacionComponent } from './incorporacion/incorporacion.component';
import { IngresosComponent } from './ingresos/ingresos.component';
import { IncorporacionService } from 'app/modules/admin/inmobiliaria/incorporacion/incorporacion.service';
import { IngresosService } from 'app/modules/admin/inmobiliaria/ingresos/ingresos.service';
import { IncorporacionListComponent } from 'app/modules/admin/inmobiliaria/incorporacion/list/incorporacion.component';
import { IngresosListComponent } from 'app/modules/admin/inmobiliaria/ingresos/list/ingresos.component';

export default [
    {
        path      : '',
        pathMatch : 'full',
        redirectTo: 'inmobiliaria',
    },
    {
        path     : 'inmobiliaria',
        component: IncorporacionComponent,
        children : [
            {
                path     : '',
                component: IncorporacionListComponent,
                resolve  : {
                    brands    : () => inject(IncorporacionService).getBrands(),
                    categories: () => inject(IncorporacionService).getCategories(),
                    products  : () => inject(IncorporacionService).getProducts(),
                    tags      : () => inject(IncorporacionService).getTags(),
                    vendors   : () => inject(IncorporacionService).getVendors(),
                },
            },
            {
                path     : '',
                component: IngresosComponent,
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
