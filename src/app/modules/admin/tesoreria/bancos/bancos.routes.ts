import { inject } from '@angular/core';
import { Routes } from '@angular/router';
import { BancosComponent } from './bancos.component';
import { BancosService } from './bancos.service';
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
        component: BancosComponent,
        resolve  : {
            brands    : () => inject(BancosService).getBrands(),
            categories: () => inject(BancosService).getCategories(),
            products  : () => inject(BancosService).getProducts(),
            tags      : () => inject(BancosService).getTags(),
            vendors   : () => inject(BancosService).getVendors(),
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
