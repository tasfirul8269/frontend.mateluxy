import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const AgentProfileCard = () => {

  const [agentData, setAgentData] = useState([]);


  const {id} = useParams();

  useEffect(()=> {
    axios.get(`${import.meta.env.VITE_API_URL}/api/agents/${id}`)
    .then(res => {
      setAgentData(res.data)
    })
    .catch(err => console.log(err))
  } , [])
  

  const handleDownloadVCard = () => {
    // Validate required fields
    if (!agentData?.fullName) {
      console.error("Full name is required to generate a vCard.");
      return;
    }
  
    // Sanitize inputs (remove line breaks, trim whitespace)
    const sanitize = (str) => (str || "").toString().replace(/\n/g, " ").trim();
  
    // Construct minimal vCard
    const vCardData = [
      "BEGIN:VCARD",
      "VERSION:3.0",
      `FN:${sanitize(agentData?.fullName)}`,
      agentData?.position && `TITLE:${sanitize(agentData?.position)}`,
      agentData?.contactNumber && `TEL;TYPE=CELL:${sanitize(agentData.contactNumber)}`,
      agentData?.email && `EMAIL:${sanitize(agentData.email)}`,
      "END:VCARD",
    ]
      .filter(Boolean) // Remove empty lines
      .join("\n");
  
    // Generate filename (sanitize special chars)
    const fileName = `${agentData.fullName.replace(/[^\w\s]/gi, "_")}.vcf`;
  
    // Trigger download
    const blob = new Blob([vCardData], { type: "text/vcard;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = fileName;
    link.style.display = "none";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col lg:flex-row shadow-lg rounded-xl overflow-hidden">
        {/* Left side content */}
        <div className="p-8 lg:p-12 bg-white lg:w-1/2 flex flex-col justify-center">
          <h1 className="text-4xl md:text-5xl font-bold text-[#0a3b1d] mb-2 tracking-tight">
            {agentData?.fullName}
          </h1>
          <p className="text-xl text-gray-600 mb-6">
            Position: {agentData?.position}
          </p>

          {/* Contact buttons */}
          <div className="flex flex-wrap gap-4 mb-8">
            <a
              href={`https://wa.me/${
                agentData?.whatsapp ? agentData?.whatsapp : "1234567890"
              }`}
              className="flex items-center gap-2 bg-[#20c997] text-white px-6 py-3 rounded-full transition-transform hover:scale-105 active:scale-95"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
              <span>Whatsapp</span>
            </a>
            <a
              href={`mailto:${
                agentData?.email ? agentData.email : "default@example.com"
              }`}
              className="flex items-center gap-2 bg-white border border-gray-300 text-gray-700 px-6 py-3 rounded-full transition-transform hover:scale-105 active:scale-95"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
              <span>Email</span>
            </a>
            <a
              href={`tel:${
                agentData?.contactNumber?.replace(/\D/g, "") || "1234567890"
              }`}
              className="flex items-center gap-2 bg-white border border-gray-300 text-gray-700 px-6 py-3 rounded-full transition-transform hover:scale-105 active:scale-95"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              <span>Call</span>
            </a>
          </div>

          {/* vCard */}
          <button
            onClick={handleDownloadVCard}
            className="flex items-center text-[#0a3b1d] cursor-pointer font-medium mb-8 hover:text-[#20c997] transition-colors group w-fit"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-2 group-hover:translate-y-[2px] transition-transform"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            <span className="border-b border-[#0a3b1d] group-hover:border-[#20c997]">
              Download vCard
            </span>
          </button>

          {/* Description */}
         
          <p className="text-gray-600 leading-relaxed">{agentData?.aboutMe}</p>
        </div>

        {/* Right side image */}
        <div className="lg:w-1/2 min-h-[300px] lg:min-h-full">
          <img
            src={agentData?.profileImage}
            alt={agentData?.fullName}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* --------------------------------------------------------- */}
      <div className="flex flex-col md:flex-row gap-8 w-full justify-center md:justify-around items-center my-16">
        <div className="w-full">
         
        </div>
     
      </div>
    </div>
  );
};

export default AgentProfileCard;
