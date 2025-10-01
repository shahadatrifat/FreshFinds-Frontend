import React, { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";
import toast from "react-hot-toast";
import { getUserOrders } from "../../Services/productService";
import RatingAndReview from "../../components/RatingAndReview/RatingAndReview";
import { Button } from "../../components/ui/button";
import useAuth from "../../Hooks/useAuth";
import useUserProfile from "../../Hooks/useUserProfile"; // Custom hook to fetch user profile
import { Link } from "react-router";

const MyOrders = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isReviewDialogOpen, setIsReviewDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [reviewedProducts, setReviewedProducts] = useState([]);
  const { user: userProfile, isLoading: userLoading, isError: userError } = useUserProfile(user?.uid);

  // Fetch orders and reviews
  useEffect(() => {
    if (!user?.uid) return;

    const fetchOrders = async () => {
      try {
        const ordersData = await getUserOrders(user.uid);
        setOrders(ordersData);

        // Extract reviewed products for the current user
        const reviewed = ordersData
          .flatMap((order) => order.orderItems)
          .filter((item) =>
            item.productId?.reviews?.some(
              (review) => review.userId.toString() === userProfile?._id.toString()
            )
          )
          .map((item) => item.productId._id);
        
        setReviewedProducts(reviewed);  // Update reviewed products
      } catch (err) {
        console.error("Failed to fetch orders:", err);
      } finally {
        setLoading(false);
      }
    };

    if (!userLoading && !userError && userProfile) {
      fetchOrders();
    }
  }, [user, userProfile, userLoading, userError]);

  const handleOpenReviewDialog = (product) => {
    setSelectedProduct(product);
    setIsReviewDialogOpen(true);
  };

  const handleCloseReviewDialog = () => {
    setIsReviewDialogOpen(false);
    setSelectedProduct(null);
  };

  if (loading) return <div className="text-center py-10">Loading your orders...</div>;
  if (!orders.length) return <div className="text-center py-10">No orders yet.</div>;

  return (
     <div className="max-w-7xl mx-auto p-6 space-y-6">
      <h2 className="text-3xl font-semibold text-emerald font-lora mb-6">My Orders</h2>

      {/* Loop through orders */}
      {orders.map((order) => (
        <div
  key={order._id}
  className="bg-white rounded-xl shadow-lg p-4 sm:p-6 space-y-4 border border-gray-200"
>
  {/* Order Header */}
  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 sm:gap-3 mb-3">
    <p className="text-xs sm:text-sm text-gray-500">
      Order ID: {order.orderId}
    </p>
    <p
      className={`text-xs sm:text-sm font-semibold ${
        order.status === "pending" ? "text-green-500" : "text-green-600"
      }`}
    >
      {order.status === "pending" ? "Paid" : "Paid"}
    </p>
  </div>

  {/* Order Items */}
  <div className="space-y-4">
    {order.orderItems.map((item) => (
      <div
        key={item._id}
        className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 sm:gap-6"
      >
        {/* Product Image and Info */}
        <div className="flex items-center gap-3 w-full">
          <Link to={`/product/${item.productId?._id}`}>
            <img
              src={item.productId?.productImage || "/default-image.jpg"}
              alt={item.productId?.name}
              className="w-14 h-14 sm:w-16 sm:h-16 object-cover rounded-lg shadow-sm"
            />
          </Link>
          <div className="flex-1">
            <Link to={`/product/${item.productId?._id}`}>
              <p className="font-medium text-charcoal hover:underline text-sm sm:text-base">
                {item.productId?.name}
              </p>
            </Link>
            <p className="text-xs sm:text-sm text-gray-500">
              Qty: {item.quantity}
            </p>
          </div>
        </div>

        {/* Price + Button stacked on mobile */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-end gap-2 sm:gap-4 w-full sm:w-auto text-right">
          <p className="font-semibold text-charcoal text-sm sm:text-base">
            ${item.productId?.price.toFixed(2)}
          </p>

          {reviewedProducts.includes(item.productId._id) ? (
            <Button
              variant="link"
              className="text-gray-400 hover:text-gray-500 font-medium flex items-center gap-1 sm:gap-2 text-sm"
              disabled
            >
              <FaStar className="text-yellow-400" />
              Reviewed
            </Button>
          ) : (
            <Button
              variant="link"
              className="text-emerald-600 hover:text-emerald-700 font-medium flex items-center gap-1 sm:gap-2 text-sm"
              onClick={() => handleOpenReviewDialog(item.productId)}
            >
              <FaStar className="text-yellow-400" />
              Rate & Review
            </Button>
          )}
        </div>
      </div>
    ))}
  </div>

  {/* Order Total */}
  <div className="mt-3 flex flex-col sm:flex-row sm:justify-between sm:items-center font-bold gap-1 sm:gap-0">
    <span className="text-charcoal text-sm sm:text-base">Total:</span>
    <span className="text-emerald text-sm sm:text-base">
      ${order.totalAmount.toFixed(2)}
    </span>
  </div>

  {/* Order Date */}
  <p className="text-xs text-gray-400 mt-2">
    Ordered on {new Date(order.orderDate).toLocaleDateString()}
  </p>
</div>

      ))}

      {/* Rating and Review Dialog */}
      {selectedProduct && (
        <RatingAndReview
          product={selectedProduct}
          onClose={handleCloseReviewDialog}
          open={isReviewDialogOpen}
        />
      )}
    </div>
  );
};

export default MyOrders;
