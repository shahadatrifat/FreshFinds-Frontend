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
          limit: 10, // fetch up to 10 related products
        });

        // Exclude the current product
        const filtered = res.data.filter((p) => p._id !== product._id);
        setRelatedProducts(filtered);
      } catch (error) {
        toast.error("Failed to load related products");
      } finally {
        setLoading(false);
      }
    };

    if (product?.category) {
      fetchRelated();
    }
  }, [product]);

  if (loading) return <p className="text-center text-gray-500 mt-4">Loading related products...</p>;
  if (!relatedProducts.length)
    return <p className="text-center text-gray-500 mt-4">No related products available.</p>;

  return (
    <div className="mt-12">
      <ProductRow
        title="Related Products"
        products={relatedProducts}
        seeMoreHref={`/category/${product.category}`}
      />
    </div>
  );
};

export default RelatedProducts;
