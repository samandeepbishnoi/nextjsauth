"use client";
import Link from "next/link";

import { Button } from "@/components/ui/moving-border";

const HeroSection = () => {
  return (
    
    <div className="h-auto md:h-[40rem] w-full rounded-md flex flex-col items-center justify-center relative mx-auto overflow-hidden py-10 md:py-0 ">
     
      <div className="p-4 relative z-10 w-full text-center">
        <h1 className="mt-20 md:mt-0 text-4xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400">
          Next.js Auth Functionality
        </h1>
        <br />
        
        <p className="mt-4 font-normal text-base md:text-lg text-neutral-300 max-w-lg mx-auto">
          Explore our robust authentication system built with Next.js, MongoDB, and a mailer for user verification. Secure and streamline your user sign-ups with our easy-to-integrate solution.
        </p>
        <br />
       
        <div className="mt-4">
          <Link href={"/profile"}>
            <Button>Visit Profile</Button>
          </Link>
          
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
