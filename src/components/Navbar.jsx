
import { NavbarData } from "../data/Navbar";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="w-full h-[60px] flex justify-center items-center p-4 bg-gray-900 shadow-lg gap-x-8">
      {NavbarData.map((link, idx) => (
        <NavLink
          key={idx}
          to={link.path}
          className={({ isActive }) =>
            isActive
              ? "text-blue-400 font-bold text-lg border-b-2 border-blue-400 pb-1 transition-all duration-200 ease-in-out"
              : "text-gray-300 font-medium text-lg hover:text-blue-300 transition-all duration-200 ease-in-out"
          }
        >
          {link.title}
        </NavLink>
      ))}
    </div>
  );
};

export default Navbar;
