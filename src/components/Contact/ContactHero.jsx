import React from "react";

const ContactHero = () => {
  return (
    <section className="flex flex-col relative min-h-[678px] w-[calc(100%-40px)] max-w-full overflow-hidden items-center justify-center mx-5 mt-12 px-2.5 py-[271px] rounded-[30px] max-md:mt-10 max-md:py-[100px] mt-32">
      <img
        src="https://cdn.builder.io/api/v1/image/assets/641f5fc1a0e14172a7f4376b457540cc/c13970172ffffe8b36bcbda422f570abdc9871bd?placeholderIfAbsent=true"
        alt="Contact Hero Background"
        className="absolute h-full w-full object-cover inset-0"
      />
      <div className="relative text-white text-5xl font-semibold max-md:max-w-full max-md:text-[40px] font-['Montserrat']">
        Book a Free Consultation
      </div>
      <div className="relative text-[rgba(205,205,205,1)] text-2xl font-medium text-center mt-5 max-md:max-w-full font-['Montserrat']">
        Let's schedule a time to talk. Whether it's a Zoom call or a coffee at
        our office
        <br /> — we'd love to meet you.
      </div>
    </section>
  );
};


export default ContactHero;