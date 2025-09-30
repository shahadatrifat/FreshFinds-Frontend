import React from "react";
import { FaStar, FaRegStar } from "react-icons/fa";

const ProductReviews = ({ product }) => {
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        i <= rating ? (
          <FaStar key={i} className="text-yellow-400" />
        ) : (
          <FaRegStar key={i} className="text-gray-300" />
        )
      );
    }
    return stars;
  };

  return (
    <div className="space-y-8 mt-10">
      <h2 className="text-4xl font-bold text-emerald font-lora mb-6">Customer Reviews ({product.reviews?.length || 0})</h2>

      {product.reviews?.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">No reviews yet. Be the first to review this product!</p>
      ) : (
        <div className="grid gap-6">
          {product.reviews.map((review) => (
            <div
              key={review._id}
              className="bg-beige backdrop-blur-sm border rounded-xl p-6 transform "
            >
              <div className="flex items-center gap-4 mb-4">
                {/* Reviewer Avatar */}
                {review.userId?.photoURL ? (
                  <img
                    src={review.userId.photoURL}
                    alt={review.userId.displayName || "User avatar"}
                    className="w-12 h-12 rounded-full object-cover border-2 border-emerald-500"
                  />
                ) : (
                  <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-full flex justify-center items-center text-white text-xl font-bold">
                    {review.userId?.displayName[0]?.toUpperCase() || "U"}
                  </div>
                )}

                {/* Reviewer Name & Date */}
                <div>
                  <p className="font-semibold text-emerald-700 text-lg flex items-center gap-1">
                    {review.userId?.displayName || "Anonymous"}
                    {review.userId?.photoURL && <span className="text-sm text-gray-400">•</span>}
                  </p>
                  <p className="text-sm text-gray-500">
                    {new Date(review.reviewDate).toLocaleDateString()}
                  </p>
                </div>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-3">
                {renderStars(review.rating)}
                <span className="ml-2 text-gray-600 text-sm">{review.rating}/5</span>
              </div>

              {/* Review Text */}
              <p className="text-gray-700 text-base leading-relaxed">{review.reviewText}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductReviews;
