import React from "react";
import { useQueries } from "@tanstack/react-query";
import { fetchPublicProducts } from "../../Services/productService";
import toast from "react-hot-toast";
import ProductRow from "./ProductRow";
import SkeletonCardLoader from "../shared/loaders/SkeletonCardLoader";
import EmptyState from "../shared/EmptyState";

const categories = [
  { value: "meat", label: "Meat" },
  { value: "vegetables", label: "Vegetables" },
  { value: "fruits", label: "Fruits" },
  { value: "dairy", label: "Dairy" },
  { value: "grains", label: "Grains" },
  { value: "bakery", label: "Bakery" },
  { value: "beverages", label: "Beverages" },
  { value: "snacks", label: "Snacks" },
  { value: "frozen_foods", label: "Frozen Foods" },
  { value: "spices_condiments", label: "Spices & Condiments" },
  { value: "organic", label: "Organic" },
  { value: "canned_goods", label: "Canned & Jarred Goods" },
  { value: "household_essentials", label: "Household Essentials" },
  { value: "personal_care", label: "Personal Care" },
  { value: "baby_products", label: "Baby Products" },
  { value: "health_wellness", label: "Health & Wellness" },
  { value: "farm_garden", label: "Farm & Garden" },
  { value: "seafood", label: "Seafood" },
  { value: "ready_meals", label: "Ready Meals" },
];

const AllProducts = () => {
  const categoryQueries = useQueries({
    queries: categories.map((cat) => ({
      queryKey: ["products", cat.value],
      queryFn: () => fetchPublicProducts({ category: cat.value, limit: 10 }), 
      staleTime: 1000 * 60 * 5,
      retry: 1,
      onError: () => toast.error(`Failed to load ${cat.label} products`),
    })),
  });

  return (
    <div className="bg-offwhite">
      <div className="p-6 space-y-12 container mx-auto">
        {categories.map((cat, index) => {
          const query = categoryQueries[index];

          return (
            <div key={cat.value} className="space-y-4">
              {/* State Handling */}
              {query.isPending ? (
                // Loading State
                <div className="flex justify-center items-center py-8">
                  <SkeletonCardLoader />
                </div>
              ) : query.isError ? (
                // Error State
                <p className="text-center text-red-500">
                  Failed to load {cat.label} products.
                </p>
              ) : query.data?.data?.length === 0 ? (
                // Empty State
                <div className="text-center">
                  <p className="text-gray-500">
                    No products available in {cat.label}.
                    <EmptyState></EmptyState>
                  </p>
                </div>
              ) : (
                // Success State
                <ProductRow
                  title={cat.label}
                  products={query.data.data}
                  seeMoreHref={`/category/${cat.value}`}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AllProducts;
