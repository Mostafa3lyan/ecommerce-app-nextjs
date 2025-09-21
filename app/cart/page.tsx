"use client";
import clearCart from "@/api/cartActions/clearCart";
import getUserCart from "@/api/cartActions/getUserCart";
import removeFromCart from "@/api/cartActions/removeFromCart";
import updateCart from "@/api/cartActions/updateCart";
import { Spinner } from "@heroui/spinner";
import { Trash } from "lucide-react";
import { useEffect, useState } from "react";
import { useCart } from "@/context/CartContext";
import { CartProduct } from "@/types/cart.types";
import CheackoutDetails from "@/components/cheackoutDetails/cheackoutDetails";


export default function Cart() {
  const { cartProducts, setCartProducts } = useCart();
  const [isloading, setisloading] = useState(true);
  const [isDisable, setisDisable] = useState(false);
  const [currentId, setCurrentId] = useState("");
  const [cartId, setCartId] = useState<string | null>(null);


  async function userCart() {
    try {
      const res = await getUserCart();
      if (res.status === "success") {
        setCartProducts(res.data.products);
        setisloading(false)
        setCartId(res.cartId);
      }
    } catch (error) {
      console.error("❌ Error loading cart:", error);
      setisloading(false)

    }
  }

  useEffect(() => {
    userCart();
  }, []);

  async function updateQuantity(id: string, newCount: string) {
    setCurrentId(id);
    setisDisable(true);
    const res = await updateCart(id, newCount);
    if (res.status === "success") {
      setCartProducts(res.data.products);
      setisDisable(false);
    }
  }

  async function removeProduct(id: string) {
    setCurrentId(id);
    setisDisable(true); // disable while removing
    try {
      const res = await removeFromCart({ id });
      if (res.status === "success") {
        setCartProducts((prev: CartProduct[]) =>
          prev.filter((item: CartProduct) => item.product._id !== id)
        );
      }
    } catch (error) {
      console.error("❌ Failed to remove product:", error);
    } finally {
      setisDisable(false); // re-enable after done
    }
  }


  async function clearAllCart() {
    setisDisable(true);
    const res = await clearCart();
    if (res.message === "success") {
      setCartProducts([]);
      setisDisable(false);
    }

  }


  if (isloading) {
    return <div className="h-dvh flex justify-center items-center">
      <Spinner size="lg" color="success" />
    </div>
  }

  return (
    <div className="w-full md:w-3/4 mx-auto">
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-16 py-3">
                <span className="sr-only">Image</span>
              </th>
              <th scope="col" className="px-6 py-3">Product</th>
              <th scope="col" className="px-6 py-3">Qty</th>
              <th scope="col" className="px-6 py-3">Price</th>
              <th scope="col" className="px-6 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {cartProducts.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center py-6 text-gray-500">
                  Your cart is empty 🛒
                </td>
              </tr>
            ) : (
              <>
                {cartProducts.map((product: CartProduct) => (
                  <tr
                    key={product._id}
                    className="bg-white border-t border-green-600 dark:bg-gray-900 dark:border-slate-200 hover:bg-gray-50 dark:hover:bg-gray-600"
                  >
                    <td className="p-4">
                      <img
                        src={product.product.imageCover}
                        className="w-16 md:w-32 max-w-full max-h-full"
                        alt={product.product.title}
                      />
                    </td>

                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                      {product.product.title}
                    </td>

                    {/* Quantity controls */}
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        {/* Decrease */}
                        <button
                          disabled={isDisable}
                          onClick={() =>
                            updateQuantity(product.product._id, String(product.count - 1))
                          }
                          className="inline-flex text-2xl cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 items-center justify-center p-1 me-3 h-6 w-6 text-red-600 bg-white border border-gray-300 rounded-full hover:bg-gray-100 dark:bg-gray-700"
                          type="button"
                        >
                          -
                        </button>

                        {/* Display count */}
                        {currentId === product.product._id && isDisable ? (
                          <Spinner size="sm" color="success" />
                        ) : (
                          <span className="w-14 text-center bg-gray-50 border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                            {product.count}
                          </span>
                        )}

                        {/* Increase */}
                        <button
                          disabled={isDisable}
                          onClick={() =>
                            updateQuantity(product.product._id, `${product.count + 1}`)
                          }
                          className="inline-flex text-xl cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 items-center justify-center p-1 ms-3 h-6 w-6 text-green-600 bg-white border border-gray-300 rounded-full hover:bg-gray-100 dark:bg-gray-700"
                          type="button"
                        >
                          +
                        </button>
                      </div>
                    </td>

                    {/* Price */}
                    < td className="px-6 py-4 font-semibold text-gray-900 dark:text-white" >
                      {product.price * product.count} EGP
                    </td>

                    {/* Remove */}
                    <td className="px-6 py-4">
                      <button
                        type="button"
                        aria-label="Remove"
                        disabled={isDisable}
                        onClick={() => removeProduct(product.product._id)}
                        className="font-medium disabled:opacity-50 disabled:p-0.5 disabled:rounded-medium disabled:cursor-not-allowed cursor-pointer text-red-600 dark:text-red-500 hover:underline hover:text-red-500"
                      >
                        <Trash size={16} />
                      </button>
                    </td>
                  </tr>
                ))}

                {/* Total Row */}
                <tr className="bg-gray-50 dark:bg-gray-900 border-t border-green-600 dark:border-slate-200">
                  <td className="px-10 py-4 text-center whitespace-nowrap" colSpan={2}>

                    <CheackoutDetails isDisable={isDisable} id={cartId} />
                  </td>


                  {/* Total Items */}
                  <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                    Total Items: {cartProducts.reduce((sum: number, p: CartProduct) => sum + p.count, 0)}
                  </td>

                  {/* Total Price */}
                  <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                    Total:{" "}
                    {cartProducts.reduce((sum: number, p: CartProduct) => sum + p.price * p.count, 0)} EGP
                  </td>

                  {/* Clear Cart Button */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      type="button"
                      disabled={isDisable}
                      onClick={clearAllCart}
                      className="font-medium disabled:opacity-50 disabled:p-0.5 disabled:rounded-medium disabled:cursor-not-allowed cursor-pointer text-red-600 dark:text-red-500 hover:underline hover:text-red-500 whitespace-nowrap">
                      Clear Cart
                    </button>
                  </td>
                </tr>

              </>
            )}
          </tbody>
        </table>
      </div >
    </div >
  );
}
