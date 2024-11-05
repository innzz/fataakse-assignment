import { IoSearchOutline } from "react-icons/io5";
import { LuUser2 } from "react-icons/lu";
import { MdOutlineShoppingCart } from "react-icons/md";

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md py-4 px-6 flex items-center justify-between relative">
      <div className="w-full max-w-[1200px] mx-auto flex items-center justify-between">
        {/* Left Side - Logo */}
        <div className="text-xl font-semibold text-gray-800">Flatlogic</div>

        {/* Center - Menu Links */}
        <ul className="flex space-x-8 text-gray-700">
          <li className="hover:text-blue-500 cursor-pointer">Home</li>
          <li className="hover:text-blue-500 cursor-pointer">Pages</li>
          <li className="hover:text-blue-500 cursor-pointer">Shop</li>
          <li className="hover:text-blue-500 cursor-pointer">Blogs</li>
        </ul>

        {/* Right Side - Icons */}
        <div className="flex space-x-4 text-gray-700">
          <span className="cursor-pointer hover:text-blue-500"><IoSearchOutline size={24} /></span>
          {/* Search Icon */}
          <span className="cursor-pointer hover:text-blue-500"><LuUser2 size={24} /></span>
          {/* Profile Icon */}
          <span className="cursor-pointer hover:text-blue-500"><MdOutlineShoppingCart size={24} /></span>
          {/* Cart Icon */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
