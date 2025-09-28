import { useEffect, useState } from "react";
import useAuth from "../../Hooks/useAuth";
import { getUserOrders } from "../../Services/productService";

const MyOrders = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.uid) return;

    const fetchOrders = async () => {
      try {
        const ordersData = await getUserOrders(user.uid);
        setOrders(ordersData);
      } catch (err) {
        console.error("Failed to fetch orders:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user]);

  if (loading)
    return <p className="text-center py-10">Loading your orders...</p>;
  if (!orders.length)
    return <p className="text-center py-10">No orders yet.</p>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-lora text-emerald font-bold mb-6">My Orders</h2>
      {orders.map((order) => (
        <div
          key={order._id}
          className="mb-6 border rounded-lg p-4 shadow bg-offwhite"
        >
          <div className="flex justify-between items-center mb-3">
            <p className="text-sm text-gray-500">Order ID: {order.orderId}</p>
            <p
              className={`text-sm font-semibold ${
                order.status === "pending" ? "text-green-600" : "text-green-600"
              }`}
            >
              Paid
            </p>
          </div>

          <div className="space-y-3">
            {order.orderItems.map((item) => (
              <div key={item._id} className="flex justify-between items-center">
                {/* Product Image */}
                <div className="flex gap-4 items-center">
                  <img
                    src={item.productId?.productImage || "/default-image.jpg"}
                    alt={item.productId?.name}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div>
                    <p className="font-medium">{item.productId?.name}</p>
                    <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                  </div>
                </div>

                <p className="font-bold text-charcoal">
                  ${item.productId?.price.toFixed(2)}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-3 flex justify-between font-bold">
            <span className="text-charcoal">Total:</span>
            <span className="text-emerald">${order.totalAmount.toFixed(2)}</span>
          </div>

          <p className="text-xs text-gray-400 mt-2">
            Ordered on {new Date(order.orderDate).toLocaleDateString()}
          </p>
        </div>
      ))}
    </div>
  );
};

export default MyOrders;
