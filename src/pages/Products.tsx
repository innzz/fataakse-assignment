import Navbar from "../components/Navbar";
import FilterPanel from "../components/FilterPanel";
import ProductListing from "../components/ProductListing";

const Products = () => {
  return (
    <section className="h-full flex flex-col">
      <Navbar />
      <div className="w-full flex-1 h-[80%] max-w-[1200px] mx-auto flex">
        <FilterPanel />
        <ProductListing />
      </div>
    </section>
  );
};

export default Products;
