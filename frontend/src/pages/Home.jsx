import Navbar from "../components/Navbar";
import Hero from "../components/Hero";

import CoffeeProducts from "../components/CoffeeProducts";
import EquipmentProducts from "../components/EquipmentProducts";
import AccessoriesProducts from "../components/AccessoriesProducts";
import FeaturedBanners from "../components/FeaturedBanners";

const Home = () => {
  return (
    <>
      <Navbar />
      <Hero />

      <CoffeeProducts />
      <FeaturedBanners/>
      <EquipmentProducts />
      <AccessoriesProducts />
    </>
  );
};

export default Home;
