import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/homePage/HomePage";
import NoPage from "./pages/noPage/NoPage";
import Productinfo from "./pages/productinfo/Productinfo";
import ScrollTop from "./components/scrolltop/ScrolTop";
import CartPage from "./pages/cart/CartPage";
import AllProduct from "./pages/allproduct/AllProduct";
import Login from "./pages/loginpage/Login";
import Signup from "./pages/loginpage/Signup";
import Dashboard from "./pages/dashboard/Dashboard";
import AdminDash from "./pages/dashadmin/AdminDash";
import Adproduct from "./components/admin/Adproduct";
import Updateproduct from "./components/admin/Updateproduct";
import MyState from "./context/Mystate";
import { Toaster } from "react-hot-toast";
import { ProtectedRouteForUser } from "./components/protectedRoute/ProtectedRouteForUser";
import { ProtectedRouteForAdmin } from "./components/protectedRoute/ProtectedRouteForAdmin";
import CategoryPage from "./components/category/CategoryPage";
const App = () => {
  return (
    <MyState>
      <Router>
        <ScrollTop />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/*" element={<NoPage />} />
          <Route path="/productinfo/:id" element={<Productinfo />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/AllProduct" element={<AllProduct />} />
          <Route path="/category/:categoryname" element={<CategoryPage />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRouteForUser>
                <Dashboard />
              </ProtectedRouteForUser>
            }
          />

          <Route
            path="/dashadmin"
            element={
              <ProtectedRouteForAdmin>
                <AdminDash />
              </ProtectedRouteForAdmin>
            }
          />
          <Route
            path="/addproduct"
            element={
              <ProtectedRouteForAdmin>
                <Adproduct />
              </ProtectedRouteForAdmin>
            }
          />
          <Route
            path="/updateProduct/:id"
            element={
              <ProtectedRouteForAdmin>
                <Updateproduct />
              </ProtectedRouteForAdmin>
            }
          />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Routes>
        <Toaster />
      </Router>
    </MyState>
  );
};

export default App;
