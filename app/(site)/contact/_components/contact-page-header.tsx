import backgroundImage from "@/images/about-bg.jpeg";

import Image from "next/image";

export default function ContactPageHeader() {
  return (
    <div className="relative h-[300px]">
      <Image
        src={backgroundImage}
        alt="Background Image"
        layout="fill"
        objectFit="cover"
        objectPosition="center"
        className="absolute z-0"
      />
      <div className="absolute inset-0 bg-blue-800 opacity-70 z-10"></div>{" "}
      <div className="relative z-20 text-center py-28">
        <h1 className="text-white text-4xl font-bold">Contact Us</h1>
        <nav className="mt-4">
          <ol className="flex justify-center space-x-2 text-white">
            <li>Home</li>
            <li>/</li>
            <li className="text-yellow-400">Contact Us</li>
          </ol>
        </nav>
      </div>
    </div>
  );
}
