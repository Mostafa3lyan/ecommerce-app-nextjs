import getBrands from "@/api/getBrands";
import AllBrands from "@/components/allBrands/allBrands";

export default async function brands() {
  // const [brands, setbrands] = useState([])

  // async function showBrands() {

  const res = await getBrands();

  // }
  return (
    <>
      <AllBrands data={res} />
    </>
  );
}
