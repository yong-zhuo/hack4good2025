"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import { ShoppingCart } from "lucide-react";
import { addToCart } from "@/firebase/firestore/cartFunction";
import { useAuthContext } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";

const Add = ({
    product,
}) => {
    const [quantity, setQuantity] = useState(1);

    const stockQuantity = product.stockQuantity;

    const handleQuantity = (type) => {
        if (type === "decrement" && quantity > 1) {
            setQuantity((prev) => prev - 1);
        }
        if (type === "increment" && quantity < stockQuantity) {
            setQuantity((prev) => prev + 1);
        }
    };

    const outOfStock = stockQuantity < 1;

    const { user } = useAuthContext();

    const { toast } = useToast();

    const handleAddToCart = async () => {

        if (!user) {
            toast({
                variant: "destructive",
                title: "Error adding item to cart",
                description: "Please sign in to add to cart",
            })
        }

        try {
            const productToAdd = {
                productId: product.id,
                name: product.name,
                price: product.price,
                image: product.image,
                description: product.description,
                quantity: quantity,
            };

            const response = await addToCart(user.uid, productToAdd);

            if (response.success) {
                toast({
                    variant: "success",
                    title: "Item added to cart",
                    description: "Product added to cart successfully",
                });
            } else {
                toast({
                    variant: "destructive",
                    title: "Error adding item to cart",
                    description: "An unexpected error occurred. Please try again.",
                })
            }
        } catch (error) {
            console.error('Error in handleAddToCart:', error);
            toast({
                variant: "destructive",
                title: "Error adding item to cart",
                description: "An unexpected error occurred. Please try again.",
            })
        }
    };

    return (
        <div className="flex flex-col gap-4">
            <h4 className="font-medium">Choose a Quantity</h4>
            <div className="flex justify-between">
                <div className="flex items-center gap-4">
                    <div className="bg-gray-100 py-2 px-4 rounded-3xl flex items-center justify-between w-32">
                        <button
                            className="cursor-pointer text-xl disabled:cursor-not-allowed disabled:opacity-20"
                            onClick={() => handleQuantity("decrement")}
                            disabled={quantity === 1}
                        >
                            -
                        </button>
                        {quantity}
                        <button
                            className="cursor-pointer text-xl disabled:cursor-not-allowed disabled:opacity-20"
                            onClick={() => handleQuantity("increment")}
                            disabled={quantity === stockQuantity}
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
                    onClick={handleAddToCart}
                    disabled={outOfStock}
                    className="w-36 text-sm rounded-3xl ring-1 ring-slate-500 text-sec py-2 px-4 hover:bg-pri bg-slate-500  hover:text-white disabled:cursor-not-allowed disabled:bg-pri disabled:ring-0 disabled:text-white disabled:ring-none flex items-center justify-center"
                >
                    <ShoppingCart />
                    Add to Cart
                </Button>
            </div>
        </div>
    );
};

export default Add;