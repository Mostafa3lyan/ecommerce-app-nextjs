"use client";
import { productType } from "@/types/products.types";
import { Card, CardBody, CardFooter, Image } from "@heroui/react";
import { Heart, Star } from "lucide-react";
import Link from "next/link";
import AddBtn from "../addBtn/addBtn";
import WishlistBtn from "../wishlistBtn/wishlistBtn";

export default function SingleProduct({ product }: { product: productType }) {
  return (
    <div className="relative group w-full flex flex-col items-center my-3 pb-12">
      {/* Product Card */}
      <Card
        className="border-0 py-2 rounded-b-none shadow-none hover:shadow-lg transition-all duration-200 w-full"
        isPressable
      >
        <Link href={`/products/${product.id}`} className="w-full">
          <CardBody className="overflow-hidden relative">
            <Image
              alt={product.title}
              src={product.imageCover}
              width="100%"
              className="w-full object-cover rounded-lg"
            />
          </CardBody>

          <CardFooter className="text-small flex flex-col gap-2 w-full justify-start">
            <div className="flex flex-col items-start gap-1 text-left w-full">
              <h3 className="text-green-600">{product.category.name}</h3>
              <div className="flex justify-between w-full items-center">
                <h4 className="font-semibold w-[80%] line-clamp-2">{product.title}</h4>
                {/* <span className="z-50"><WishlistBtn id={product.id} initialInWishlist={true} /></span> */}
                <span className="z-50">
                  {/* Assuming you're passing a product's id and its wishlist state */}
                  <WishlistBtn id={product.id} />
                </span>



              </div>
            </div>
            <div className="flex justify-between w-full">
              <span className="text-foreground">{product.price} EGP</span>
              <span className="text-foreground flex justify-center items-center gap-1">
                {product.ratingsAverage}
                <Star className="text-yellow-400" size={15} fill="currentColor" />
              </span>
            </div>
          </CardFooter>
        </Link>
      </Card>

      {/* Slide-up Button (overlay) */}
      <div className="absolute bottom-2 opacity-0 translate-y-8 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 w-full">
        <AddBtn id={product.id} />
      </div>
    </div>
  );
}
