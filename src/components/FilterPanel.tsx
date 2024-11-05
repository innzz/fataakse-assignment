import React, { useState } from "react";
import { useFilter } from "../context/FilterProvider";
import useDebounce from "../hooks/useDebounce";

const FilterPanel: React.FC = () => {
  const {
    selectedCategory,
    setSelectedCategory,
    selectedBrand,
    setSelectedBrand,
    availability,
    setAvailability,
    price,
    setPrice,
    clearFilters
  } = useFilter();
  const [currPrice, setCurrPrice] = useState(price || 0);
  const debouncedPrice = useDebounce<number>(currPrice, 300); // Adjust delay as needed

  const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value);
    setCurrPrice(value);
  };

  // You can use debouncedPrice for filtering products
  // Example: useEffect to filter products based on debouncedPrice
  React.useEffect(() => {
    setPrice(debouncedPrice)
  }, [debouncedPrice]);


  React.useEffect(() => {
    setCurrPrice(price || 0)
  }, [price]);
  return (
    <div className="w-56 h-full py-6 bg-white space-y-8">
      {/* Categories Filter */}
      <div>
        <div className="w-full flex justify-between items-center mb-2">
          <h2 className="text-lg font-semibold text-gray-800">
            Categories
          </h2>
          <p className="cursor-pointer text-blue-500 hover:underline" onClick={clearFilters}>clear all filters</p>
        </div>
        <ul className="space-y-2 text-gray-700">
          {[
            "Shoes",
            "Headphones",
            "Smartphones",
            "Electronics",
            "Speakers",
            "Furniture",
          ].map((category) => (
            <li key={category} className="flex items-center">
              <label className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="category"
                  value={category}
                  checked={selectedCategory === category}
                  onChange={() => setSelectedCategory(category)}
                  className="hidden"
                />
                <span
                  className={`w-4 h-4 border-2 border-gray-400 mr-2 ${
                    selectedCategory === category ? "bg-orange-500" : "bg-white"
                  }`}
                />
                <span>{category}</span>
              </label>
            </li>
          ))}
        </ul>
      </div>

      {/* Price Filter */}
      <div>
        <h2 className="text-lg font-semibold text-gray-800 mb-2">Price</h2>
        <p className="text-gray-600 text-sm mb-1">Price Range: ₹0 to ₹25,000</p>
        <div className="relative w-full">
          <input
            type="range"
            min="0"
            max="7500"
            value={currPrice || 0}
            onChange={handlePriceChange}
            className="w-full cursor-pointer"
          />
          {/* Static display for 0 at the start of the slider */}
          <div className="absolute top-3 left-0 transform translate-y-1">
            <span className="text-xs text-gray-700 bg-white px-1">₹0</span>
          </div>
          {/* Display selected price below the slider thumb */}
          <div
            className="absolute top-3 transform translate-y-1"
            style={{ left: `${((currPrice || 0) / 7500) * 80}%` }}
          >
            <span className="text-xs text-gray-700 bg-white pl-1">
              ₹{currPrice}
            </span>
          </div>
        </div>
      </div>

      {/* Brands Filter */}
      <div>
        <h2 className="text-lg font-semibold text-gray-800 mb-2">Brands</h2>
        <ul className="space-y-2 text-gray-700">
          {["Ikea", "Nike", "Adidas", "Apple", "Samsung", "Puma"].map(
            (brand) => (
              <li key={brand} className="flex items-center">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="brand"
                    value={brand}
                    checked={selectedBrand === brand}
                    onChange={() => setSelectedBrand(brand)}
                    className="hidden"
                  />
                  <span
                    className={`w-4 h-4 border-2 border-gray-400 mr-2 ${
                      selectedBrand === brand ? "bg-orange-500" : "bg-white"
                    }`}
                  />
                  <span>{brand}</span>
                </label>
              </li>
            )
          )}
        </ul>
      </div>

      {/* Availability Filter */}
      <div>
        <h2 className="text-lg font-semibold text-gray-800 mb-2">
          Availability
        </h2>
        <ul className="space-y-2 text-gray-700">
          {["In Stock", "Out of Stock"].map((option) => (
            <li key={option} className="flex items-center">
              <label className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="availability"
                  value={option}
                  checked={availability === option}
                  onChange={() => setAvailability(option)}
                  className="hidden"
                />
                <span
                  className={`w-4 h-4 border-2 border-gray-400 mr-2 ${
                    availability === option ? "bg-orange-500" : "bg-white"
                  }`}
                />
                <span>{option}</span>
              </label>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FilterPanel;
