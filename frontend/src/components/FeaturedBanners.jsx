import { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import { PlayCircleIcon } from "@heroicons/react/24/outline";

const FeaturedBanners = () => {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const res = await API.get("/banners");
        const features = res.data.filter(b => b.sectionType === "feature");
        setBanners(features);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchBanners();
  }, []);

  if (loading) return <SkeletonLoader />;
  if (banners.length === 0) return null;

  // 🔥 Video first
  const videoBanner =
    banners.find(b => b.mediaType === "video") || banners[0];

  const imageBanners = banners
    .filter(b => b._id !== videoBanner._id)
    .slice(0, 3);

  return (
    <section className="w-full bg-[#FAFAF8] py-12 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">

        <h2 className="text-3xl font-serif font-bold text-[#142d16] mb-8">
          New Arrivals
        </h2>

        {/* 🔥 MAIN SPLIT GRID */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">

          {/* 🎥 LEFT – VIDEO (NO EXTRA SPACE) */}
          <div className="md:col-span-7 relative h-[300px] md:h-[520px] rounded-[22px] overflow-hidden group">
            <video
              src={videoBanner.resource}
              autoPlay
              muted
              loop
              playsInline
              className="w-full  h-full object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />

            <div className="absolute bottom-6 left-6 right-6">
              {/* <span className="inline-block mb-2 px-3 py-1 text-[10px] uppercase tracking-widest font-bold text-white bg-white/10 rounded-full backdrop-blur">
                {videoBanner.bannerCategory}
              </span> */}

              {/* <h3 className="text-3xl md:text-5xl font-serif text-white mb-4">
                {videoBanner.title}
              </h3> */}

              {/* <button
                onClick={() =>
                  navigate(`/shop?category=${videoBanner.bannerCategory}`)
                }
                className="bg-white text-[#142d16] px-5 py-2 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-[#E8DCC4]"
              >
                Shop Collection
              </button> */}
            </div>

            <div className="absolute top-5 right-5 bg-white/10 p-2 rounded-full backdrop-blur">
              <PlayCircleIcon className="w-6 h-6 text-white" />
            </div>
          </div>

          {/* 🖼 RIGHT – PHOTOS (SAME GRID, NO WHITE GAP) */}
          <div className="md:col-span-5 grid grid-rows-3 gap-4 h-[420px] md:h-[520px]">
            {imageBanners.map((banner) => (
              <div
                key={banner._id}
                onClick={() =>
                  navigate(`/shop?category=${banner.bannerCategory}`)
                }
                className="relative rounded-[18px] overflow-hidden group cursor-pointer"
              >
                <img
                  src={banner.resource}
                  alt={banner.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                <div className="absolute bottom-4 left-4 right-4">
                  <h4 className="text-lg font-serif text-white leading-tight">
                    {banner.title}
                  </h4>
                  <span className="text-[9px] text-white/70 uppercase tracking-widest font-bold">
                    {banner.bannerCategory}
                  </span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

const SkeletonLoader = () => (
  <div className="max-w-7xl mx-auto px-6 py-12 animate-pulse">
    <div className="h-8 w-48 bg-gray-200 rounded mb-8" />
    <div className="grid grid-cols-12 gap-4">
      <div className="col-span-7 h-[520px] bg-gray-200 rounded-[22px]" />
      <div className="col-span-5 grid grid-rows-3 gap-4 h-[520px]">
        <div className="bg-gray-200 rounded-[18px]" />
        <div className="bg-gray-200 rounded-[18px]" />
        <div className="bg-gray-200 rounded-[18px]" />
      </div>
    </div>
  </div>
);

export default FeaturedBanners;
