import React, { createContext, useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

interface FilterContextType {
  selectedCategory: string | null;
  setSelectedCategory: (category: string) => void;
  selectedBrand: string | null;
  setSelectedBrand: (brand: string) => void;
  availability: string | null;
  setAvailability: (availability: string) => void;
  price: number | null;
  setPrice: (price: number) => void;
  sortBy: string | null;
  setSortBy: (sort: string) => void;
  clearFilters: () => void;
}

const FilterContext = createContext<FilterContextType | undefined>(undefined);

export const FilterProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    () => {
      return localStorage.getItem("selectedCategory") || null;
    }
  );
  const [selectedBrand, setSelectedBrand] = useState<string | null>(() => {
    return localStorage.getItem("selectedBrand") || null;
  });
  const [availability, setAvailability] = useState<string | null>(() => {
    return localStorage.getItem("availability") || null;
  });
  const [price, setPrice] = useState<number | null>(() => {
    return Number(localStorage.getItem("price")) || null;
  });
  const [sortBy, setSortBy] = useState<string | null>(() => {
    return localStorage.getItem("sortBy") || null;
  });

  // Effect to read filters from the URL
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const category = queryParams.get("category");
    const brand = queryParams.get("brand");
    const avail = queryParams.get("availability");
    const price = queryParams.get("price");
    const sort = queryParams.get("sort");

    if (category) {
      setSelectedCategory(category);
      localStorage.setItem("selectedCategory", category);
    }
    if (brand) {
      setSelectedBrand(brand);
      localStorage.setItem("selectedBrand", brand);
    }
    if (avail) {
      setAvailability(avail);
      localStorage.setItem("availability", avail);
    }
    if (price) {
      setPrice(Number(price));
      localStorage.setItem("price", JSON.stringify(price));
    }
    if (sort) {
      setSortBy(sort);
      localStorage.setItem("sortBy", sort);
    }
  }, [location.search]);

  // Effect to update the URL with the selected filters
  useEffect(() => {
    const queryParams = new URLSearchParams();
    if (selectedCategory) {
      queryParams.set("category", selectedCategory);
      localStorage.setItem("selectedCategory", selectedCategory || "");
    }
    if (selectedBrand) {
      localStorage.setItem("selectedBrand", selectedBrand || "");
      queryParams.set("brand", selectedBrand);
    }
    if (availability) {
      localStorage.setItem("availability", availability || "");
      queryParams.set("availability", availability);
    }
    if (price) {
      localStorage.setItem("price", JSON.stringify(price));
      queryParams.set("price", price.toString());
    }
    if (sortBy) {
      localStorage.setItem("sortBy", sortBy || "");
      queryParams.set("sort", sortBy);
    }

    navigate({
      pathname: location.pathname,
      search: queryParams.toString(),
    });
  }, [
    selectedCategory,
    selectedBrand,
    availability,
    price,
    sortBy,
    navigate,
    location.pathname,
  ]);

  // Function to clear all filters
  const clearFilters = () => {
    setSelectedCategory(null);
    setSelectedBrand(null);
    setAvailability(null);
    setPrice(null);
    setSortBy(null);
    // Clear local storage
    localStorage.removeItem("selectedCategory");
    localStorage.removeItem("selectedBrand");
    localStorage.removeItem("availability");
    localStorage.removeItem("priceRange");
    localStorage.removeItem("sortBy");
    // Reset the URL
    navigate(location.pathname);
  };

  return (
    <FilterContext.Provider
      value={{
        selectedCategory,
        setSelectedCategory,
        selectedBrand,
        setSelectedBrand,
        availability,
        setAvailability,
        price,
        setPrice,
        sortBy,
        setSortBy,
        clearFilters,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};

export const useFilter = (): FilterContextType => {
  const context = useContext(FilterContext);
  if (context === undefined) {
    throw new Error("useFilter must be used within a FilterProvider");
  }
  return context;
};
