import getProductDetails from '@/api/productdetails.api';
import relatedCategory from '@/api/relatedCategory';
import Details from '@/components/details/details';
import React from 'react';

export default async function productDetails({ params }: { params: Promise<{ id: string }> }) {

    const { id } = await params;
    const data = await getProductDetails(id);
    const relatedProducts = data?.category?._id ? await relatedCategory(data.category._id) : [];

    return (
        <>
            <Details data={data} relatedProducts={relatedProducts} />
        </>
    );
}

