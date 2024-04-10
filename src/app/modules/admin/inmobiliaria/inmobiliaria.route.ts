import { inject } from '@angular/core';
import { Routes } from '@angular/router';
import { IncorporacionComponent } from './incorporacion/incorporacion.component';
import { InventoryService } from 'app/modules/admin/ecommerce/inventory/inventory.service';
import { InventoryListComponent } from 'app/modules/admin/ecommerce/inventory/list/inventory.component';

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
                component: InventoryListComponent,
                resolve  : {
                    brands    : () => inject(InventoryService).getBrands(),
                    categories: () => inject(InventoryService).getCategories(),
                    products  : () => inject(InventoryService).getProducts(),
                    tags      : () => inject(InventoryService).getTags(),
                    vendors   : () => inject(InventoryService).getVendors(),
                },
            },
        ],
    },
] as Routes;
