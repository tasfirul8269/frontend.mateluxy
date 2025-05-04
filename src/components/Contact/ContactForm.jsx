import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Label } from "./ui/label";
import { Check } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectSeparator, SelectTrigger, SelectValue } from "./ui/select";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
//   SelectSeparator,
// } from "@/components/contact/ui/select";

export const ContactForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm({
    defaultValues: {
      contactMethod: "phone",
    },
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const contactMethod = watch("contactMethod");

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    console.log("Form data:", data);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSubmitting(false);
    alert("Form submitted successfully!");
  };

  return (
    <section className="bg-[rgba(37,111,255,1)] self-stretch flex md:flex-row flex-col items-stretch w-full items-center gap-[40px_54px] overflow-hidden justify-between  mt-12 pl-[110px] pr-[30px] py-[30px] max-md:max-w-full max-md:mt-10 max-md:px-5">
      <div className="self-stretch flex min-w-60 flex-col items-stretch justify-center w-[479px] my-auto max-md:max-w-full">
        <h2 className="text-white text-4xl font-semibold max-md:max-w-full font-['Montserrat']">
          Book a Free Consultation
        </h2>
        <p className="text-[rgba(230,230,230,1)] text-2xl font-normal mt-5 max-md:max-w-full font-['Montserrat']">
          Let's schedule a time to talk. Whether it's a Zoom call or a coffee at
          our office — we'd love to meet you.
        </p>
      </div>

      <div className="bg-white self-stretch flex min-w-60 flex-col items-stretch text-black font-normal w-[765px] my-auto pt-9 pb-[85px] px-9 rounded-[20px] border-[rgba(0,0,0,0.1)] border-solid max-md:max-w-full max-md:px-5">
        <h3 className="text-[32px] font-semibold font-['Montserrat']">Contact Form</h3>
        <div className="border min-h-px w-full mt-[30px] border-[rgba(0,0,0,0.05)] border-solid max-md:max-w-full" />

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full text-base mt-[30px] max-md:max-w-full font-['Montserrat']"
        >
          <div className="flex max-w-full w-[686px] items-stretch gap-1.5 flex-wrap rounded-[10px]">
            <input
              type="text"
              placeholder="First Name"
              {...register("firstName", { required: true })}
              className="bg-[rgba(246,247,255,1)] grow shrink-0 basis-0 w-fit px-[11px] py-3.5 rounded-[10px] max-md:pr-5 focus:outline-none focus:ring-2 focus:ring-[rgba(37,111,255,1)]"
            />
            <input
              type="text"
              placeholder="Last name"
              {...register("lastName", { required: true })}
              className="bg-[rgba(246,247,255,1)] grow shrink-0 basis-0 w-fit px-[23px] py-3.5 rounded-[10px] max-md:px-3 focus:outline-none focus:ring-2 focus:ring-[rgba(37,111,255,1)]"
            />
          </div>

          <div className="flex max-w-full w-[686px] items-stretch gap-1.5 flex-wrap mt-5 rounded-[10px]">
            <input
              type="email"
              placeholder="Email"
              {...register("email", {
                required: true,
                pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              })}
              className="bg-[rgba(246,247,255,1)] whitespace-nowrap grow shrink-0 basis-0 w-fit px-[11px] py-3.5 rounded-[10px] max-md:pr-5 focus:outline-none focus:ring-2 focus:ring-[rgba(37,111,255,1)]"
            />
            <input
              type="tel"
              placeholder="Phone Number"
              {...register("phone", { required: true })}
              className="bg-[rgba(246,247,255,1)] grow shrink-0 basis-0 w-fit px-[23px] py-3.5 rounded-[10px] max-md:px-3 focus:outline-none focus:ring-2 focus:ring-[rgba(37,111,255,1)]"
            />
          </div>

          <div className="max-w-full w-[687px] whitespace-nowrap mt-5 rounded-[10px]">
            <textarea
              placeholder="Message"
              {...register("message", { required: true })}
              className="bg-[rgba(246,247,255,1)] w-full pt-[13px] pb-[82px] px-[11px] rounded-[10px] max-md:max-w-full max-md:pr-5 max-md:pb-[110px] focus:outline-none focus:ring-2 focus:ring-[rgba(37,111,255,1)]"
            />
          </div>

          <div className="flex max-w-full w-[686px] gap-[40px_180px] flex-wrap mt-[30px]">
            <div className="text-base grow shrink w-[118px]">
              <label htmlFor="interest" className="block mb-2.5">
                Interested in :
              </label>
              <Select
                onValueChange={(value) => setValue("interest", value)}
                defaultValue=""
              >
                <SelectTrigger className="bg-[rgba(246,247,255,1)] w-[265px] rounded-[10px] focus:outline-none focus:ring-2 focus:ring-[rgba(37,111,255,1)] border-0">
                  <SelectValue placeholder="Select your interest..." />
                </SelectTrigger>
                <SelectContent  className="bg-white rounded-[20px] border border-[#e6e6e6]">
                  <SelectItem value="buying">Buying Property</SelectItem>
                  <SelectSeparator />
                  <SelectItem value="selling">Selling Property</SelectItem>
                  <SelectSeparator />
                  <SelectItem value="renting">Renting</SelectItem>
                  <SelectSeparator />
                  <SelectItem value="investment">Investment Opportunities</SelectItem>
                  <SelectSeparator />
                  <SelectItem value="management">Property Management</SelectItem>
                  <SelectSeparator />
                  <SelectItem value="general">General Inquiry</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex min-w-60 flex-col items-stretch justify-center grow shrink w-[302px]">
              <div className="text-base">Contact Method :</div>
              <div className="flex items-center justify-between mt-[25px]">
                {["phone", "whatsapp", "email"].map((method) => (
                  <div key={method} className="flex items-center space-x-2">
                    <div className="relative flex items-center">
                      <input
                        type="radio"
                        id={method}
                        value={method}
                        checked={contactMethod === method}
                        onChange={() => setValue("contactMethod", method)}
                        className="peer appearance-none h-4 w-4 rounded border border-gray-300 checked:bg-[#256fff] checked:border-0"
                      />
                      <Check className="absolute h-3 w-3 text-white pointer-events-none opacity-0 peer-checked:opacity-100 left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                    </div>
                    <Label htmlFor={method} className="text-[15px] ml-1 capitalize">
                      {method}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="border min-h-px w-full mt-[30px] border-[rgba(0,0,0,0.05)] border-solid max-md:max-w-full" />

          <div className="flex mt-[30px]">
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-[rgba(198,234,255,0.4)] inline-flex justify-center w-auto min-w-[200px] gap-2.5 text-[18px] text-[rgba(37,111,255,1)] font-medium text-center px-10 py-5 rounded-[15px] hover:bg-[rgba(198,234,255,0.6)] transition-colors disabled:opacity-70 font-['Montserrat'] self-start"
            >
              {isSubmitting ? "Sending..." : "Send Message"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};


export default ContactForm;