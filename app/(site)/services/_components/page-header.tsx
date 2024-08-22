import BackgroundImage from "@/images/about-bg.jpeg";
import Image from "next/image";

export default function PageHeader() {
  return (
    <div className="relative h-[300px]">
      <Image
        src={BackgroundImage}
        alt="London Home Safety Hero Background"
        fill
        priority
        style={{ objectFit: "cover" }}
        placeholder="blur"
        quality={30}
        rel="preload"
        sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 33vw" //
      />
      <div className="absolute inset-0 bg-blue-800 opacity-70 z-10"></div>{" "}
      <div className="relative z-20 text-center py-28">
        <h1 className="text-white text-4xl font-bold">Services</h1>
        <nav className="mt-4">
          <ol className="flex justify-center space-x-2 text-white">
            <li>Home</li>
            <li>/</li>
            <li className="text-yellow-400">Services</li>
          </ol>
        </nav>
      </div>
    </div>
  );
}
