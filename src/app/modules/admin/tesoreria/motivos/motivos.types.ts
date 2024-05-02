export interface MotivosProduct
{
    id: string;
    category?: string;
    name: string;
    description?: string;
    tags?: string[];
    sku?: string | null;
    barcode?: string | null;
    brand?: string | null;
    vendor: string | null;
    stock: number;
    reserved: number;
    cost: number;
    basePrice: number;
    taxPercent: number;
    price: number;
    weight: number;
    thumbnail: string;
    images: string[];
    active: boolean;
}

export interface MotivosPagination
{
    length: number;
    size: number;
    page: number;
    lastPage: number;
    startIndex: number;
    endIndex: number;
}

export interface MotivosCategory
{
    id: string;
    parentId: string;
    name: string;
    slug: string;
}

export interface MotivosBrand
{
    id: string;
    name: string;
    slug: string;
}

export interface MotivosTag
{
    id?: string;
    title?: string;
}

export interface MotivosVendor
{
    id: string;
    name: string;
    slug: string;
}
