import React from "react";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { fetchPublicProducts } from "../../Services/productService";
import toast from "react-hot-toast";
import ProductRow from "../../pages/All-Products/ProductRow";
import SkeletonCardLoader from "../shared/loaders/SkeletonCardLoader";

const Category = () => {
  const { categoryName } = useParams();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["products", categoryName],
    queryFn: () => fetchPublicProducts({ category: categoryName }),
    staleTime: 1000 * 60 * 5,
    onError: () => toast.error("Failed to load products"),
  });

  return (
    <div className="bg-offwhite p-6 container mx-auto">
      <h1 className="text-3xl font-bold text-emerald-600 mb-6 capitalize">
        {categoryName.replace("_", " ")}
      </h1>

      {isLoading ? (
        <div className="flex justify-center py-8">
          <SkeletonCardLoader />
        </div>
      ) : isError ? (
        <p className="text-center text-red-500">
          Failed to load {categoryName} products.
        </p>
      ) : data?.data?.length === 0 ? (
        <p className="text-center text-gray-500">
          No products available in this category.
        </p>
      ) : (
        <ProductRow
          title={categoryName.replace("_", " ")}
          products={data.data}
          seeMoreHref="" // optional, can hide here
        />
      )}
    </div>
  );
};

export default Category;
