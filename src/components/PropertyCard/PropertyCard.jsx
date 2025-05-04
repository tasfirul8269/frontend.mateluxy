import "animate.css";
import { FaPhone, FaWhatsapp, FaCalendarAlt } from "react-icons/fa";
import { IoIosExpand } from "react-icons/io";
import { IoBedSharp } from "react-icons/io5";
import { LiaBathSolid, LiaBedSolid } from "react-icons/lia";
import { MdLocationOn } from "react-icons/md";
import { Link } from "react-router-dom";

const PropertyCard = ({ property, loading, error }) => {
  if (loading)
    return (
      <div className="text-center py-20 animate__animated animate__fadeIn">
        Loading...
      </div>
    );
  if (error)
    return (
      <div className="text-center py-20 text-red-500 animate__animated animate__fadeIn">
        Error: {error}
      </div>
    );
  if (!property) return null;

  return (
    <div
      to="/property-details"
      className="container mx-auto p-0 bg-white rounded-xl animate__animated animate__fadeIn grid md:grid-cols-2 gap-4 border border-spacing-0.5 border-gray-200 my-6 min-h-[50vh]  overflow-hidden"
    >
      {/* Image container with video fixes */}
      <Link
        to="/property-details"
        className="flex gap-1 animate__animated animate__fadeInUp rounded-md w-3/3 h-full min-h-0"
      >
        {/* Main Media */}
        {property.mainImage.match(/\.(mp4|mov|avi)$/i) ? (
          <video
            src={property.mainImage}
            className="w-2/3 h-full object-cover grow rounded-md" // Changed from grow-2 to grow
            controls
            muted
            loop
          />
        ) : (
          <img
            src={property.mainImage}
            alt={property.title}
            className="w-2/4 h-full object-cover grow-2 rounded-md"
          />
        )}

        <div className="flex w-1/4 flex-col gap-1">
          {property.galleryImages.slice(0, 3).map((media, index) =>
            media.match(/\.(mp4|mov|avi)$/i) ? (
              <video
                key={index}
                src={media}
                className="w-full h-full object-cover rounded-md" // Added h-full
                controls
                muted
                loop
              />
            ) : (
              <img
                key={index}
                src={media}
                alt=""
                className="w-full h-full object-cover rounded-md"
              />
            )
          )}
        </div>
      </Link>

      {/* Property details container with spacing adjustments */}
      <div className="flex flex-col items-start justify-start animate__animated animate__fadeInUp h-full overflow-y-auto pr-2 ">
        {/* Price and Location */}
        <Link to="/property-details" className="w-full pl-[15px] md:pl-0">
          <div className="space-y-2">
            <div className="text-2xl font-medium text-[#256FFF] pt-4">
              {property.price}
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <MdLocationOn className="mr-1" />
              <span className="text-[#999999]">{property.location}</span>
            </div>

            {/* Property Features */}
            <div className="flex flex-wrap justify-start items-center">
              {property.features.map((feature, index) => (
                <h2 className="text-xl font-[400] text-gray-700" key={index}>
                  {feature} |{" "}
                </h2>
              ))}
            </div>

            {/* <p className="text-red-950 text-sm font-medium">{property.type}</p> */}

            <button className="btn btn-outline outline-[#FFBF6A] bg-[#FFF5E7] btn-warning text-[#FF9B17]">
              {property.type}
            </button>

            {/* Property Type */}
            <div className="flex items-center gap-5 py-2  pl-[15px] md:pl-0">
              <p className="flex text-[#999999] items-center gap-1.5 font-medium">
                <LiaBedSolid className="text-2xl text-[#999999]" />{" "}
                {property.bedrooms}
              </p>
              <p className="flex text-[#999999]  items-center gap-1.5 font-medium">
                <LiaBathSolid className="text-2xl " /> {property.bathrooms}
              </p>
              <p className="flex text-[#999999] items-center gap-1.5 font-medium">
                <IoIosExpand className="text-2xl" /> BUA: {property.area} sq.ft
              </p>
            </div>
          </div>

          {/* Agent Information */}
          <div className="flex items-center gap-5 mt-12 pb-0">
            <img
              src={property.agent.photo}
              className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full"
              alt={property.agent.name}
            />
            <div>
              <h3 className="text-sm font-bold">{property.agent.name}</h3>
              <p className="text-sm text-gray-400">
                Speaks:{" "}
                {property.agent.languages.map((language, index) => (
                  <span className="mr-3" key={index}>
                    {" "}
                    {language},
                  </span>
                ))}
              </p>
            </div>
          </div>
        </Link>

        {/* Action Buttons */}

        <div
          onClick={() => {
            window.location.href = "tel:+1234567890";
          }}
          className="flex w-full items-center justify-between md:justify-start gap-8 border-t border-gray-200 mt-6 py-3 px-4"
        >
          <button className="cursor-pointer flex justify-center items-center gap-2 text-[#999999] bg-[#E6E6E6] px-4 py-3 rounded-[10px]">
            <FaPhone />
            <span className="font-semibold">Call</span>
          </button>

          <button
            onClick={() => {
              window.location.href = "https://wa.me/1234567890";
            }}
            className="flex cursor-pointer justify-center items-center gap-2 text-[#00BD6E] bg-[#E5FFF1] px-4 py-3 rounded-[10px]"
          >
            <FaWhatsapp />
            <span className="font-semibold ">Whatsapp</span>
          </button>

          <button className="hidden md:flex cursor-pointer justify-center items-center gap-2 text-[#256FFF] bg-[#EBF8FF] px-4 py-3 rounded-[10px]">
            <span className="font-semibold">Book a viewing</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
