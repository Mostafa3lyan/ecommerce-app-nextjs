"use client";
import React, { useEffect, useState, useMemo } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@heroui/react";
import { Spinner } from "@heroui/spinner";
import { SortIcon } from "@heroui/shared-icons";
import getUserOrders from "@/api/getUserOrders";
import { ordersTypes } from "@/types/orders.types";

interface UserOrdersProps {
  id: string | null;
}

const UserOrders: React.FC<UserOrdersProps> = ({ id }) => {
  const [orders, setOrders] = useState<ordersTypes[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sortDescriptor, setSortDescriptor] = useState<any>({
    column: "createdAt",
    direction: "descending",
  });

  useEffect(() => {
    if (!id) {
      setOrders([]);
      setIsLoading(false);
      return;
    }

    async function fetchOrders() {
      try {
        setIsLoading(true);
        const res = await getUserOrders(id as string);
        setOrders(res);
      } catch (err) {
        console.error("❌ Error fetching orders:", err);
        setOrders([]);
      } finally {
        setIsLoading(false);
      }
    }

    fetchOrders();
  }, [id]);

  // Sorting logic
  const sortedOrders = useMemo(() => {
    return [...orders].sort((a, b) => {
      const first = a[sortDescriptor.column as keyof typeof a];
      const second = b[sortDescriptor.column as keyof typeof b];

      if (typeof first === "number" && typeof second === "number") {
        return sortDescriptor.direction === "ascending"
          ? first - second
          : second - first;
      }

      return sortDescriptor.direction === "ascending"
        ? String(first).localeCompare(String(second))
        : String(second).localeCompare(String(first));
    });
  }, [orders, sortDescriptor]);

  return (
    <div className="mb-10">
      <Table
        aria-label="User orders table"
        removeWrapper
        sortDescriptor={sortDescriptor}
        onSortChange={setSortDescriptor}
        sortIcon={SortIcon}
      >
        <TableHeader>
          <TableColumn key="_id" allowsSorting>
            Order ID
          </TableColumn>
          <TableColumn key="createdAt" allowsSorting>
            Date
          </TableColumn>
          <TableColumn key="shippingAddress">Shipping Address</TableColumn>
          <TableColumn key="phone">Phone</TableColumn>
          <TableColumn key="paymentMethodType" allowsSorting>
            Payment Method
          </TableColumn>
          <TableColumn key="isDelivered" allowsSorting>
            Status
          </TableColumn>
          <TableColumn key="totalOrderPrice" allowsSorting>
            Total Price
          </TableColumn>
        </TableHeader>

        <TableBody
          items={sortedOrders}
          isLoading={isLoading}
          loadingContent={
            <div className="w-full flex justify-center py-10">
              <Spinner size="lg" color="success" />
            </div>
          }
          emptyContent={
            <div className="w-full text-center py-10 text-gray-500">
              {id ? "No orders found 🛒" : "Please log in to view orders"}
            </div>
          }
        >
          {(item) => (
            <TableRow key={item.id}>
              <TableCell>{item.id}</TableCell>
              <TableCell>
                {new Date(item.createdAt).toLocaleDateString("en-GB")}
              </TableCell>
              <TableCell>
                {item.shippingAddress?.details}, {item.shippingAddress?.city} 📍
              </TableCell>
              <TableCell>{item.shippingAddress?.phone}</TableCell>
              <TableCell>{item.paymentMethodType}</TableCell>
              <TableCell>
                <span
                  className={`px-2 py-1 rounded text-xs font-semibold ${
                    item.isDelivered
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {item.isDelivered ? "Delivered" : "Pending"}
                </span>
              </TableCell>
              <TableCell>{item.totalOrderPrice} EGP</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default UserOrders;
