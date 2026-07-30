import getAllCategories from "@/lib/api/allCategories.api";
import CategorySwiperClient from "../CategorySwiperClient/CategorySwiperClient";

export default async function CategoriesSlider() {
  const data = await getAllCategories();

  return <CategorySwiperClient data={data} />;
}
