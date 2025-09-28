import { useNavigate } from "react-router";
import { ShoppingCart } from "lucide-react";

const CheckoutButton = ({ disabled }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/checkout");
  };

  return (
    <button
      onClick={handleClick}
      disabled={disabled}
      className="flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-600 to-emerald-700 text-beige rounded-lg px-6 py-3 hover:bg-emerald-800 disabled:opacity-50 transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg"
    >
      <ShoppingCart className="w-5 h-5" />
      <span>Proceed to Checkout</span>
    </button>
  );
};

export default CheckoutButton;
