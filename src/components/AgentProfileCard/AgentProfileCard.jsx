import React from "react";

const AgentProfileCard = ({
  name,
  position,
  imageUrl,
  shortDescription,
  longDescription,
  contactInfo,
}) => {
  const handleDownloadVCard = () => {
    // Create vCard content
    const vCardData = `
BEGIN:VCARD
VERSION:3.0
FN:${name}
TITLE:${position}
TEL;TYPE=CELL:${contactInfo.phone}
EMAIL:${contactInfo.email}
END:VCARD
    `.trim();

    // Create a Blob and download link
    const blob = new Blob([vCardData], { type: "text/vcard" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${name.replace(/\s+/g, "_")}.vcf`;
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
            Luke Remington
          </h1>
          <p className="text-xl text-gray-600 mb-6">
            Position: Managing director
          </p>

          {/* Contact buttons */}
          <div className="flex flex-wrap gap-4 mb-8">
            <a
              href={`https://wa.me/${
                contactInfo?.whatsapp ? contactInfo.whatsapp : "1234567890"
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
                contactInfo?.email ? contactInfo.email : "default@example.com"
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
                contactInfo?.phone?.replace(/\D/g, "") || "1234567890"
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
            className="flex items-center text-[#0a3b1d] font-medium mb-8 hover:text-[#20c997] transition-colors group w-fit"
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
          <p className="text-gray-800 mb-4 font-medium leading-relaxed">
            Originally from The Heart of England, Luke has over 20 years'
            experience in the property market. During this time he was
            instrumental in the company being recognized as 'The Best
            Independent Estate Agent in The UK' by The Sunday Times.
          </p>
          <p className="text-gray-600 leading-relaxed">{longDescription}</p>
        </div>

        {/* Right side image */}
        <div className="lg:w-1/2 min-h-[300px] lg:min-h-full">
          <img
            src="https://ggfx-handh3.s3.eu-west-2.amazonaws.com/x/600ct520/Luke_Remington_DXB_21_dabda4e681.webp"
            alt={name}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* --------------------------------------------------------- */}
      <div className="flex flex-col md:flex-row gap-8 w-full justify-center md:justify-around items-center my-16">
        <div className="w-full">
          <p className="text-[#083819]">
            His genuine passion for property has seen him visit The USA for 5
            separate property awards and also successfully manage multi-million
            pound developments within the West Wales region. In early 2012 Luke
            decided to challenge himself with a Worldwide market and joined one
            of Dubai’s largest and most respected brokers, becoming a senior
            sales consultant and the companies’ best newcomer at the annual
            awards. In August 2013 along with his business partners, Luke formed
            haus &amp; haus. His in depth managerial knowledge, roll your
            sleeves up attitude and hands on leadership have turned the haus
            team into one of Dubai's most reputable agencies.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-6 w-full mt-10 md:mt-0 text-center">
          <iframe
            className="rounded-md w-full"
            src="https://www.youtube.com/embed/rfS5hOmNT_s"
            title="আজকের আন্তর্জাতিক সংবাদ | International News | Ekattor TV"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerpolicy="strict-origin-when-cross-origin"
            allowfullscreen
          ></iframe>
          <iframe
            className="rounded-md w-full"
            src="https://www.youtube.com/embed/rfS5hOmNT_s"
            title="আজকের আন্তর্জাতিক সংবাদ | International News | Ekattor TV"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerpolicy="strict-origin-when-cross-origin"
            allowfullscreen
          ></iframe>
          <iframe
            className="rounded-md w-full"
            src="https://www.youtube.com/embed/rfS5hOmNT_s"
            title="আজকের আন্তর্জাতিক সংবাদ | International News | Ekattor TV"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerpolicy="strict-origin-when-cross-origin"
            allowfullscreen
          ></iframe>
          <iframe
            className="rounded-md w-full"
            src="https://www.youtube.com/embed/rfS5hOmNT_s"
            title="আজকের আন্তর্জাতিক সংবাদ | International News | Ekattor TV"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerpolicy="strict-origin-when-cross-origin"
            allowfullscreen
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default AgentProfileCard;
