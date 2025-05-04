import React from "react";
import "../../components/Navbar/colors.css";
import bannerImg from "../../assets/HeroImage.png";

const Banner = () => {
  return (
    <div
      className={`hero min-h-[650px] mx-auto md:min-h-[650px] mb-11 w-[90vw] overflow-hidden relative bg-cover bg-center rounded-[30px] -z-40`}
      style={{ backgroundImage: `url(${bannerImg})` }}
    >
      {/* Gray overlay */}
      {/* <div className="absolute inset-0 bg-gray-500 opacity-3 0"></div> */}

      {/* Content container */}
      <div className="hero-content text-neutral-content flex items-center justify-start px-4 sm:px-8 lg:px-16 py-12 md:py-0">
        <div className="w-full lg:w-1/2">
          {/* Title - responsive font sizes with same desktop size */}
          <h1 className="mb-3 md:mb-5 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-[600] text-[#256fff]">
          Easy way to find a 
          perfect property
          </h1>
          
          {/* Paragraph - responsive spacing and font size */}
          <p className="mb-4 md:mb-5 text-xs sm:text-sm md:text-base text-[#737373]">
          We provide a complete service for the sale,
          purchase or rental of real estate
          </p>
          
          {/* Button - responsive sizing */}
          <button className="px-4 py-2 sm:px-5 sm:py-2 md:px-7 md:py-3 text-xs sm:text-sm border-1 border-blue-400 font-[400] rounded-[15px] text-[#256fff] hover:text-blue-500 mr-2  hover:bg-white cursor-pointer transition-colors duration-200">
            Learn More
          </button>
          <button className="px-4 py-2 sm:px-5 sm:py-2 md:px-7 md:py-3 text-xs sm:text-sm border-none font-[400] rounded-[15px] text-gray-200 hover:text-white bg-[#256FFF] hover:bg-blue-700 cursor-pointer transition-colors duration-200">
            Read the article
          </button>
        </div>
      </div>
    </div>
  );
};

export default Banner;