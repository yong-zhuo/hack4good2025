
import { Navbar } from "@/components/navbar/Navbar";
import Image from "next/image";

export default function Home() {
  return (
    <div className="bg-sec min-h-screen w-full">
      <Navbar />
      <main className="container mx-auto p-10 md:flex-row items-center justify-center flex flex-col min-h-screen gap-2">
        <div className="sm:gap-1 mx-auto sm:text-start text-center p-4">
          <h2 className="font-extrabold text-pri text-3xl md:text-4xl lg:text-7xl ">Empowering Growth, One Request at a Time</h2>
          <h3 className="font-extralight sm:text-md">Building a brighter future for MWH residents through an intuitive Minimart and Voucher System. Earn, request, and thrive—while we streamline operations for a stronger, nurturing community.</h3>
        </div>
        <Image src={"/main/hero.svg"} width={650} height={650} alt="Purchasing items"/>
      </main>
    </div>
  );
}
