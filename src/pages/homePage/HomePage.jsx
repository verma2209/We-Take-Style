import { useContext } from "react";
import Category from "../../components/category/Category";
import HeroSection from "../../components/heroSection/HeroSection";
import HomePageProductCard from "../../components/homePageProductCard/HomePageProductCard";
import Layout from "../../components/layout/Layout";
import Testimoinal from "../../components/testimonial/Testimoinal";
import Track from "../../components/track/Track";
import myContext from "../../context/MyContext";
import Loader from "../../components/loader/Loader";

const HomePage = () => {
  // const context = useContext(myContext);
  // const name = context;
  return (
    <Layout>
      <HeroSection />
      <Category />
      <HomePageProductCard />
      <Track />
      <Testimoinal />
      {/* <Loader /> */}
      {/* <h1>{name}</h1> */}
    </Layout>
  );
};

export default HomePage;
