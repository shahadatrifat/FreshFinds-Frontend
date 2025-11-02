import React from "react";
import { FaStar, FaRegStar } from "react-icons/fa";
import { motion } from "framer-motion";
import { MessageSquare, Star } from "lucide-react";

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

  // Calculate average rating
  const averageRating = product.reviews?.length > 0
    ? (product.reviews.reduce((sum, review) => sum + review.rating, 0) / product.reviews.length).toFixed(1)
    : 0;

  return (
    <div className="space-y-8">
      {/* Header with Stats */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-emerald-700 font-lora flex items-center gap-3">
            <MessageSquare className="w-8 h-8" />
            Customer Reviews
          </h2>
          <p className="text-gray-600 mt-2">
            {product.reviews?.length || 0} {product.reviews?.length === 1 ? 'review' : 'reviews'}
          </p>
        </div>
        
        {/* Average Rating Display */}
        {product.reviews?.length > 0 && (
          <div className="bg-gradient-to-br from-emerald-50 to-mint/20 rounded-2xl p-4 md:p-6 border border-emerald-200 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="text-center">
                <div className="text-4xl font-bold text-emerald-700">{averageRating}</div>
                <div className="flex items-center gap-1 mt-1">
                  {renderStars(Math.round(averageRating))}
                </div>
                <p className="text-xs text-gray-600 mt-1">Average Rating</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Reviews List or Empty State */}
      {product.reviews?.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center py-16 bg-gradient-to-br from-beige/30 to-mint/10 rounded-2xl border-2 border-dashed border-emerald-200"
        >
          <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Star className="w-10 h-10 text-emerald-600" />
          </div>
          <p className="text-gray-600 text-lg mb-2">No reviews yet</p>
          <p className="text-gray-500">Be the first to review this product!</p>
        </motion.div>
      ) : (
        <div className="grid gap-4 md:gap-6">
          {product.reviews.map((review, index) => (
            <motion.div
              key={review._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white border-2 border-gray-100 rounded-2xl p-5 md:p-6 transition-all duration-300 group"
            >
              <div className="flex items-start gap-4 mb-4">
                {/* Reviewer Avatar */}
                {review.userId?.photoURL ? (
                  <img
                    src={review.userId.photoURL}
                    alt={review.userId.displayName || "User avatar"}
                    className="w-12 h-12 md:w-14 md:h-14 rounded-full object-cover border-2 border-emerald-500 shadow  flex-shrink-0"
                  />
                ) : (
                  <div className="w-12 h-12 md:w-14 md:h-14 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-full flex justify-center items-center text-white text-xl font-bold shadow flex-shrink-0">
                    {review.userId?.displayName?.[0]?.toUpperCase() || "U"}
                  </div>
                )}

                {/* Reviewer Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
                    <div>
                      <p className="font-bold text-emerald-700 text-lg">
                        {review.userId?.displayName || "Anonymous"}
                      </p>
                      <p className="text-sm text-gray-500">
                        {new Date(review.reviewDate).toLocaleDateString('en-US', { 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}
                      </p>
                    </div>
                    
                    {/* Rating */}
                    <div className="flex items-center gap-2 bg-gradient-to-r from-yellow-50 to-orange-50 px-3 py-1.5 rounded-full border border-yellow-200">
                      <div className="flex items-center gap-0.5">
                        {renderStars(review.rating)}
                      </div>
                      <span className="text-sm font-semibold text-gray-700">{review.rating}/5</span>
                    </div>
                  </div>

                  {/* Review Text */}
                  <p className="text-gray-700 text-base leading-relaxed mt-3">
                    {review.reviewText}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductReviews;