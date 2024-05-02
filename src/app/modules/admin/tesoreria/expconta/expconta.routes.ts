import { inject } from '@angular/core';
import { Routes } from '@angular/router';
import { ExpcontaComponent } from './expconta.component';
import { ExpcontaService } from './expconta.service';
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
        component: ExpcontaComponent,
        resolve  : {
            brands    : () => inject(ExpcontaService).getBrands(),
            categories: () => inject(ExpcontaService).getCategories(),
            products  : () => inject(ExpcontaService).getProducts(),
            tags      : () => inject(ExpcontaService).getTags(),
            vendors   : () => inject(ExpcontaService).getVendors(),
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
