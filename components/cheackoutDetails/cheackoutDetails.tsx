"use client";
import clearCart from "@/api/cartActions/clearCart";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  Button,
  useDisclosure,
  Input,
} from "@heroui/react";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import placeOrder from "@/api/cartActions/onlineOrder";

type CheackoutDetailsProps = {
  id: string | null;
  isDisable: boolean;
};

export default function CheackoutDetails({
  id,
  isDisable,
}: CheackoutDetailsProps) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const detailsRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const cityRef = useRef<HTMLInputElement>(null);

  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { setCartProducts } = useCart();

  // ✅ errors state
  const [errors, setErrors] = useState<{
    details?: string;
    phone?: string;
    city?: string;
  }>({});

  // Validation helper
  function validateInputs() {
    const details = detailsRef.current?.value.trim() || "";
    const phone = phoneRef.current?.value.trim() || "";
    const city = cityRef.current?.value.trim() || "";

    const newErrors: typeof errors = {};

    if (!details || details.length < 5) {
      newErrors.details = "Please enter at least 5 characters";
    }

    const phoneRegex = /^01[0125][0-9]{8}$/;
    if (!phoneRegex.test(phone)) {
      newErrors.phone = "Enter a valid phone number";
    }

    if (!city) {
      newErrors.city = "City is required";
    }

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return null;

    return { details, phone, city };
  }

  async function handleCashOrder() {
    const address = validateInputs();
    if (!address || !id) return;

    setLoading(true);
    try {
      const res = await placeOrder("cash", id, address);
      await clearCart();
      setCartProducts([]);
      router.push("/allorders");
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }
  async function handleOnlinePayment() {
    const address = validateInputs();
    if (!address || !id) return;
    setLoading(true);
    try {
      const res = await placeOrder(
        "online",
        id,
        address,
        window.location.origin
      );
      await clearCart();
      setCartProducts([]);
      window.location.href = res.session.url;
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }
  return (
    <>
      <Button
        className="font-medium w-[70%] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer bg-green-600 text-slate-50 hover:bg-green-500 whitespace-nowrap"
        variant="flat"
        onPress={onOpen}
        isDisabled={isDisable}
      >
        Checkout
      </Button>
      <Drawer isOpen={isOpen} onOpenChange={onOpenChange}>
        <DrawerContent>
          {(onClose) => (
            <>
              <DrawerHeader className="flex flex-col text-center gap-1">
                Checkout
              </DrawerHeader>
              <DrawerBody className="space-y-4">
                {/* Shipping Details */}
                <div>
                  <Input
                    label="Shipping Details"
                    type="text"
                    variant="bordered"
                    ref={detailsRef}
                  />
                  {errors.details && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.details}
                    </p>
                  )}
                </div>

                {/* Phone Number */}
                <div>
                  <Input
                    label="Phone Number"
                    type="tel"
                    variant="bordered"
                    ref={phoneRef}
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                  )}
                </div>

                {/* City */}
                <div>
                  <Input
                    label="City"
                    type="text"
                    variant="bordered"
                    ref={cityRef}
                  />
                  {errors.city && (
                    <p className="text-red-500 text-sm mt-1">{errors.city}</p>
                  )}
                </div>
              </DrawerBody>

              <DrawerFooter className="flex justify-between">
                <Button color="danger" variant="flat" onPress={onClose}>
                  Close
                </Button>
                <div className="flex gap-2">
                  <Button
                    className="bg-green-600 text-slate-50"
                    onPress={handleCashOrder}
                    isDisabled={loading}
                  >
                    {loading ? "Placing..." : "Pay Cash"}
                  </Button>
                  <Button
                    className="bg-green-600 text-slate-50"
                    onPress={handleOnlinePayment}
                    isDisabled={loading}
                  >
                    Online Payment
                  </Button>
                </div>
              </DrawerFooter>
            </>
          )}
        </DrawerContent>
      </Drawer>
    </>
  );
}
