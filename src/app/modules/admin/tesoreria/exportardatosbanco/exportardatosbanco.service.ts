import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ExportardatosbancoBrand, ExportardatosbancoCategory, ExportardatosbancoPagination, ExportardatosbancoProduct, ExportardatosbancoTag, ExportardatosbancoVendor } from 'app/modules/admin/tesoreria/exportardatosbanco/exportardatosbanco.types';
import { BehaviorSubject, filter, map, Observable, of, switchMap, take, tap, throwError } from 'rxjs';

@Injectable({providedIn: 'root'})
export class ExportardatosbancoService
{
    // Private
    private _brands: BehaviorSubject<ExportardatosbancoBrand[] | null> = new BehaviorSubject(null);
    private _categories: BehaviorSubject<ExportardatosbancoCategory[] | null> = new BehaviorSubject(null);
    private _pagination: BehaviorSubject<ExportardatosbancoPagination | null> = new BehaviorSubject(null);
    private _product: BehaviorSubject<ExportardatosbancoProduct | null> = new BehaviorSubject(null);
    private _products: BehaviorSubject<ExportardatosbancoProduct[] | null> = new BehaviorSubject(null);
    private _tags: BehaviorSubject<ExportardatosbancoTag[] | null> = new BehaviorSubject(null);
    private _vendors: BehaviorSubject<ExportardatosbancoVendor[] | null> = new BehaviorSubject(null);

    /**
     * Constructor
     */
    constructor(private _httpClient: HttpClient)
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Getter for brands
     */
    get brands$(): Observable<ExportardatosbancoBrand[]>
    {
        return this._brands.asObservable();
    }

    /**
     * Getter for categories
     */
    get categories$(): Observable<ExportardatosbancoCategory[]>
    {
        return this._categories.asObservable();
    }

    /**
     * Getter for pagination
     */
    get pagination$(): Observable<ExportardatosbancoPagination>
    {
        return this._pagination.asObservable();
    }

    /**
     * Getter for product
     */
    get product$(): Observable<ExportardatosbancoProduct>
    {
        return this._product.asObservable();
    }

    /**
     * Getter for products
     */
    get products$(): Observable<ExportardatosbancoProduct[]>
    {
        return this._products.asObservable();
    }

    /**
     * Getter for tags
     */
    get tags$(): Observable<ExportardatosbancoTag[]>
    {
        return this._tags.asObservable();
    }

    /**
     * Getter for vendors
     */
    get vendors$(): Observable<ExportardatosbancoVendor[]>
    {
        return this._vendors.asObservable();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Get brands
     */
    getBrands(): Observable<ExportardatosbancoBrand[]>
    {
        return this._httpClient.get<ExportardatosbancoBrand[]>('api/apps/tesoreria/Exportardatosbanco/brands').pipe(
            tap((brands) =>
            {
                this._brands.next(brands);
            }),
        );
    }

    /**
     * Get categories
     */
    getCategories(): Observable<ExportardatosbancoCategory[]>
    {
        return this._httpClient.get<ExportardatosbancoCategory[]>('api/apps/tesoreria/Exportardatosbanco/categories').pipe(
            tap((categories) =>
            {
                this._categories.next(categories);
            }),
        );
    }

    /**
     * Get products
     *
     *
     * @param page
     * @param size
     * @param sort
     * @param order
     * @param search
     */
    getProducts(page: number = 0, size: number = 10, sort: string = 'name', order: 'asc' | 'desc' | '' = 'asc', search: string = ''):
        Observable<{ pagination: ExportardatosbancoPagination; products: ExportardatosbancoProduct[] }>
    {
        return this._httpClient.get<{ pagination: ExportardatosbancoPagination; products: ExportardatosbancoProduct[] }>('api/apps/tesoreria/Exportardatosbanco/products', {
            params: {
                page: '' + page,
                size: '' + size,
                sort,
                order,
                search,
            },
        }).pipe(
            tap((response) =>
            {
                this._pagination.next(response.pagination);
                this._products.next(response.products);
            }),
        );
    }

    /**
     * Get product by id
     */
    getProductById(id: string): Observable<ExportardatosbancoProduct>
    {
        return this._products.pipe(
            take(1),
            map((products) =>
            {
                // Find the product
                const product = products.find(item => item.id === id) || null;

                // Update the product
                this._product.next(product);

                // Return the product
                return product;
            }),
            switchMap((product) =>
            {
                if ( !product )
                {
                    return throwError('Could not found product with id of ' + id + '!');
                }

                return of(product);
            }),
        );
    }

    /**
     * Create product
     */
    createProduct(): Observable<ExportardatosbancoProduct>
    {
        return this.products$.pipe(
            take(1),
            switchMap(products => this._httpClient.post<ExportardatosbancoProduct>('api/apps/tesoreria/Exportardatosbanco/product', {}).pipe(
                map((newProduct) =>
                {
                    // Update the products with the new product
                    this._products.next([newProduct, ...products]);

                    // Return the new product
                    return newProduct;
                }),
            )),
        );
    }

    /**
     * Update product
     *
     * @param id
     * @param product
     */
    updateProduct(id: string, product: ExportardatosbancoProduct): Observable<ExportardatosbancoProduct>
    {
        return this.products$.pipe(
            take(1),
            switchMap(products => this._httpClient.patch<ExportardatosbancoProduct>('api/apps/tesoreria/Exportardatosbanco/product', {
                id,
                product,
            }).pipe(
                map((updatedProduct) =>
                {
                    // Find the index of the updated product
                    const index = products.findIndex(item => item.id === id);

                    // Update the product
                    products[index] = updatedProduct;

                    // Update the products
                    this._products.next(products);

                    // Return the updated product
                    return updatedProduct;
                }),
                switchMap(updatedProduct => this.product$.pipe(
                    take(1),
                    filter(item => item && item.id === id),
                    tap(() =>
                    {
                        // Update the product if it's selected
                        this._product.next(updatedProduct);

                        // Return the updated product
                        return updatedProduct;
                    }),
                )),
            )),
        );
    }

    /**
     * Delete the product
     *
     * @param id
     */
    deleteProduct(id: string): Observable<boolean>
    {
        return this.products$.pipe(
            take(1),
            switchMap(products => this._httpClient.delete('api/apps/tesoreria/Exportardatosbanco/product', {params: {id}}).pipe(
                map((isDeleted: boolean) =>
                {
                    // Find the index of the deleted product
                    const index = products.findIndex(item => item.id === id);

                    // Delete the product
                    products.splice(index, 1);

                    // Update the products
                    this._products.next(products);

                    // Return the deleted status
                    return isDeleted;
                }),
            )),
        );
    }

    /**
     * Get tags
     */
    getTags(): Observable<ExportardatosbancoTag[]>
    {
        return this._httpClient.get<ExportardatosbancoTag[]>('api/apps/tesoreria/Exportardatosbanco/tags').pipe(
            tap((tags) =>
            {
                this._tags.next(tags);
            }),
        );
    }

    /**
     * Create tag
     *
     * @param tag
     */
    createTag(tag: ExportardatosbancoTag): Observable<ExportardatosbancoTag>
    {
        return this.tags$.pipe(
            take(1),
            switchMap(tags => this._httpClient.post<ExportardatosbancoTag>('api/apps/tesoreria/Exportardatosbanco/tag', {tag}).pipe(
                map((newTag) =>
                {
                    // Update the tags with the new tag
                    this._tags.next([...tags, newTag]);

                    // Return new tag from observable
                    return newTag;
                }),
            )),
        );
    }

    /**
     * Update the tag
     *
     * @param id
     * @param tag
     */
    updateTag(id: string, tag: ExportardatosbancoTag): Observable<ExportardatosbancoTag>
    {
        return this.tags$.pipe(
            take(1),
            switchMap(tags => this._httpClient.patch<ExportardatosbancoTag>('api/apps/tesoreria/Exportardatosbanco/tag', {
                id,
                tag,
            }).pipe(
                map((updatedTag) =>
                {
                    // Find the index of the updated tag
                    const index = tags.findIndex(item => item.id === id);

                    // Update the tag
                    tags[index] = updatedTag;

                    // Update the tags
                    this._tags.next(tags);

                    // Return the updated tag
                    return updatedTag;
                }),
            )),
        );
    }

    /**
     * Delete the tag
     *
     * @param id
     */
    deleteTag(id: string): Observable<boolean>
    {
        return this.tags$.pipe(
            take(1),
            switchMap(tags => this._httpClient.delete('api/apps/tesoreria/Exportardatosbanco/tag', {params: {id}}).pipe(
                map((isDeleted: boolean) =>
                {
                    // Find the index of the deleted tag
                    const index = tags.findIndex(item => item.id === id);

                    // Delete the tag
                    tags.splice(index, 1);

                    // Update the tags
                    this._tags.next(tags);

                    // Return the deleted status
                    return isDeleted;
                }),
                filter(isDeleted => isDeleted),
                switchMap(isDeleted => this.products$.pipe(
                    take(1),
                    map((products) =>
                    {
                        // Iterate through the contacts
                        products.forEach((product) =>
                        {
                            const tagIndex = product.tags.findIndex(tag => tag === id);

                            // If the contact has the tag, remove it
                            if ( tagIndex > -1 )
                            {
                                product.tags.splice(tagIndex, 1);
                            }
                        });

                        // Return the deleted status
                        return isDeleted;
                    }),
                )),
            )),
        );
    }

    /**
     * Get vendors
     */
    getVendors(): Observable<ExportardatosbancoVendor[]>
    {
        return this._httpClient.get<ExportardatosbancoVendor[]>('api/apps/tesoreria/Exportardatosbanco/vendors').pipe(
            tap((vendors) =>
            {
                this._vendors.next(vendors);
            }),
        );
    }
}
