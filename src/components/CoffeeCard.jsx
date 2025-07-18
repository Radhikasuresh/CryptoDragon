import React from "react";
import { FaTrash, FaEdit, FaStar } from "react-icons/fa";
import { IoIosFlame } from "react-icons/io";

export default function CoffeeCard({ coffee, onEdit, onDelete }) {
  return (
    <div className="relative bg-white rounded-2xl shadow-xl overflow-hidden transform hover:scale-[1.02] transition duration-300 hover:shadow-2xl group">
      {coffee?.id % 2 !== 0 && (
        <div className="absolute top-3 left-3 bg-amber-400 text-amber-900 px-2 py-1 rounded-full text-xs font-bold flex items-center z-10">
          <IoIosFlame className="mr-1" /> Popular
        </div>
      )}

      <div className="relative">
        <img
          src={coffee.image}
          alt={coffee.title}
          className="w-full h-52 object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
      </div>

      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <h2 className="text-xl font-bold text-gray-800">{coffee.title}</h2>
          <div className="flex items-center bg-amber-100 text-amber-800 px-2 py-1 rounded-full text-sm font-semibold">
            <FaStar className="mr-1 text-amber-500" />
            {coffee.rating || "4.5"}
          </div>
        </div>

        <p className="text-sm text-gray-600 mb-3 line-clamp-3">
          {coffee.description}
        </p>

        <div className="mb-4">
          <h3 className="text-xs font-semibold text-gray-500 uppercase mb-1">
            Ingredients
          </h3>
          <div className="flex flex-wrap gap-1">
            {coffee.ingredients?.map((ingredient, index) => (
              <span
                key={index}
                className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full capitalize"
              >
                {ingredient}
              </span>
            ))}
          </div>
        </div>

        <div className="flex justify-between items-center pt-3 border-t border-gray-100">
          <span className="font-bold text-gray-800">
            ${coffee.price || "4.99"}
          </span>
          <div className="flex space-x-3">
            <button
              onClick={onEdit}
              className="text-gray-500 hover:text-blue-600 transition-colors duration-200 p-2 rounded-full hover:bg-blue-50"
              aria-label="Edit coffee"
            >
              <FaEdit />
            </button>
            <button
              onClick={onDelete}
              className="text-gray-500 hover:text-red-600 transition-colors duration-200 p-2 rounded-full hover:bg-red-50"
              aria-label="Delete coffee"
            >
              <FaTrash />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
