import React, { useMemo } from "react";
import products from "../assets/products.json";
import { useFilter } from "../context/FilterProvider";

const ProductListing: React.FC = () => {
  const {
    selectedCategory,
    selectedBrand,
    availability,
    price,
    setSortBy,
    sortBy,
    clearFilters,
  } = useFilter();

  const filteredProducts = useMemo(
    () =>
      products
        .filter((product) => {
          const inPrice = price ? product.price > price : true;
          const inCategory = selectedCategory
            ? product.category.toLowerCase() === selectedCategory.toLowerCase()
            : true;
          const inBrand = selectedBrand
            ? product.brand.toLowerCase() === selectedBrand.toLowerCase()
            : true;
          const inAvailability = availability
            ? product.availability.toLowerCase() === availability.toLowerCase()
            : true;

          return inBrand && inCategory && inAvailability && inPrice;
        })
        .sort((a) => {
            // Adjust sorting based on `sortBy` value
            if (sortBy === "Most Popular") {
              return a.sort === "Most Popular" ? -1 : 1;
            } else if (sortBy === "Less Popular") {
              return a.sort === "Less Popular" ? -1 : 1;
            }
            return 0;
          }),
    [availability, price, selectedBrand, selectedCategory, sortBy]
  );

  return (
    <div className="flex-1 flex flex-col pl-10 pt-6">
      {/* Top Section */}
      <div className="flex pl-2 justify-between items-center mb-6 sticky top-0 z-10">
        <div className="text-lg">
          Showing{" "}
          <span className="text-orange-500">{filteredProducts.length}</span> of{" "}
          <span className="text-orange-500">{products.length}</span> Products
        </div>
        <div className="flex items-center justify-between gap-4">
          <label htmlFor="Sort-by">Sort by:</label>
          <select
            value={sortBy || "All"}
            onChange={(e) => setSortBy(e.target.value)}
            className="border-2 bg-white outline-none border-gray-300 rounded-md px-5 py-3 text-left"
          >
            <option value="All">All</option>
            <option value="Most Popular">Most popular</option>
            <option value="Less Popular">Less popular</option>
          </select>
        </div>
      </div>

      {/* Scrollable Product Cards Container */}
      <div className="flex-1 pl-2 pb-6 overflow-y-auto h-[calc(100vh-160px)]">
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-32 object-cover"
                />
                <div className="p-4">
                  <div className="text-sm text-gray-500">
                    {product.category}
                  </div>
                  <h3 className="text-lg font-semibold mt-1">{product.name}</h3>
                  <div className="text-lg font-medium text-gray-500">
                    ₹{product.price}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="h-full w-full flex flex-col justify-start items-center pt-[20%]">
            <p className="text-2xl text-gray-700">
              <b>Oops!</b> There are no products available for the selected
              filters.
            </p>
            <p className="text-xl text-gray-700">
              Please{" "}
              <span
                className="cursor-pointer text-blue-500 hover:underline"
                onClick={clearFilters}
              >
                clear all filters
              </span>{" "}
              or adjust them.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductListing;
