import React from "react";
import Lottie from "react-lottie";
import cartLoader from "../../../assets/lotties/Shopping cart.json";

const CartLoader = () => {
  const options = {
    loop: true,
    autoplay: true,
    animationData: cartLoader,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div style={{ width: "100px", height: "100px", margin: "auto" }}>
      {/* Adjust width and height as needed */}
      <Lottie options={options} />
    </div>
  );
};

export default CartLoader;
