import getProducts from "@/api/products.api";
import AllProducts from "@/components/allProducts/allProducts";
import { productType } from "@/types/products.types";

interface ProductsPageProps {
  searchParams?: Promise<{ brand?: string }>;
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const resolvedParams = await searchParams;
  const brandId = resolvedParams?.brand;

  const data: productType[] = await getProducts(brandId);

  return (
    <div className="p-4">
      {brandId ? (
        <h2 className="text-xl font-bold mb-4">Filtered Products</h2>
      ) : (
        <h2 className="text-xl text-center font-bold mb-4">Our Products</h2>
      )}

      {data.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-10 text-center">
          <p className="text-lg font-semibold">
            No products found for this brand.
          </p>
          <p className="text-gray-500">Try selecting a different brand.</p>
        </div>
      ) : (
        <AllProducts data={data} />
      )}
    </div>
  );
}
