import getProducts from "@/api/products.api";
import MainSlider from "@/components/mainSlider/mainSlider";
import CategoriesSlider from "@/components/categoriesSlider/categoriesSlider";
import AllProducts from "@/components/allProducts/allProducts";


export default async function Home() {

  const data = await getProducts();

  return (
    <>
      <MainSlider />
      <CategoriesSlider />
      <AllProducts data={data} />


    </>
  );
}
