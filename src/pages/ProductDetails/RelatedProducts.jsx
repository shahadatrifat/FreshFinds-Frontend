import React, { useEffect, useState } from "react";
import ProductRow from "../All-Products/ProductRow";
import { fetchPublicProducts } from "../../Services/productService";
import toast from "react-hot-toast";

const RelatedProducts = ({ product }) => {
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRelated = async () => {
  try {
    setLoading(true);
    const res = await fetchPublicProducts({
      category: product.category,
      limit: 10, 
    });
    console.log("Related products fetched successfully:", res.data);
    const filtered = res.data.filter((p) => p._id !== product._id);
    setRelatedProducts(filtered);
  } catch (error) {
    console.log("Error fetching related products:", error.message);
  } finally {
    setLoading(false);
  }
};


    if (product?.category) fetchRelated();
  }, [product]);

  if (loading)
    return (
      <p className="text-center text-gray-500 mt-4 text-lg font-medium">
        Loading related products...
      </p>
    );

  if (!relatedProducts.length)
    return (
      <p className="text-center text-gray-500 mt-4 text-lg font-medium">
        No related products available.
      </p>
    );

  return (
    <section className="mt-12 container mx-auto space-y-6">
      <h2 className="text-3xl md:text-4xl font-extrabold text-emerald-700 text-center">
        Related Products
      </h2>

      <div className="relative bg-offwhite rounded-2xl p-4">
        {/* Gradient overlays */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-offwhite/90 to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-offwhite/90 to-transparent z-10" />

        {/* Product row */}
        <ProductRow
          title=""
          products={relatedProducts}
          seeMoreHref={`/category/${product.category}`}
        />
      </div>
    </section>
  );
};

export default RelatedProducts;
