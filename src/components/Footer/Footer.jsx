import React, { useState } from "react";

const Footer = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      console.log("Subscribing email:", email);
      alert(`Thank you for subscribing with ${email}!`);
      setEmail("");
    }
  };

  return (
    <footer className="self-stretch flex w-full flex-col overflow-hidden items-stretch justify-center mt-12 py-[19px] rounded-[20px_20px_0px_0px] max-md:max-w-full max-md:mt-10 bg-[rgba(37,111,255,1)]">
      <div className="flex w-full items-center justify-around gap-[40px_100px] overflow-hidden text-base text-white font-medium  flex-wrap px-5 py-2.5 max-md:max-w-full">
        <div className="self-stretch min-w-60 overflow-hidden font-normal my-auto p-2.5 max-md:max-w-full">
          <h3 className="text-white text-2xl font-semibold">Stay in the loop</h3>
          <p className="font-medium mt-2.5 max-md:max-w-full">
            News and insight straight to your inbox. We don't spam.
          </p>
          <form onSubmit={handleSubscribe} className="mt-2.5">
            <div className="bg-[rgba(246,247,255,1)] flex max-w-full w-[444px] items-stretch gap-5 overflow-hidden text-black justify-between px-[22px] py-[21px] rounded-[15px] max-md:pr-5">
              <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-transparent outline-none flex-1"
              />
              <button type="submit">
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/641f5fc1a0e14172a7f4376b457540cc/42479e31cdcb67cdbb55e09f9281ea1dec82ceff?placeholderIfAbsent=true"
                  alt="Submit"
                  className="aspect-[1] object-contain w-6 shrink-0 cursor-pointer"
                />
              </button>
            </div>
          </form>
          <p className="text-[11px] mt-2.5 max-md:max-w-full">
            <span className="font-medium">By clicking Submit, you agree to our </span>
            <a href="#" className="font-semibold text-white hover:underline">Terms & Conditions</a>
            <span className="font-medium"> and </span>
            <a href="#" className="font-semibold text-white hover:underline">Privacy Policy</a>
            <span className="font-medium">.</span>
          </p>
        </div>

       <div className="flex justify-center items-center gap-5">
         <div className="self-stretch overflow-hidden my-auto p-2.5">
          <h3 className="text-white text-2xl font-semibold">Services</h3>
          <ul>
            {["Residential areas", "Residential leasing", "Off plan", "Commercial Properties", "Properties Management"].map((item, idx) => (
              <li key={idx} className="mt-2.5 hover:text-[rgba(198,234,255,1)] transition-colors">
                <a href="#">{item}</a>
              </li>
            ))}
          </ul>
        </div>

        <div className="self-stretch overflow-hidden my-auto p-2.5">
          <h3 className="text-white text-2xl font-semibold">Resources</h3>
          <ul>
            {["Real Estate Guides", "News & Insights", "Market Reports", "Instant Property Valuation", "Podcast"].map((item, idx) => (
              <li key={idx} className="mt-2.5 hover:text-[rgba(198,234,255,1)] transition-colors">
                <a href="#">{item}</a>
              </li>
            ))}
          </ul>
        </div>

        <div className="self-stretch overflow-hidden my-auto p-2.5">
          <h3 className="text-white text-2xl font-semibold">About</h3>
          <ul>
            {["Our Story", "Our team", "Client Reviews", "Careers", "Contact"].map((item, idx) => (
              <li key={idx} className="mt-2.5 hover:text-[rgba(198,234,255,1)] transition-colors">
                <a href="#">{item}</a>
              </li>
            ))}
          </ul>
        </div>
       </div>
      </div>

      <div className="border self-center min-h-0 w-[1379px] max-w-full mt-2.5 border-[rgba(0,0,0,0.1)] border-solid" />

      <div className="flex w-full items-center gap-[40px_100px] overflow-hidden justify-between flex-wrap mt-2.5 px-5 py-2.5 max-md:max-w-full">
        <div className="self-stretch min-w-60 overflow-hidden text-base text-white font-medium my-auto p-2.5 max-md:max-w-full">
          <address className="max-md:max-w-full not-italic">
            Bay Square - Office #601 - Building 13 - Business Bay <br />
            Dubai - United Arab Emirates
          </address>
          <div className="mt-2.5">Monday to Saturday: 9:00 AM – 6:00 PM</div>
          <div className="text-[11px] mt-2.5">©️ 2025 MateLuxy. All Rights Reserved.</div>
        </div>

        <div className="self-stretch flex gap-2.5 overflow-hidden my-auto">
          <a
            href="#"
            className="bg-[rgba(224,255,228,1)] flex items-center gap-2.5 w-11 h-11 p-2.5 rounded-[1000px] hover:bg-[rgba(204,235,208,1)] transition-colors"
          >
            <img
              src="https://cdn.builder.io/api/v1/image/assets/641f5fc1a0e14172a7f4376b457540cc/c58eaa042bcdef6e91edab2304f05f832fffc98b?placeholderIfAbsent=true"
              alt="WhatsApp"
              className="aspect-[1] object-contain w-6 self-stretch my-auto"
            />
          </a>
          <a href="#">
            <img
              src="https://cdn.builder.io/api/v1/image/assets/641f5fc1a0e14172a7f4376b457540cc/98e63ee1ffdd9c99ce5cdf0adf2b43177710a6cd?placeholderIfAbsent=true"
              alt="Social Media"
              className="aspect-[1] object-contain w-11 shrink-0"
            />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
