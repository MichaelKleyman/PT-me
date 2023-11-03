import React, { ReactElement } from "react";
import { Quicksand } from "@next/font/google";
import FitnessImg from "../app/images/weightlifter.png";
import SpeedImg from "../app/images/speedometer.png";
import PortalImg from "../app/images/healthcare.png";
import AppointmentImg from "../app/images/booking.png";
import Image from "next/image";
import { StaticImageData } from "next/image";

const quicksand = Quicksand({
  subsets: ["latin"],
  weight: ["400", "700"],
});

interface Service {
  logo: StaticImageData;
  service: string;
  description: string;
}

const services: Array<Service> = [
  {
    logo: FitnessImg,
    service: "Exercise Database",
    description:
      "Physical therapy practice accounts are provided with a vast library of exercises and treatment resources. Comes with easy access to a wide range of exercises, consisting of tips, description, and muscle specification. This database allows therapists to create customized exercise plans tailored to each patients needs, making it a versatile resource for individualized care.",
  },
  {
    logo: SpeedImg,
    service: "Instant Search",
    description:
      "Find a patients flowsheet in seconds and make appointments seamless. Search for a patients name and save time on digging through files. Exercises are categorized by injury type and muscle type, making exercise assignment simple.",
  },
  {
    logo: PortalImg,
    service: "Your Own Clinic Portal",
    description:
      "Gain access to relevant insights of your practice such as common injuries your patients have, and appointment history based on data overtime.",
  },
  {
    logo: AppointmentImg,
    service: "Appointment Tracking",
    description:
      "Schedule and track appointments with our extensive calendar functionality, and set recurring appointments with one click. Track these appointments and send reminders to patients via email through your portal.",
  },
];

const Services = () => {
  return (
    <section id='services' className='w-full md:h-screen mt-8'>
      <div className={quicksand.className}>
        <h1
          className='text-center
         text-green-700'
        >
          Our Services
        </h1>
        <h1 className='text-center font-bold text-4xl text-green-700 pt-3'>
          Services For Your Clinic
        </h1>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-4 gap-6 place-content-center py-8'>
        {services.map((service, i) => (
          <div
            key={i}
            className='w-full h-full shadow-lg
            shadow-slate-300 hover:shadow-lg hover:shadow-gray-400 rounded-lg p-4 duration-300 hover:scale-110'
          >
            <Image alt='/' src={service.logo} height={35} width={35} />
            <h1 className='font-bold py-4'>{service.service}</h1>
            <p className='font-thin'>{service.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Services;
