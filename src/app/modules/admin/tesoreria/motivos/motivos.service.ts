import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MotivosBrand, MotivosCategory, MotivosPagination, MotivosProduct, MotivosTag, MotivosVendor } from 'app/modules/admin/tesoreria/motivos/motivos.types';
import { BehaviorSubject, filter, map, Observable, of, switchMap, take, tap, throwError } from 'rxjs';

@Injectable({providedIn: 'root'})
export class MotivosService
{
    // Private
    private _brands: BehaviorSubject<MotivosBrand[] | null> = new BehaviorSubject(null);
    private _categories: BehaviorSubject<MotivosCategory[] | null> = new BehaviorSubject(null);
    private _pagination: BehaviorSubject<MotivosPagination | null> = new BehaviorSubject(null);
    private _product: BehaviorSubject<MotivosProduct | null> = new BehaviorSubject(null);
    private _products: BehaviorSubject<MotivosProduct[] | null> = new BehaviorSubject(null);
    private _tags: BehaviorSubject<MotivosTag[] | null> = new BehaviorSubject(null);
    private _vendors: BehaviorSubject<MotivosVendor[] | null> = new BehaviorSubject(null);

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
    get brands$(): Observable<MotivosBrand[]>
    {
        return this._brands.asObservable();
    }

    /**
     * Getter for categories
     */
    get categories$(): Observable<MotivosCategory[]>
    {
        return this._categories.asObservable();
    }

    /**
     * Getter for pagination
     */
    get pagination$(): Observable<MotivosPagination>
    {
        return this._pagination.asObservable();
    }

    /**
     * Getter for product
     */
    get product$(): Observable<MotivosProduct>
    {
        return this._product.asObservable();
    }

    /**
     * Getter for products
     */
    get products$(): Observable<MotivosProduct[]>
    {
        return this._products.asObservable();
    }

    /**
     * Getter for tags
     */
    get tags$(): Observable<MotivosTag[]>
    {
        return this._tags.asObservable();
    }

    /**
     * Getter for vendors
     */
    get vendors$(): Observable<MotivosVendor[]>
    {
        return this._vendors.asObservable();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Get brands
     */
    getBrands(): Observable<MotivosBrand[]>
    {
        return this._httpClient.get<MotivosBrand[]>('api/apps/tesoreria/Motivos/brands').pipe(
            tap((brands) =>
            {
                this._brands.next(brands);
            }),
        );
    }

    /**
     * Get categories
     */
    getCategories(): Observable<MotivosCategory[]>
    {
        return this._httpClient.get<MotivosCategory[]>('api/apps/tesoreria/Motivos/categories').pipe(
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
        Observable<{ pagination: MotivosPagination; products: MotivosProduct[] }>
    {
        return this._httpClient.get<{ pagination: MotivosPagination; products: MotivosProduct[] }>('api/apps/tesoreria/Motivos/products', {
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
    getProductById(id: string): Observable<MotivosProduct>
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
    createProduct(): Observable<MotivosProduct>
    {
        return this.products$.pipe(
            take(1),
            switchMap(products => this._httpClient.post<MotivosProduct>('api/apps/tesoreria/Motivos/product', {}).pipe(
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
    updateProduct(id: string, product: MotivosProduct): Observable<MotivosProduct>
    {
        return this.products$.pipe(
            take(1),
            switchMap(products => this._httpClient.patch<MotivosProduct>('api/apps/tesoreria/Motivos/product', {
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
            switchMap(products => this._httpClient.delete('api/apps/tesoreria/Motivos/product', {params: {id}}).pipe(
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
    getTags(): Observable<MotivosTag[]>
    {
        return this._httpClient.get<MotivosTag[]>('api/apps/tesoreria/Motivos/tags').pipe(
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
    createTag(tag: MotivosTag): Observable<MotivosTag>
    {
        return this.tags$.pipe(
            take(1),
            switchMap(tags => this._httpClient.post<MotivosTag>('api/apps/tesoreria/Motivos/tag', {tag}).pipe(
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
    updateTag(id: string, tag: MotivosTag): Observable<MotivosTag>
    {
        return this.tags$.pipe(
            take(1),
            switchMap(tags => this._httpClient.patch<MotivosTag>('api/apps/tesoreria/Motivos/tag', {
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
            switchMap(tags => this._httpClient.delete('api/apps/tesoreria/Motivos/tag', {params: {id}}).pipe(
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
    getVendors(): Observable<MotivosVendor[]>
    {
        return this._httpClient.get<MotivosVendor[]>('api/apps/tesoreria/Motivos/vendors').pipe(
            tap((vendors) =>
            {
                this._vendors.next(vendors);
            }),
        );
    }
}
