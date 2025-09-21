import getProductDetails from '@/api/productdetails.api';
import Details from '@/components/details/details';
import React from 'react';

export default async function productDetails({ params }: { params: Promise<{ id: string }> }) {

    const { id } = await params;
    const data = await getProductDetails(id);

    return (
        <>
            <Details data={data} />
        </>
    );
}

