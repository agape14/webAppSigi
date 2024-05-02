import { inject } from '@angular/core';
import { Routes } from '@angular/router';
import { ExportardatosbancoComponent } from './expbanco.component';
import { ExpbancoService } from './expbanco.service';
//import { ExportardatosbancoListComponent } from './list/Exportardatosbanco.component';
//import { DetalleExportardatosbancoComponent } from './detalle-Exportardatosbanco/detalle-Exportardatosbanco.component';

export default [
    {
        path      : '',
        pathMatch : 'full',
        redirectTo: '',
    },
    {
        path     : '',
        component: ExportardatosbancoComponent,
        resolve  : {
            brands    : () => inject(ExpbancoService).getBrands(),
            categories: () => inject(ExpbancoService).getCategories(),
            products  : () => inject(ExpbancoService).getProducts(),
            tags      : () => inject(ExpbancoService).getTags(),
            vendors   : () => inject(ExpbancoService).getVendors(),
        },
        /*children : [
            {
                path     : '',
                component: ExportardatosbancoComponent,
                resolve  : {
                    brands    : () => inject(ExportardatosbancoService).getBrands(),
                    categories: () => inject(ExportardatosbancoService).getCategories(),
                    products  : () => inject(ExportardatosbancoService).getProducts(),
                    tags      : () => inject(ExportardatosbancoService).getTags(),
                    vendors   : () => inject(ExportardatosbancoService).getVendors(),
                },
            },
        ],*/
    },
] as Routes;
