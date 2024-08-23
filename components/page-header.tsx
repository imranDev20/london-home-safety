import Image from "next/image";
import Link from "next/link";
import { PageHeaderProps } from "@/types/props";

export default function PageHeader({
  backgroundImage,
  breadCrumbOptions,
}: PageHeaderProps) {
  const title = breadCrumbOptions.find((item) => item.isCurrentPage)?.label;

  return (
    <section className="relative -mt-[68px]">
      <Image
        src={backgroundImage}
        alt="Background"
        sizes="100vw"
        fill
        priority
        placeholder="blur"
        className="object-cover"
      />
      <div className="relative pt-[156px] pb-[80px] before:content-[''] before:absolute before:inset-0 before:bg-[#062C64] before:opacity-90 before:mix-blend-multiply">
        <div className="container mx-auto px-4">
          <h1 className="relative z-10 text-center text-white text-4xl font-bold mb-4">
            {title}
          </h1>
          <div className="flex justify-center items-center">
            <nav className="relative z-10 text-white" aria-label="Breadcrumb">
              <ol className="flex justify-center items-center space-x-2">
                <li>
                  <Link href="/" className="hover:underline">
                    Home
                  </Link>
                </li>
                {breadCrumbOptions
                  .filter((item) => !item.isCurrentPage && item.path)
                  .map((val, index) => (
                    <li key={val.path}>
                      <span className="mx-2 text-gray-300">/</span>
                      <Link href={val.path || "#"} className="hover:underline">
                        {val.label}
                      </Link>
                    </li>
                  ))}
                <li>
                  <span className="mx-2 text-gray-300">/</span>
                  <span className="text-secondary">{title}</span>
                </li>
              </ol>
            </nav>
          </div>
        </div>
      </div>
    </section>
  );
}
