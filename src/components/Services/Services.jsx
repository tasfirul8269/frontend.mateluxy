import { FaArrowRight } from "react-icons/fa";

const servicesData = [
  {
    id: 1,
    title: "Residential Sales and Leasing",
    backgroundImage: "https://i.ibb.co.com/SwQHBqXL/residential-background.png",
    buttonText: "Explore Dubai",
    buttonIcon: <FaArrowRight className="ml-2" />,
    hasSearch: false,
    bgColor: "bg-[#f6f6f1]",
    textColor: "text-[#083819]",
    buttonStyle: "flex justify-center items-center gap-1 px-7 py-5 rounded-full text-white hover:text-white bg-red-400 hover:bg-red-700 p-2 cursor-pointer text-lg font-semibold"
  },
  {
    id: 2,
    title: "Commercial Sales and leasing",
    backgroundImage: "https://i.ibb.co.com/8ys6NDD/commercial.png",
    placeholder: "Name or department",
    hasSearch: true,
    bgColor: "bg-[#f6f6f1]",
    textColor: "text-[#083819]",
    searchButtonStyle: "join-item rounded-full text-white bg-red-400 hover:bg-red-700 hover:text-white p-2 cursor-pointer",
    inputStyle: "input input-bordered join-item w-full bg-white text-gray-700 px-5 py-7 border-none focus:outline-none"
  },
  {
    id: 3,
    title: "Property Management",
    backgroundImage: "https://i.ibb.co.com/0Vzn7Rp5/property-management.png",
    placeholder: "Name or department",
    hasSearch: true,
    bgColor: "bg-[#f6f6f1]",
    textColor: "text-[#083819]",
    searchButtonStyle: "join-item rounded-full text-white bg-red-400 hover:bg-red-700 hover:text-white p-2 cursor-pointer",
    inputStyle: "input input-bordered join-item w-full bg-white text-gray-700 px-5 py-7 border-none focus:outline-none"
  }
];

const Services = () => {
  return (
    <div className=" py-12 grid w-full md:grid-cols-3 gap-5  my-14 animate__animated animate__fadeInUp ">
      {servicesData.map((service) => (
        <div
          key={service.id}
          className={`card ${service.bgColor} rounded-[20px] relative text-start w-full`}
        >
          <img className="relative  border border-[#e6e6e6] rounded-[20px]" src={service.backgroundImage}  />
          <div className=" absolute left-[5%] top-[10%]">
            <h2 className={`card-title text-3xl w-[75%] font-semibold ${service.textColor}`}>
              {service.title}
            </h2>
            
          </div>
        </div>
      ))}
    </div>
  );
};

export default Services;