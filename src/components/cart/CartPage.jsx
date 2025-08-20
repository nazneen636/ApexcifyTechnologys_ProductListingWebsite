"use client";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  increaseQty,
  decreaseQty,
  removeFromCart,
  clearCart,
} from "../../Feature/slices/cartSlice";
import { FaMinus, FaPlus, FaTrash } from "react-icons/fa";

const CartPage = () => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  console.log(cart);

  const totalPrice = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6">🛒 Shopping Cart</h1>

      {cart.length === 0 ? (
        <p className="text-lg text-gray-600">Your cart is empty.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left: Cart Items */}
          <div className="col-span-2">
            {cart.map((item) => (
              <div
                key={item.id}
                className="grid grid-cols-6 items-center p-4 border border-gray-200 shadow rounded-lg mb-4"
              >
                {/* img */}
                <div className="w-20 h-20  bg-gray-200 rounded overflow-hidden">
                  <img
                    src={item.thumbnail || item.image}
                    alt={item.title}
                    className="w-full h-full object-cover rounded"
                  />
                </div>
                {/* title and price */}
                <div className="-ml-10">
                  <h2 className="font-semibold text-xl">{item.title}</h2>
                  <p className="text-gray-600 text-base">${item.price}</p>
                </div>
                <div className="flex items-center gap-3 mt-2  col-span-2">
                  <button
                    onClick={() => dispatch(decreaseQty(item.id))}
                    className="w-8 h-8 cursor-pointer flex items-center justify-center  border rounded hover:bg-gray-100 text-sm text-gray-800"
                  >
                    <FaMinus />
                  </button>
                  <span className="text-lg">{item.quantity}</span>
                  <button
                    onClick={() => dispatch(increaseQty(item.id))}
                    className="w-8 h-8 cursor-pointer flex items-center justify-center border rounded hover:bg-gray-100 text-sm text-gray-800"
                  >
                    <FaPlus />
                  </button>
                </div>
                <div className="flex items-center gap-4">
                  <span className="font-bold">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
                <button
                  onClick={() => dispatch(removeFromCart(item.id))}
                  className="text-red-500 hover:text-red-700 cursor-pointer text-xl"
                >
                  <FaTrash />
                </button>
              </div>
            ))}
          </div>

          {/* Right: Summary */}
          <div className="p-6 border rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            <div className="flex justify-between mb-2">
              <span>Subtotal</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Shipping</span>
              <span>$10.00</span>
            </div>
            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>${(totalPrice + 10).toFixed(2)}</span>
            </div>
            <button className="w-full bg-green-600 text-white py-2 rounded mt-4 hover:bg-green-700">
              Checkout
            </button>
            <button
              onClick={() => dispatch(clearCart())}
              className="w-full bg-red-500 text-white py-2 rounded mt-2 hover:bg-red-600"
            >
              Clear Cart
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
