import React from "react";
import Lottie from "react-lottie";
import cartLoader from "../../../assets/lotties/Shopping cart.json";

const CartLoaderFull = () => {
  const options = {
    loop: true,
    autoplay: true,
    animationData: cartLoader,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/20 bg-opacity-90 z-[9999]">
      <div className="w-72 h-72">
        <Lottie options={options} height={256} width={256} />
      </div>
    </div>
  );
};

export default CartLoaderFull;
