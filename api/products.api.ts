"use server";

export default async function getProducts(brandId?: string) {
  const url = brandId
    ? `https://ecommerce.routemisr.com/api/v1/products?brand=${brandId}`
    : `https://ecommerce.routemisr.com/api/v1/products`;

  const response = await fetch(url);
  const { data } = await response.json();

  return data;
}
