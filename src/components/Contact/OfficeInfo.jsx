import React from "react";

export const OfficeInfo = () => {
  return (
    <section className="w-[1372px] max-w-full mt-12 max-md:mt-10">
      <div className="flex items-center w-full gap-7 justify-between flex-wrap">
        <div className="min-w-60 w-full  flex flex-col md:flex-row  items-center gap-6 rounded-[20px] max-md:max-w-full ">
        
          <div className="bg-white border overflow-hidden text-base text-black font-medium pl-[30px] pr-4 py-[30px] rounded-[20px] border-[rgba(0,0,0,0.1)] border-solid max-md:max-w-full max-md:pl-5">
            <h3 className="text-[rgba(37,111,255,1)] text-xl font-semibold">
              Visit Our Office
            </h3>
            <div className="border min-h-px max-w-full w-[524px] mt-5 border-[rgba(0,0,0,0.05)] border-solid" />
            <div className="mt-5">Mateluxy Real Estate</div>
            <address className="text-[rgba(95,95,95,1)] text-sm font-normal mt-5 not-italic">
              Bay Square - Office #601 - Building 13 - Business Bay <br />
              Dubai - United Arab Emirates
            </address>
            <div className="border min-h-px max-w-full w-[524px] mt-5 border-[rgba(0,0,0,0.05)] border-solid" />
            <div className="mt-5">Working Hours</div>
            <div className="text-[rgba(95,95,95,1)] text-sm font-normal mt-5">
              Monday to Saturday: 9:00 AM – 6:00 PM
              <br />
              Sunday: <span className="text-[rgba(255,0,0,1)]">Closed</span>
            </div>
          </div>
          <div className="bg-white border overflow-hidden text-sm text-[rgba(95,95,95,1)] font-semibold mt-[34px] pl-[30px] pr-4 py-[30px] rounded-[20px] border-[rgba(0,0,0,0.1)] border-solid max-md:max-w-full max-md:pl-5">
            <h3 className="text-[rgba(37,111,255,1)] text-xl">
              Get in Touch Directly
            </h3>
            <div className="border min-h-px max-w-full w-[524px] mt-2.5 border-[rgba(0,0,0,0.05)] border-solid" />
            <div className="text-black text-base font-medium mt-2.5">
              Phone / WhatsApp:
            </div>
            <a
              href="tel:+971585590085"
              className="font-normal mt-2.5 block hover:text-[rgba(37,111,255,1)] transition-colors"
            >
              +971 58 559 0085
            </a>
            <div className="text-black text-base font-medium mt-2.5">
              Email Address:
            </div>
            <a
              href="mailto:info@mateluxy.com"
              className="font-normal mt-2.5 block hover:text-[rgba(37,111,255,1)] transition-colors"
            >
              info@mateluxy.com
            </a>
            <div className="border min-h-px max-w-full w-[524px] mt-2.5 border-[rgba(0,0,0,0.05)] border-solid" />
            <div className="mt-2.5">
              We typically respond within in only 30 minutes
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OfficeInfo;