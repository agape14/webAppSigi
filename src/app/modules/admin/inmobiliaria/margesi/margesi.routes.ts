// import { inject } from '@angular/core';
import { Routes } from '@angular/router';
// import { IngresosService } from './ingresos.service';
// import { IngresosListComponent } from './list/ingresos.component';
// import { DetalleIngresosComponent } from './detalle-ingresos/detalle-ingresos.component';
import { MargesiComponent } from './margesi.component';
import { MargesiListComponent } from './list/margesilist.component';
import { DetalleMargesiComponent } from './detalle-margesi/detalle-margesi.component';

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
            {
                path     : '',
                component: MargesiListComponent,
                // resolve  : {
                //     brands    : () => inject(IngresosService).getBrands(),
                //     categories: () => inject(IngresosService).getCategories(),
                //     products  : () => inject(IngresosService).getProducts(),
                //     tags      : () => inject(IngresosService).getTags(),
                //     vendors   : () => inject(IngresosService).getVendors(),
                // },
            },
            {
                path     : 'detalle',
                component: DetalleMargesiComponent,
            },
        ],
    },
] as Routes;
