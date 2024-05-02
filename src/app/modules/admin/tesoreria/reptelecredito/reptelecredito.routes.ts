import { inject } from '@angular/core';
import { Routes } from '@angular/router';
import { ReptelecreditoComponent } from './reptelecredito.component';
import { ReptelecreditoService } from './reptelecredito.service';
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
        component: ReptelecreditoComponent,
        resolve  : {
            brands    : () => inject(ReptelecreditoService).getBrands(),
            categories: () => inject(ReptelecreditoService).getCategories(),
            products  : () => inject(ReptelecreditoService).getProducts(),
            tags      : () => inject(ReptelecreditoService).getTags(),
            vendors   : () => inject(ReptelecreditoService).getVendors(),
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
