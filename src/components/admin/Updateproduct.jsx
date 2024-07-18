import { useNavigate, useParams } from "react-router";
import myContext from "../../context/MyContext";
import { useContext, useEffect, useState } from "react";
import { Timestamp, doc, getDoc, setDoc } from "firebase/firestore";
import { fireDB } from "../../firebase/FirebaseConfig";
import toast from "react-hot-toast";
import Loader from "../../components/loader/Loader";
import Layout from "../layout/Layout";

const categoryList = [
  {
    name: "fashion",
  },
  {
    name: "shirt",
  },
  {
    name: "jacket",
  },
  {
    name: "mobile",
  },
  {
    name: "laptop",
  },
  {
    name: "shoes",
  },
  {
    name: "home",
  },
  {
    name: "books",
  },
];

const UpdateProductPage = () => {
  const context = useContext(myContext);
  const { loading, setLoading, getAllProductFunction } = context;

  // navigate
  const navigate = useNavigate();
  const { id } = useParams();
  console.log(id);

  // product state
  const [product, setProduct] = useState({
    title: "",
    price: "",
    productImageUrl: "",
    category: "",
    description: "",
    time: Timestamp.now(),
    date: new Date().toLocaleString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    }),
  });

  // Get Single Product Function
  const getSingleProductFunction = async () => {
    setLoading(true);
    try {
      const productTemp = await getDoc(doc(fireDB, "products", id));
      //   console.log(product.data())
      const product = productTemp.data();
      setProduct({
        title: product?.title,
        price: product?.price,
        productImageUrl: product?.productImageUrl,
        category: product?.category,
        description: product?.description,
        quantity: product?.quantity,
        time: product?.time,
        date: product?.date,
      });
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const updateProduct = async () => {
    setLoading(true);
    try {
      await setDoc(doc(fireDB, "products", id), product);
      toast.success("Product Updated successfully");
      getAllProductFunction();
      setLoading(false);
      navigate("/dashadmin");
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getSingleProductFunction();
  }, []);
  return (
    <Layout>
      <div>
        <div className="flex justify-center items-center h-screen bg-[#71717a]">
          {loading && <Loader />}
          {/* Login Form  */}
          <div className="login_Form bg-[#94a3b8] px-8 py-6 border border-pink-100 rounded-xl shadow-md">
            {/* Top Heading  */}
            <div className="mb-5">
              <h2 className="text-center text-2xl font-bold text-black ">
                Update Product
              </h2>
            </div>

            {/* Input One  */}
            <div className="mb-3">
              <input
                type="text"
                name="title"
                value={product.title}
                onChange={(e) => {
                  setProduct({
                    ...product,
                    title: e.target.value,
                  });
                }}
                placeholder="Product Title"
                className="bg-white border text-pink-300 border-black px-2 py-2 w-96 rounded-md outline-none placeholder-pink-300"
              />
            </div>

            {/* Input Two  */}
            <div className="mb-3">
              <input
                type="number"
                name="price"
                value={product.price}
                onChange={(e) => {
                  setProduct({
                    ...product,
                    price: e.target.value,
                  });
                }}
                placeholder="Product Price"
                className="bg-white border text-pink-300 border-black px-2 py-2 w-96 rounded-md outline-none placeholder-pink-300"
              />
            </div>

            {/* Input Three  */}
            <div className="mb-3">
              <input
                type="text"
                name="productImageUrl"
                value={product.productImageUrl}
                onChange={(e) => {
                  setProduct({
                    ...product,
                    productImageUrl: e.target.value,
                  });
                }}
                placeholder="Product Image Url"
                className="bg-white border text-pink-300 border-black px-2 py-2 w-96 rounded-md outline-none placeholder-pink-300"
              />
            </div>

            {/* Input Four  */}
            <div className="mb-3">
              <select
                value={product.category}
                onChange={(e) => {
                  setProduct({
                    ...product,
                    category: e.target.value,
                  });
                }}
                className="w-full px-1 py-2 text-pink-300 bg-white border border-black rounded-md outline-none  "
              >
                <option disabled>Select Product Category</option>
                {categoryList.map((value, index) => {
                  const { name } = value;
                  return (
                    <option
                      className=" first-letter:uppercase"
                      key={index}
                      value={name}
                    >
                      {name}
                    </option>
                  );
                })}
              </select>
            </div>

            {/* Input Five  */}
            <div className="mb-3">
              <textarea
                value={product.description}
                onChange={(e) => {
                  setProduct({
                    ...product,
                    description: e.target.value,
                  });
                }}
                name="description"
                placeholder="Product Description"
                rows="5"
                className=" w-full px-2 py-1 text-pink-300 bg-white border border-black rounded-md outline-none placeholder-pink-300 "
              ></textarea>
            </div>

            {/* Update Product Button  */}
            <div className="mb-3">
              <button
                onClick={updateProduct}
                type="button"
                className="bg-black hover:bg-gray-800 w-full text-white text-center py-2 font-bold rounded-md "
              >
                Update Product
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UpdateProductPage;
