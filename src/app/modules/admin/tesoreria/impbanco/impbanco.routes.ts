import { inject } from '@angular/core';
import { Routes } from '@angular/router';
import { ImportardatosbancoComponent } from './impbanco.component';
import { ImportardatosbancoService } from './impbanco.service';
//import { ImportardatosbancoListComponent } from './list/Importardatosbanco.component';
//import { DetalleImportardatosbancoComponent } from './detalle-Importardatosbanco/detalle-Importardatosbanco.component';

export default [
    {
        path      : '',
        pathMatch : 'full',
        redirectTo: '',
    },
    {
        path     : '',
        component: ImportardatosbancoComponent,
        resolve  : {
            brands    : () => inject(ImportardatosbancoService).getBrands(),
            categories: () => inject(ImportardatosbancoService).getCategories(),
            products  : () => inject(ImportardatosbancoService).getProducts(),
            tags      : () => inject(ImportardatosbancoService).getTags(),
            vendors   : () => inject(ImportardatosbancoService).getVendors(),
        },
        /*children : [
            {
                path     : '',
                component: ImportardatosbancoComponent,
                resolve  : {
                    brands    : () => inject(ImportardatosbancoService).getBrands(),
                    categories: () => inject(ImportardatosbancoService).getCategories(),
                    products  : () => inject(ImportardatosbancoService).getProducts(),
                    tags      : () => inject(ImportardatosbancoService).getTags(),
                    vendors   : () => inject(ImportardatosbancoService).getVendors(),
                },
            },
        ],*/
    },
] as Routes;
