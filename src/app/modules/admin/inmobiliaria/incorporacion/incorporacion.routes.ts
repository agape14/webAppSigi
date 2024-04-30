import { inject } from '@angular/core';
import { Routes } from '@angular/router';
import { IncorporacionComponent } from './incorporacion.component';
import { IncorporacionService } from './incorporacion.service';
import { IncorporacionListComponent } from './list/incorporacion.component';
import { DetalleIncorporacionComponent } from './detalle-incorporacion/detalle-incorporacion.component';

export default [
    {
        path      : '',
        pathMatch : 'full',
        redirectTo: '',
    },
    {
        path     : '',
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
                path     : 'detalle',
                component: DetalleIncorporacionComponent,
            },
        ],
    },
] as Routes;
