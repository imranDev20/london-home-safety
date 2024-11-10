// app/our-projects/page.tsx

import PageHeader from "@/components/page-header";
import BackgroundImage from "@/images/electric.jpg";
import MasonryLayout from "./_components/masonry-layout";
import { getImages } from "./actions";
import { MasonryImageType } from "@/types/masonry-image";

const breadCrumbOptions = [
  {
    label: "Our Projects",
    isCurrentPage: true,
  },
];

export default async function OurProjects() {
  let masonryImages: MasonryImageType[] = [];

  try {
    const categories = await getImages();
    
    masonryImages = categories.flatMap(category => 
      category.images.map(image => ({
        ...image,
        category: category.category 
      }))
    );

  } catch (error) {
    console.error("Error fetching images:", error);
  }

  return (
    <div>
      <PageHeader
        backgroundImage={BackgroundImage}
        breadCrumbOptions={breadCrumbOptions}
      />
      
      <MasonryLayout masonryImage={masonryImages} />
    </div>
  );
}
