// src/components/Home/FeaturedGrid.jsx
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchPublicProducts } from '../../Services/productService';
import ProductCard from '../../pages/All-Products/ProductCard';
import SkeletonCardLoader from '../../pages/shared/loaders/SkeletonCardLoader';
import toast from 'react-hot-toast';

const FeaturedGrid = ({ limit = 8 }) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['featuredProducts'],
    queryFn: () => fetchPublicProducts({}), 
    staleTime: 1000 * 60 * 5,
    onError: () => toast.error('Failed to fetch featured products'),
  });

  const products = data?.data || [];
  const featured = [...products]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, limit);

  return (
    <section className="py-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold font-lora text-emerald">Featured Products</h2>
        <a href="/products" className="text-sm text-emerald-600 hover:underline">See all</a>
      </div>

      {isLoading ? (
        <SkeletonCardLoader limit={limit} />
      ) : isError ? (
        <div className="text-center text-red-500">Failed to load featured products.</div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {featured.map(p => <ProductCard key={p._id} product={p} />)}
        </div>
      )}
    </section>
  );
};

export default FeaturedGrid;
