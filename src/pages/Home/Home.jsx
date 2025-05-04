import React from "react";
import Banner from "../../components/Banner/Banner";
import SearchField from "../../components/PropertySearch/PropertySearch";
import Services from "../../components/Services/Services";
import TopProperties from "../../components/TopProperties/TopProperties";
import FindConsultant from "../../components/FindConsultant/FindConsultant";
import LocationCategory from "../../LocationBasedProperty/locationCategory";
import NewsAndInsights from "../../components/NewsAndInsights/NewsAndInsights";

const Home = () => {
  return (
    <div className="mb-10 pt-10">
      <div className="md:relative">
        <Banner></Banner>
        <div className=" md:absolute md:-bottom-14 md:left-1/2 md:transform md:-translate-x-1/2  w-full max-w-4xl px-4 bg-white rounded-[20px] shadow-lg mx-auto z-40 p-4">
          <SearchField></SearchField>
        </div>
      </div>
      <div className=" md:px-[60px] px-5  mx-auto">
      <Services></Services>
      <FindConsultant></FindConsultant>
      <TopProperties></TopProperties>
      <LocationCategory></LocationCategory>
      <NewsAndInsights></NewsAndInsights>
      </div>
    </div>
  );
};

export default Home;
