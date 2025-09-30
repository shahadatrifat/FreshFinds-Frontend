import React, { useState } from "react";
import { Button } from "../../components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../../components/ui/dialog";
import Rating from "@mui/material/Rating";
import { TextField } from "@mui/material";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postProductReview } from "../../Services/productService";
import useAuth from "../../Hooks/useAuth";

const RatingAndReviewDialog = ({ open, product, onClose }) => {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
    const {user} = useAuth();
  const queryClient = useQueryClient(); // ✅ Correct way
  // Use mutation to handle the review submission
  const { mutateAsync: submitReview, isLoading } = useMutation({
    mutationFn: (reviewData) => postProductReview(product._id, reviewData),
    onSuccess: (data) => {
      // Refresh product details
      queryClient.invalidateQueries(["product", product._id]);
      toast.success(data.message || "Review submitted successfully!");
      onClose();
    },
    onError: () => {
      toast.error("Failed to submit review, please try again.");
    },
  });

  const handleSubmit = () => {
    if (!rating || !review.trim()) {
      toast.error("Please provide a rating and review.");
      return;
    }

    // TODO: Replace "USER_ID" with actual logged-in MongoDB user _id
    const reviewData = { rating, reviewText: review, userId: user.uid  };

    submitReview(reviewData); 
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Rate and Review {product?.name}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Rating */}
          <Rating
            name="product-rating"
            value={rating}
            onChange={(event, newValue) => setRating(newValue)}
            size="large"
          />

          {/* Review Textarea */}
          <TextField
            className="w-full"
            label="Write your review here"
            multiline
            rows={4}
            value={review}
            onChange={(e) => setReview(e.target.value)}
            variant="outlined"
            fullWidth
            helperText="Feel free to share your experience with this product!"
          />

          {/* Actions */}
          <DialogFooter className="flex justify-end">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button
              className="ml-2"
              onClick={handleSubmit}
              disabled={isLoading}
            >
              {isLoading ? "Submitting..." : "Submit Review"}
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RatingAndReviewDialog;
