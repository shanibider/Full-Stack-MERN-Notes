import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="bg-gray-800 py-4">
      <nav className="container mx-auto flex justify-between items-center">
        <NavLink to="/">
          <img className="h-10 inline" src="../../notes_logo.jpg" alt="Notes Logo" />
        </NavLink>

        <NavLink
          className="inline-block px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
          to="/create"
        >
          Create Note
        </NavLink>
      </nav>
    </div>
  );
};

export default Navbar;
