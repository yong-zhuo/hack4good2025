"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import { ShoppingCart } from "lucide-react";

const Add = ({
  productId,
  stockQuantity,
}) => {
  const [quantity, setQuantity] = useState(1);


  const handleQuantity = (type) => {
    if (type === "decrement" && quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
    if (type === "increment" && quantity < stockQuantity) {
      setQuantity((prev) => prev + 1);
    }
  };

  const outOfStock = stockQuantity < 1;


  return (
    <div className="flex flex-col gap-4">
      <h4 className="font-medium">Choose a Quantity</h4>
      <div className="flex justify-between">
        <div className="flex items-center gap-4">
          <div className="bg-gray-100 py-2 px-4 rounded-3xl flex items-center justify-between w-32">
            <button
              className="cursor-pointer text-xl disabled:cursor-not-allowed disabled:opacity-20"
              onClick={() => handleQuantity("decrement")}
              disabled={quantity===1}
            >
              -
            </button>
            {quantity}
            <button
              className="cursor-pointer text-xl disabled:cursor-not-allowed disabled:opacity-20"
              onClick={() => handleQuantity("increment")}
              disabled={quantity===stockQuantity}
            >
              +
            </button>
          </div>
          {outOfStock ? (
            <div className="text-md text-red-500">Product is out of stock</div>
          ) : (
            <div className="text-md">
             <span className="text-orange-700">{stockQuantity} items</span>{" "}
              left!
            </div>
          )}
        </div>
        <Button
          
          disabled={outOfStock}
          className="w-36 text-sm rounded-3xl ring-1 ring-slate-500 text-sec py-2 px-4 hover:bg-pri bg-slate-500  hover:text-white disabled:cursor-not-allowed disabled:bg-pri disabled:ring-0 disabled:text-white disabled:ring-none flex items-center justify-center"
        >
            <ShoppingCart/>
          Add to Cart
        </Button>
      </div>
    </div>
  );
};

export default Add;