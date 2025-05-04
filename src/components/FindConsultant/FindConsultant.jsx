import { CiSearch } from "react-icons/ci";

const FindConsultant = () => {
  // ... (keep the agents array same as before)
  const agents = [
    {
      name: "James Wilson",
      whatsapp: "+14845551234",
      img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80",
      specialty: "Luxury Homes",
      experience: "8 years"
    },
    {
      name: "Sarah Johnson",
      whatsapp: "+14845552345",
      img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80",
      specialty: "Commercial Properties",
      experience: "6 years"
    },
    {
      name: "Michael Chen",
      whatsapp: "+14845553456",
      img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80",
      specialty: "Investment Properties",
      experience: "10 years"
    },
    {
      name: "Emily Rodriguez",
      whatsapp: "+14845554567",
      img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80",
      specialty: "First-Time Buyers",
      experience: "5 years"
    }
  ];

  return (
    <div className="mx-[auto] p-4 md:p-6 animate__animated animate__fadeInUp flex flex-col md:flex-row justify-between items-center gap-4 md:gap-8 container rounded-[20px] bg-gradient-to-b from-[#B4E4FF]  to-[#256fff]">
      {/* Agent Images - Mobile first stack */}
      <div className="flex flex-wrap justify-center gap-0 md:gap-0px px-10 order-1 md:order-none">
        {agents.map((agent, index) => (
          <img 
            key={index}
            src={agent.img}
            className="w-12 h-12 md:w-10 ml-[-20px] md:h-10 rounded-full border-2 border-white shadow-sm hover:scale-110 transition-transform"
            alt={`Agent ${agent.name}`}
          />
        ))}
      </div>

      {/* Title and Description - Center aligned on mobile */}
      <div className="text-center md:text-left order-3 md:order-none flex-1">
        <h2 className="text-xl sm:text-2xl font-semibold text-white mb-1 md:mb-2">
          Find your consultant
        </h2>
        <p className="text-sm sm:text-base text-white/60">
          Search our team of 50+ property experts to get professional guidance.
        </p>
      </div>

      {/* Search Button - Full width on mobile */}
      <button className="w-full md:w-auto order-2 md:order-none rounded-[15px] h-12 px-4 md:px-6 text-lg sm:text-[xl] bg-[#ffffffaa] hover:bg-gray-50 text-[#fff] hover:text-blue-700 cursor-pointer transition-all flex items-center font-semibold  justify-center gap-2  ">
       
        <span>Find</span>
      </button>
    </div>
  );
};

export default FindConsultant;;