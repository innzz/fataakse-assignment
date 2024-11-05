import { Route, Routes } from "react-router-dom";
import { FilterProvider } from "./context/FilterProvider";
import Products from "./pages/Products";

const App = () => {
  return (
    <FilterProvider>
      <Routes>
        <Route path="/" element={<Products />} />
      </Routes>
    </FilterProvider>
  );
};

export default App;
