// import { inject } from '@angular/core';
import { Routes } from '@angular/router';
// import { IngresosService } from './ingresos.service';
// import { IngresosListComponent } from './list/ingresos.component';
// import { DetalleIngresosComponent } from './detalle-ingresos/detalle-ingresos.component';
import { MargesiComponent } from './margesi.component';

export default [
    {
        path      : '',
        pathMatch : 'full',
        redirectTo: '',
    },
    {
        path     : '',
        component: MargesiComponent,
        children : [
            // {
            //     path     : '',
            //     component: IngresosListComponent,
            //     // resolve  : {
            //     //     brands    : () => inject(IngresosService).getBrands(),
            //     //     categories: () => inject(IngresosService).getCategories(),
            //     //     products  : () => inject(IngresosService).getProducts(),
            //     //     tags      : () => inject(IngresosService).getTags(),
            //     //     vendors   : () => inject(IngresosService).getVendors(),
            //     // },
            // },
            // {
            //     path     : 'detalle',
            //     component: DetalleIngresosComponent,
            // },
        ],
    },
] as Routes;
