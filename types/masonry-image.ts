import { StaticImageData } from "next/image";

export interface MasonryImageType {
  id: number;
  url: string | StaticImageData; // Support both string and StaticImageData as discussed
  title: string;
  height: number;
  width: number;
  category: string;
}