"use client";
import SingleProduct from "../singleProduct/singleProduct";
import { productType } from "@/types/products.types";

const AllProducts = ({ data }: { data: productType[] }) => {
    return (
        <div className="row flex flex-wrap">
            {data.map((currentProduct) => (
                <div key={currentProduct.id} className="w-full md:w-1/2 lg:w-1/4 xl:w-1/6">
                    <div className="p-2">
                        <SingleProduct product={currentProduct} />
                    </div>
                </div>
            ))}
        </div>
    );
};

export default AllProducts;
