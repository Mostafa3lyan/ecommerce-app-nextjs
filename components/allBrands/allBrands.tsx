"use client";
import { Card, CardHeader, CardBody } from "@heroui/react";
import { brandsTypes } from "@/types/brands.types";
import NextLink from "next/link";

export default function AllBrands({ data }: { data: brandsTypes[] }) {
    return (
        <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
                {data.map((brand) => (
                    <div key={brand._id} className="flex flex-col items-center">
                        {/* Wrap the card in a NextLink to navigate to products page */}
                        <NextLink href={`/products?brand=${brand._id}`}>
                            <Card isPressable className="py-4">
                                <CardHeader className="pb-0 pt-2 px-4 flex-col items-start"></CardHeader>
                                <CardBody className="overflow-visible py-2">
                                    <img src={brand.image} alt={brand.name} className="w-full h-auto object-contain" />
                                </CardBody>
                            </Card>
                        </NextLink>
                        <h4 className="font-bold text-center text-large">{brand.name}</h4>
                    </div>
                ))}
            </div>
        </>
    );
}
