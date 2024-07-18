import { Link, useNavigate } from "react-router-dom";
import SearchBar from "../searchBar/SearchBar";
import HomeIcon from "@mui/icons-material/Home";
import ProductionQuantityLimitsIcon from "@mui/icons-material/ProductionQuantityLimits";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import LoginIcon from "@mui/icons-material/Login";
import InputIcon from "@mui/icons-material/Input";
import LogoutIcon from "@mui/icons-material/Logout";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PersonIcon from "@mui/icons-material/Person";
import "./Navbar.css";
import { useSelector } from "react-redux";

const Navbar = () => {
  //get item from local storage
  const user = JSON.parse(localStorage.getItem("users"));

  //to use navigate first we have to declare it by this
  const navigate = useNavigate();

  //logout function
  const logout = () => {
    localStorage.clear("users");
    navigate("/login");
  };

  // get cartItems from store.jsx

  const cartItems = useSelector((state) => state.cart);

  // navList Data
  const navList = (
    <ul className="flex space-x-4 text-white font-medium text-md px-5 ">
      {/* Home */}
      <li className="flex transition ease-in-out delay-10 hover:-translate-y-1 hover:scale-110 duration-300">
        <Link to="/" className="flex items-center">
          <HomeIcon className="mr-1" />
          <div>Home</div>
        </Link>
      </li>

      {/* All Product */}
      <li className="flex transition ease-in-out delay-10 hover:-translate-y-1 hover:scale-110 duration-300">
        <Link to={"/allproduct"} className="flex items-center">
          <ProductionQuantityLimitsIcon className="mr-1" />
          <div>All Product</div>
        </Link>
      </li>
      {/* Signup */}
      {!user ? (
        <li className="flex transition ease-in-out delay-10 hover:-translate-y-1 hover:scale-110 duration-300">
          <Link to={"/signup"} className="flex items-center">
            <InputIcon className="mr-1" />
            <div>Sign Up</div>
          </Link>
        </li>
      ) : (
        " "
      )}

      {/* login */}
      {!user ? (
        <li className="flex transition ease-in-out delay-10 hover:-translate-y-1 hover:scale-110 duration-300">
          <Link to={"/login"} className="flex items-center">
            <LoginIcon className="mr-1" />
            <div>Login</div>
          </Link>
        </li>
      ) : (
        " "
      )}

      {/* User */}
      {user?.role === "user" && (
        <li className="flex transition ease-in-out delay-10 hover:-translate-y-1 hover:scale-110 duration-300">
          <Link to={"/dashboard"} className="flex items-center">
            <PersonIcon className="mr-1" />
            <div>{user.name}</div>
          </Link>
        </li>
      )}

      {/* Admin */}
      {user?.role === "admin" && (
        <li className="flex transition ease-in-out delay-10 hover:-translate-y-1 hover:scale-110 duration-300">
          <Link to={"/dashadmin"} className="flex items-center">
            <AdminPanelSettingsIcon className="mr-1" />
            <div>Admin</div>
          </Link>
        </li>
      )}

      {/* logout */}
      {user && (
        <li
          className="cursor-pointer flex items-center transition ease-in-out delay-10 hover:-translate-y-1 hover:scale-110 duration-300"
          onClick={logout}
        >
          {" "}
          <LogoutIcon className="mr-1" />
          <div>Logout</div>
        </li>
      )}

      {/* Cart */}
      <li className="flex">
        <Link
          to={"/cart"}
          className="flex items-center transition ease-in-out delay-10 hover:-translate-y-1 hover:scale-110 duration-300"
        >
          <ShoppingCartIcon className="mr-1" />
          <div className="flex">
            Cart
            <div className="flex items-center mx-1 text-yellow-500 ">
              ({cartItems.length})
            </div>
          </div>
        </Link>
      </li>
    </ul>
  );
  return (
    <nav className="bg-blue-900 sticky top-0">
      {/* main  */}
      <div className="lg:flex lg:justify-between items-center py-3 lg:px-3 ">
        {/* left  */}
        <div className="left py-3 lg:py-0">
          <Link to={"/"}>
            <h2 className=" font-bold text-white text-2xl text-center mx-4 transition ease-in-out delay-10 hover:scale-110 duration-300 ">
              We Take Style
            </h2>
          </Link>
        </div>

        {/* right  */}
        <div className="right flex justify-center mb-4 lg:mb-0  ">
          {navList}
        </div>

        {/* Search Bar  */}
        <div className="transition ease-in-out delay-10 hover:scale-105 duration-300">
          <SearchBar />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
