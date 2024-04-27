import { inject } from '@angular/core';
import { Routes } from '@angular/router';
import { IncorporacionComponent } from './incorporacion.component';
import { InventoryService } from './inventory.service';
import { InventoryListComponent } from './list/inventory.component';
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
                component: InventoryListComponent,
                resolve  : {
                    brands    : () => inject(InventoryService).getBrands(),
                    categories: () => inject(InventoryService).getCategories(),
                    products  : () => inject(InventoryService).getProducts(),
                    tags      : () => inject(InventoryService).getTags(),
                    vendors   : () => inject(InventoryService).getVendors(),
                },
            },
            {
                path     : 'detalle',
                component: DetalleIncorporacionComponent,
            },
        ],
    },
] as Routes;
