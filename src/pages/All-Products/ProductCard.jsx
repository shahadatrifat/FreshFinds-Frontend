import React from "react";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { fetchPublicProducts } from "../../Services/productService";
import toast from "react-hot-toast";
import ProductCard from "../../pages/All-Products/ProductCard";
import SkeletonCardLoader from "../shared/loaders/SkeletonCardLoader";

const CategoryPage = () => {
  const { categoryId } = useParams();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["products", categoryId],
    queryFn: () => fetchPublicProducts({ category: categoryId }),
    staleTime: 1000 * 60 * 5,
    onError: () => toast.error("Failed to load products"),
  });

  const products = data?.data || [];

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold text-emerald-600 capitalize">
  {categoryId ? categoryId.replace(/_/g, " ") : ""}
</h1>

      {isLoading ? (
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <SkeletonCardLoader key={i} />
          ))}
        </div>
      ) : isError ? (
        <p className="text-center text-red-500">Failed to load products.</p>
      ) : products.length === 0 ? (
        <p className="text-center text-gray-500">
          No products available in this category.
        </p>
      ) : (
        <div className="flex flex-col gap-4">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryPage;
