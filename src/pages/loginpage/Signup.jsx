/* eslint-disable react/no-unescaped-entities */
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import myContext from "../../context/MyContext";
import { Timestamp, addDoc, collection } from "firebase/firestore";
import { auth, fireDB } from "../../firebase/FirebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import toast from "react-hot-toast";
import Loader from "../../components/loader/Loader";
import Layout from "../../components/layout/Layout";

const Signup = () => {
  const context = useContext(myContext);
  const { loading, setLoading } = context;

  // navigate
  const navigate = useNavigate();

  // User Signup State
  const [userSignup, setUserSignup] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });

  /**========================================================================
   *                          User Signup Function
   *========================================================================**/

  const userSignupFunction = async () => {
    // validation
    if (
      userSignup.name === "" ||
      userSignup.email === "" ||
      userSignup.password === ""
    ) {
      toast.error("All Fields are required");
    }

    setLoading(true);
    try {
      const users = await createUserWithEmailAndPassword(
        auth,
        userSignup.email,
        userSignup.password
      );

      // create user object
      const user = {
        name: userSignup.name,
        email: users.user.email,
        uid: users.user.uid,
        role: userSignup.role,
        time: Timestamp.now(),
        date: new Date().toLocaleString("en-US", {
          month: "short",
          day: "2-digit",
          year: "numeric",
        }),
      };

      // create user Refrence
      const userRefrence = collection(fireDB, "user");

      // Add User Detail
      addDoc(userRefrence, user);

      setUserSignup({
        name: "",
        email: "",
        password: "",
      });

      toast.success("Signup Successfully");

      setLoading(false);
      navigate("/login");
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  return (
    <Layout>
      <div className="flex justify-center items-center h-screen bg-blue-700">
        {loading && <Loader />}
        {/* Login Form  */}
        <div className="login_Form bg-blue-900 px-8 py-6 border border-black rounded-xl shadow-md">
          {/* Top Heading  */}
          <div className="mb-5">
            <h2 className="text-center text-2xl font-bold text-white ">
              Signup
            </h2>
          </div>

          {/* Input One  */}
          <div className="mb-3">
            <input
              type="text"
              placeholder="Full Name"
              value={userSignup.name}
              onChange={(e) => {
                setUserSignup({
                  ...userSignup,
                  name: e.target.value,
                });
              }}
              className="bg-white border border-black px-2 py-2 w-96 rounded-md outline-none placeholder-black"
            />
          </div>

          {/* Input Two  */}
          <div className="mb-3">
            <input
              type="email"
              placeholder="Email Address"
              value={userSignup.email}
              onChange={(e) => {
                setUserSignup({
                  ...userSignup,
                  email: e.target.value,
                });
              }}
              className="bg-white border border-black px-2 py-2 w-96 rounded-md outline-none placeholder-black"
            />
          </div>

          {/* Input Three  */}
          <div className="mb-5">
            <p className="mb-2 text-white">Password should be 6 letter</p>
            <input
              type="password"
              placeholder="Password"
              value={userSignup.password}
              onChange={(e) => {
                setUserSignup({
                  ...userSignup,
                  password: e.target.value,
                });
              }}
              className="bg-white border border-black px-2 py-2 w-96 rounded-md outline-none placeholder-black"
            />
          </div>

          {/* Signup Button  */}
          <div className="mb-5">
            <button
              type="button"
              onClick={userSignupFunction}
              className="bg-black hover:bg-pink-600 w-full text-white text-center py-2 font-bold rounded-md "
            >
              Signup
            </button>
          </div>

          <div>
            <h2 className="text-white">
              Have an account ??{" "}
              <Link className=" text-pink-200 font-bold" to={"/login"}>
                Login
              </Link>
            </h2>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Signup;
