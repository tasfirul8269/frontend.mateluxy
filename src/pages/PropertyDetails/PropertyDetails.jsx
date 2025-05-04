import axios from "axios";
import React, { useEffect, useState } from "react";
import { AiOutlineFullscreen } from "react-icons/ai";
import { CiLocationOn, CiShare2 } from "react-icons/ci";
import {
  FaEnvelope,
  FaFacebook,
  FaLink,
  FaRegCalendarAlt,
  FaRegQuestionCircle,
  FaTwitter,
  FaWhatsapp,
} from "react-icons/fa";
import { GoDotFill } from "react-icons/go";
import { IoMdPhotos } from "react-icons/io";
import { IoBedOutline, IoBookOutline, IoCallOutline } from "react-icons/io5";
import { LiaBathSolid } from "react-icons/lia";
import { LuMapPin } from "react-icons/lu";
import { MdDone } from "react-icons/md";
import SimpleMap from "../../components/SimpleMap/SimpleMap";
import { RiInformationLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const PropertyDetails = () => {
  const [propertyDetails, setPropertyDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("property1.json")
      .then((res) => {
        setPropertyDetails(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        Error: {error}
      </div>
    );
  }

  if (!propertyDetails) {
    return (
      <div className="flex justify-center items-center h-screen">
        No property found
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center">
      {/* Image container */}
      <div className="w-full max-w-6xl mx-auto h-[300px] md:h-[500px] pt-32 md:pt-32 relative px-4 md:px-0">
        <div className="grid grid-cols-1 md:grid-cols-2 h-full gap-1">
          {/* Main Image Column */}
          <div className="h-full relative rounded-lg overflow-hidden">
            <img
              src={propertyDetails.mainImage}
              alt="Main Property"
              className="w-full h-full object-cover"
              style={{ aspectRatio: "3/2" }}
            />
            <div className="absolute inset-0 bg-black/0" />
          </div>

          {/* Gallery Grid Column - Hidden on mobile */}
          <div className="h-full w-full hidden md:grid grid-cols-2 gap-1">
            {propertyDetails.galleryImages.slice(0, 4).map((image, index) => (
              <div
                key={index}
                className="relative h-[100%] w-[100%] aspect-square"
              >
                <img
                  src={image}
                  alt={`Gallery Image ${index + 1}`}
                  className="w-full h-full object-cover rounded-lg"
                />
                <div className="absolute inset-0 bg-black/0" />
              </div>
            ))}
          </div>
        </div>

        {/* Media buttons - positioned differently on mobile */}
        <div
          className="md:absolute left-0 z-10 p-4 flex gap-2 flex-wrap justify-center md:justify-start mt-4 md:mt-0"
          style={{ top: "calc(100% + 2rem)" }}
        >
          <button className="btn bg-white/90 text-gray-800 text-sm md:text-base btn-sm px-3 md:px-4 py-2 rounded-xl shadow-md flex items-center gap-2 cursor-pointer">
            <IoMdPhotos className="text-lg" />
            Photos {propertyDetails.galleryImages.length}
          </button>
          <button className="btn bg-white/90 text-gray-800 text-sm md:text-base btn-sm px-3 md:px-4 py-2 rounded-xl shadow-md flex items-center gap-2 cursor-pointer">
            <LuMapPin className="text-lg" />
            Map
          </button>
          <button className="btn bg-white/90 text-gray-800 text-sm md:text-base btn-sm px-3 md:px-4 py-2 rounded-xl shadow-md flex items-center gap-2 cursor-pointer">
            <IoBookOutline className="text-lg" />
            Brochure
          </button>
        </div>
      </div>

      {/* Property details container */}
      <div className="w-full max-w-6xl mx-auto mt-20 md:mt-48 flex flex-col md:flex-row items-start px-4 md:px-0">
        {/* Left content (60%) */}
        <div className="p-4 md:p-10 space-y-4 w-full md:flex-[3]">
          <h3 className="text-xl md:text-2xl font-bold">
            {propertyDetails.price}
          </h3>
          <p className="text-sm font-semibold text-gray-600">
            {propertyDetails.title}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2">
            <p className="text-sm font-medium flex items-center gap-2 py-3">
              <AiOutlineFullscreen /> <span className="font-light">BAU: </span>
              {propertyDetails.area} sq.ft
            </p>
            <p className="text-sm font-medium flex items-center gap-2 py-3">
              <IoBedOutline />
              <span className="font-light">Bedrooms: </span>
              {propertyDetails.bedrooms}
            </p>
            <p className="text-sm font-medium flex items-center gap-2 py-3">
              <LiaBathSolid /> <span className="font-light">Bathrooms: </span>
              {propertyDetails.bathrooms}
            </p>
            <p className="text-sm font-medium flex items-center gap-2 py-3">
              <FaRegQuestionCircle />
              <span className="font-light">Completion Status: </span>
              {propertyDetails.type}
            </p>
          </div>
          <p className="text-sm font-light text-gray-600">
            {propertyDetails.description}
          </p>

          {/* divider */}
          <div className="border border-0.5 border-gray-100 my-6 md:my-10"></div>

          {/* features */}
          <div>
            <h3 className="text-md font-bold">Features</h3>
            <div className="text-sm font-medium grid grid-cols-1 md:grid-cols-2 gap-2">
              {propertyDetails.features.map((feature, index) => (
                <span className="flex items-center gap-2 py-3" key={index}>
                  <GoDotFill /> {feature},
                </span>
              ))}
            </div>
          </div>

          {/* divider */}
          <div className="border border-0.5 border-gray-100 my-6 md:my-10"></div>

          {/* amenities */}
          <div>
            <h3 className="text-md font-bold">Amenities</h3>
            <div className="text-sm grid grid-cols-1 md:grid-cols-2 gap-2 font-medium">
              {propertyDetails.amenities.map((amenities, index) => (
                <span className="flex items-center gap-2 py-3" key={index}>
                  <MdDone /> {amenities},
                </span>
              ))}
            </div>
          </div>

          {/* divider */}
          <div className="border border-0.5 border-gray-100 my-6 md:my-10"></div>

          {/* location */}
          <div>
            <h3 className="text-md font-bold">Location</h3>
            <p className="text-sm flex items-center gap-2 my-3 font-medium">
              <CiLocationOn /> {propertyDetails.location.address}
            </p>
          </div>
          <SimpleMap
            coordinates={propertyDetails.location.coordinates}
          ></SimpleMap>

          {/* divider */}
          <div className="border border-0.5 border-gray-100 my-6 md:my-10"></div>

          {/* Dld permit information */}
          <div className="flex flex-col md:flex-row items-center gap-4 bg-[#d4d4d4] p-5">
            <img
              src={propertyDetails.dldPermitInfo.permitQrCode}
              className="w-16"
              alt="DLD Permit QR Code"
            />
            <div className="space-y-2">
              <h3 className="text-md font-bold flex items-center gap-2">
                DLD Permit Information{" "}
                <button
                  className="tooltip tooltip-right cursor-pointer"
                  data-tip="The Dubai Land Department strongly advises all customers and investors to only engage with real estate advertisements that feature the QR Code"
                >
                  <RiInformationLine className="cursor-pointer" />
                </button>
              </h3>
              <p className="text-sm font-medium">
                {propertyDetails.dldPermitInfo.permitNumber}
              </p>
              <p className="text-sm font-light text-gray-600">
                This property listing has been reviewed and verified by Dubai
                Land Department
              </p>
            </div>
          </div>
        </div>

        {/* Right sticky sidebar (40%) */}
        <div className="w-full md:w-auto p-4 md:p-10 md:flex-[1.3] sticky top-0 self-start h-fit">
          <div className="sticky top-4">
            <div className="border border-0.5 border-gray-200 p-6 md:p-10 shadow-md">
              <div className="flex flex-col md:flex-row items-center gap-4">
                <img
                  className="w-20 h-20 rounded-md"
                  src="https://ggfx-handh3.s3.eu-west-2.amazonaws.com/x/170ct200/Musa_Sanusi_hausandhaus_2023_ES_5bc1e962b3.webp"
                  alt="Agent Image"
                />

                <div className="space-y-2 text-center md:text-left">
                  <h3 className="text-md font-bold">
                    {propertyDetails.agent.name}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {propertyDetails.agent.role}
                  </p>
                  <p className="text-sm font-semibold text-gray-500 flex flex-wrap items-center justify-center md:justify-start gap-2">
                    Speaks:
                    {propertyDetails.agent.languages.map((lang, index) => (
                      <span className="font-medium" key={index}>
                        {lang},
                      </span>
                    ))}
                  </p>
                </div>
              </div>

              {/* agent section buttons */}
              <div className="flex flex-col md:flex-row items-center gap-3 my-6 md:my-10 text-center">
                <a
                  href="tel:+1234567890"
                  className="bg-red-500 font-medium text-sm md:text-md px-6 md:px-8 py-2 md:py-3 text-white flex items-center gap-2 rounded-full hover:bg-red-600 transition-colors cursor-pointer w-full md:w-auto justify-center"
                >
                  <IoCallOutline />
                  Call
                </a>
                <a
                  href="https://wa.me/1234567890"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-red-500 font-medium text-sm md:text-md px-6 md:px-8 py-2 md:py-3 text-white flex items-center gap-2 rounded-full hover:bg-red-600 transition-colors cursor-pointer w-full md:w-auto justify-center"
                >
                  <FaWhatsapp />
                  Whatsapp
                </a>
              </div>

              <button
                onClick={() => {
                  Swal.fire({
                    title: "Book a Viewing",
                    html: `
                  <form class="space-y-4">
                    <div class="flex flex-col md:flex-row gap-4">
                      <input type="text" id="firstName" placeholder="First Name *" class="w-full p-2 text-sm font-medium border rounded" required>
                      <input type="text" id="lastName" placeholder="Last Name *" class="w-full p-2 text-sm font-medium border rounded" required>
                    </div>
                    <input type="email" id="email" placeholder="Email Address *" class="w-full p-2 text-sm font-medium border rounded" required>
                    <div class="flex items-center gap-2">
                      <span class="p-2 text-sm font-medium bg-gray-100 border rounded">+971</span>
                      <input type="tel" id="phone" placeholder="Phone Number *" class="w-full p-2 text-sm font-medium border rounded" required>
                    </div>
                    <div class="flex flex-col md:flex-row gap-4">
                      <div class="w-full">
                        <input type="date" id="date" class="w-full text-sm font-medium p-2 border rounded" required>
                      </div>
                      <div class="w-full">
                        <input type="time" id="time" class="w-full text-sm font-medium p-2 border rounded" required>
                      </div>
                    </div>
                    <textarea id="message" placeholder="Message" class="w-full text-sm font-medium p-2 border rounded" rows="4"></textarea>
                    <button type="submit" class="w-full bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 text-sm font-medium cursor-pointer">
                      Send Enquiry
                    </button>
                    <p class="text-sm  font-medium text-gray-500 text-center">
                      By clicking Submit, you agree to our 
                      <a href="/terms" class="text-red-500 text-sm font-medium"> Terms</a> and
                      <a href="/privacy" class="text-red-500 text-sm font-medium"> Privacy Policy</a>.
                    </p>
                  </form>
                `,
                    confirmButtonText: "Send Enquiry",
                    showCancelButton: true,
                    focusConfirm: false,
                    customClass: {
                      popup: "rounded-lg",
                      confirmButton:
                        "bg-red-500 hover:bg-red-600 text-white font-medium px-6 py-2 rounded-full cursor-pointer",
                      cancelButton:
                        "bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium px-6 py-2 rounded-full cursor-pointer",
                    },
                  });
                }}
                className="bg-red-500 font-medium text-sm md:text-md px-6 md:px-8 py-2 md:py-3 text-white flex items-center gap-2 rounded-full mx-auto w-full justify-center cursor-pointer"
              >
                <FaRegCalendarAlt />
                Book a viewing
              </button>

              <div className="relative group mt-4">
                <button className="font-sm text-sm underline px-4 md:px-8 py-2 md:py-3 flex items-center gap-2 rounded-full mx-auto w-full justify-center hover:bg-gray-50 transition-colors cursor-pointer">
                  <CiShare2 />
                  Share this listing
                </button>

                {/* Dropdown/Popup */}
                <div className="absolute hidden group-hover:block top-full left-1/2 -translate-x-1/2 mt-2 w-48 bg-white shadow-lg rounded-lg p-2 z-50">
                  <div className="flex flex-col gap-2">
                    <Link to="https://www.facebook.com">
                      <button className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-md cursor-pointer w-full">
                        <FaFacebook className="text-blue-600 text-lg" />
                        <span className="text-sm">Facebook</span>
                      </button>
                    </Link>

                    <Link to="https://twitter.com">
                      <button className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-md cursor-pointer w-full">
                        <FaTwitter className="text-blue-400 text-lg" />
                        <span className="text-sm">Twitter</span>
                      </button>
                    </Link>

                    <Link to="https://wa.me/">
                      <button className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-md cursor-pointer w-full">
                        <FaWhatsapp className="text-green-500 text-lg" />
                        <span className="text-sm">WhatsApp</span>
                      </button>
                    </Link>

                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(window.location.href);
                        // Add toast/notification here if needed
                      }}
                      className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-md cursor-pointer w-full"
                    >
                      <FaLink className="text-gray-600 text-lg" />
                      <span className="text-sm">Copy Link</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* List your home with us section */}
            <div className="flex flex-col items-center justify-center gap-4 bg-red-100 rounded-md p-4 md:p-5 mt-8 md:mt-16 shadow-md">
              <h3 className="text-sm md:text-md font-semibold">
                List your home with us
              </h3>
              <p className="text-xs md:text-sm font-light text-center">
                Get an approximate valuation in a matter of minutes
              </p>
              <button className="px-6 md:px-10 hover:bg-red-300 hover:text-white hover:border-none cursor-pointer rounded-full py-2 border text-sm md:text-base">
                Book a Valuation
              </button>
            </div>
          </div>

          <div className="h-screen"></div>
        </div>
      </div>

      <div>

<h3 className="text-sm text-start md:text-md font-semibold">Other properties that might interest y ou</h3>

</div>
    </div>
  );
};

export default PropertyDetails;
