import React from "react";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { fetchPublicProducts } from "../../Services/productService";
import ProductCard from "../../pages/All-Products/ProductCard";
import SkeletonCardLoader from "../../pages/shared/loaders/SkeletonCardLoader";

const Category = () => {
  const { categoryName } = useParams();
  const prettyName = categoryName ? categoryName.replace(/_/g, " ") : "";

  const { data, isLoading, isError } = useQuery({
    queryKey: ["products", categoryName],
    queryFn: () => fetchPublicProducts({ category: categoryName }),
    staleTime: 1000 * 60 * 5,
    onError: () => toast.error("Failed to load products"),
  });

  const products = data?.data || [];

  return (
    <div className="bg-offwhite p-6 container mx-auto max-w-7xl">
      {/* Category Header */}
      <header className="mb-6 text-center">
        <h1 className="text-3xl font-bold text-emerald-600 capitalize">{prettyName}</h1>
        <p className="text-sm text-gray-500 mt-2">
          {isLoading ? "Loading products…" : `${products.length} product${products.length !== 1 ? "s" : ""}`}
        </p>
      </header>

      {isLoading ? (
        <div className="space-y-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {[...Array(6)].map((_, i) => (
            <SkeletonCardLoader key={i} />
          ))}
        </div>
      ) : isError ? (
        <div className="text-center text-red-500">Failed to load {prettyName} products.</div>
      ) : products.length === 0 ? (
        <div className="text-center text-gray-500">No products available in this category.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Category;
