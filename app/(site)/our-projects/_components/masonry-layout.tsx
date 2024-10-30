'use client';

import React, { useState, useEffect } from 'react';
import Masonry from 'react-masonry-css';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import Image from 'next/image';
import { MasonryImageType } from '@/types/masonry-image';
import { blurData } from '@/shared/data';

interface Props {
  masonryImage: MasonryImageType[];
}

export default function MasonryLayout({ masonryImage }: Props) {
  const [selectedImage, setSelectedImage] = useState<MasonryImageType | null>(null);
  const [isZoomed, setIsZoomed] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [categories, setCategories] = useState<string[]>([]);

  const breakpointColumns = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1,
  };

  useEffect(() => {
    const uniqueCategories = Array.from(new Set(masonryImage.map((image) => image.category)));
    setCategories(['All', ...uniqueCategories]);
  }, [masonryImage]);

  const filteredImages = selectedCategory === 'All'
    ? masonryImage
    : masonryImage.filter((image) => image.category === selectedCategory);

  return (
    <section className="container p-6">
      {/* Header section */}
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Our Project Gallery</h2>
        <p className="text-gray-600 max-w-lg mx-auto">
          Explore our collection of completed projects, showcasing our commitment to quality and expertise.
        </p>
      </div>

      {/* Filter options */}
      <div className="flex justify-end mb-4">
        <label htmlFor="category" className="mr-2 text-gray-700">Select Category:</label>
        <select
          id="category"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="border rounded px-2 py-1"
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      {/* Masonry grid */}
      <Masonry
        breakpointCols={breakpointColumns}
        className="flex w-full gap-4"
        columnClassName="flex flex-col gap-4"
      >
        {filteredImages.map((image) => (
          <div
            key={image.id}
            className="relative overflow-hidden rounded-lg cursor-pointer transition-transform hover:scale-[1.02]"
            onClick={() => {
              setSelectedImage(image);
              setIsZoomed(false); // Reset zoom state when a new image is selected
            }}
          >
            <Image
              src={image.url}
              alt={image.title}
              width={image.width}
              height={image.height}
              className="w-full h-auto object-cover"
              placeholder="blur"
              blurDataURL={blurData}
            />
          </div>
        ))}
      </Masonry>

      {/* Full-screen dialog with zoom-in feature */}
      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-screen-md flex justify-center items-center">
          {selectedImage && (
            <div
              className={`relative w-full transition-transform duration-300 ${
                isZoomed ? 'scale-150 cursor-zoom-out' : 'cursor-zoom-in'
              }`}
              onClick={() => setIsZoomed(!isZoomed)}
            >
              <Image
                src={selectedImage.url}
                alt={selectedImage.title}
                width={selectedImage.width}
                height={selectedImage.height}
                className="w-full h-auto max-h-screen object-contain"
              />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
