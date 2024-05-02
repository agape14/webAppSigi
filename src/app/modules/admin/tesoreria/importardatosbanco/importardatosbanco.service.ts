import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ImportardatosbancoBrand, ImportardatosbancoCategory, ImportardatosbancoPagination, ImportardatosbancoProduct, ImportardatosbancoTag, ImportardatosbancoVendor } from 'app/modules/admin/tesoreria/importardatosbanco/importardatosbanco.types';
import { BehaviorSubject, filter, map, Observable, of, switchMap, take, tap, throwError } from 'rxjs';

@Injectable({providedIn: 'root'})
export class ImportardatosbancoService
{
    // Private
    private _brands: BehaviorSubject<ImportardatosbancoBrand[] | null> = new BehaviorSubject(null);
    private _categories: BehaviorSubject<ImportardatosbancoCategory[] | null> = new BehaviorSubject(null);
    private _pagination: BehaviorSubject<ImportardatosbancoPagination | null> = new BehaviorSubject(null);
    private _product: BehaviorSubject<ImportardatosbancoProduct | null> = new BehaviorSubject(null);
    private _products: BehaviorSubject<ImportardatosbancoProduct[] | null> = new BehaviorSubject(null);
    private _tags: BehaviorSubject<ImportardatosbancoTag[] | null> = new BehaviorSubject(null);
    private _vendors: BehaviorSubject<ImportardatosbancoVendor[] | null> = new BehaviorSubject(null);

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
    get brands$(): Observable<ImportardatosbancoBrand[]>
    {
        return this._brands.asObservable();
    }

    /**
     * Getter for categories
     */
    get categories$(): Observable<ImportardatosbancoCategory[]>
    {
        return this._categories.asObservable();
    }

    /**
     * Getter for pagination
     */
    get pagination$(): Observable<ImportardatosbancoPagination>
    {
        return this._pagination.asObservable();
    }

    /**
     * Getter for product
     */
    get product$(): Observable<ImportardatosbancoProduct>
    {
        return this._product.asObservable();
    }

    /**
     * Getter for products
     */
    get products$(): Observable<ImportardatosbancoProduct[]>
    {
        return this._products.asObservable();
    }

    /**
     * Getter for tags
     */
    get tags$(): Observable<ImportardatosbancoTag[]>
    {
        return this._tags.asObservable();
    }

    /**
     * Getter for vendors
     */
    get vendors$(): Observable<ImportardatosbancoVendor[]>
    {
        return this._vendors.asObservable();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Get brands
     */
    getBrands(): Observable<ImportardatosbancoBrand[]>
    {
        return this._httpClient.get<ImportardatosbancoBrand[]>('api/apps/tesoreria/importardatosbanco/brands').pipe(
            tap((brands) =>
            {
                this._brands.next(brands);
            }),
        );
    }

    /**
     * Get categories
     */
    getCategories(): Observable<ImportardatosbancoCategory[]>
    {
        return this._httpClient.get<ImportardatosbancoCategory[]>('api/apps/tesoreria/importardatosbanco/categories').pipe(
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
        Observable<{ pagination: ImportardatosbancoPagination; products: ImportardatosbancoProduct[] }>
    {
        return this._httpClient.get<{ pagination: ImportardatosbancoPagination; products: ImportardatosbancoProduct[] }>('api/apps/tesoreria/importardatosbanco/products', {
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
    getProductById(id: string): Observable<ImportardatosbancoProduct>
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
    createProduct(): Observable<ImportardatosbancoProduct>
    {
        return this.products$.pipe(
            take(1),
            switchMap(products => this._httpClient.post<ImportardatosbancoProduct>('api/apps/tesoreria/importardatosbanco/product', {}).pipe(
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
    updateProduct(id: string, product: ImportardatosbancoProduct): Observable<ImportardatosbancoProduct>
    {
        return this.products$.pipe(
            take(1),
            switchMap(products => this._httpClient.patch<ImportardatosbancoProduct>('api/apps/tesoreria/importardatosbanco/product', {
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
            switchMap(products => this._httpClient.delete('api/apps/tesoreria/importardatosbanco/product', {params: {id}}).pipe(
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
    getTags(): Observable<ImportardatosbancoTag[]>
    {
        return this._httpClient.get<ImportardatosbancoTag[]>('api/apps/tesoreria/importardatosbanco/tags').pipe(
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
    createTag(tag: ImportardatosbancoTag): Observable<ImportardatosbancoTag>
    {
        return this.tags$.pipe(
            take(1),
            switchMap(tags => this._httpClient.post<ImportardatosbancoTag>('api/apps/tesoreria/importardatosbanco/tag', {tag}).pipe(
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
    updateTag(id: string, tag: ImportardatosbancoTag): Observable<ImportardatosbancoTag>
    {
        return this.tags$.pipe(
            take(1),
            switchMap(tags => this._httpClient.patch<ImportardatosbancoTag>('api/apps/tesoreria/importardatosbanco/tag', {
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
            switchMap(tags => this._httpClient.delete('api/apps/tesoreria/importardatosbanco/tag', {params: {id}}).pipe(
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
    getVendors(): Observable<ImportardatosbancoVendor[]>
    {
        return this._httpClient.get<ImportardatosbancoVendor[]>('api/apps/tesoreria/importardatosbanco/vendors').pipe(
            tap((vendors) =>
            {
                this._vendors.next(vendors);
            }),
        );
    }
}
