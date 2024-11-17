"use client";

import React, { useState, useEffect, useCallback } from "react";
import Masonry from "react-masonry-css";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut, X } from "lucide-react";
import { MasonryImageType } from "@/types/masonry-image";
import { blurData } from "@/shared/data";

interface Props {
  masonryImage: MasonryImageType[];
}

export default function MasonryLayout({ masonryImage }: Props) {
  const [selectedImage, setSelectedImage] = useState<MasonryImageType | null>(
    null
  );
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [categories, setCategories] = useState<string[]>([]);

  const breakpointColumns = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1,
  };

  useEffect(() => {
    const uniqueCategories = Array.from(
      new Set(masonryImage.map((image) => image.category))
    );
    setCategories(["All", ...uniqueCategories]);
  }, [masonryImage]);

  const filteredImages =
    selectedCategory === "All"
      ? masonryImage
      : masonryImage.filter((image) => image.category === selectedCategory);

  const handleImageSelect = (image: MasonryImageType, index: number) => {
    setSelectedImage(image);
    setSelectedIndex(index);
    setIsZoomed(false);
  };

  const handlePrevious = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      const newIndex =
        selectedIndex > 0 ? selectedIndex - 1 : filteredImages.length - 1;
      setSelectedIndex(newIndex);
      setSelectedImage(filteredImages[newIndex]);
      setIsZoomed(false);
    },
    [selectedIndex, filteredImages]
  );

  const handleNext = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      const newIndex =
        selectedIndex < filteredImages.length - 1 ? selectedIndex + 1 : 0;
      setSelectedIndex(newIndex);
      setSelectedImage(filteredImages[newIndex]);
      setIsZoomed(false);
    },
    [selectedIndex, filteredImages]
  );

  // Add keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedImage) return;

      if (e.key === "ArrowLeft") {
        handlePrevious(e as unknown as React.MouseEvent);
      } else if (e.key === "ArrowRight") {
        handleNext(e as unknown as React.MouseEvent);
      } else if (e.key === "Escape") {
        setSelectedImage(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedImage, handlePrevious, handleNext]);

  return (
    <section className="bg-white">
      <div className="container py-12 px-4 max-w-7xl mx-auto">
        {/* Header and filters remain the same */}
        <h2 className="text-center mb-8 sm:mb-16 text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
          Our Project Showcase
          <span className="text-primary block mt-2 relative">
            Expert Installations
            <svg
              className="absolute w-full h-3 -bottom-2 left-0 text-primary opacity-30"
              viewBox="0 0 200 9"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill="currentColor"
                d="M0,7 C50,9 100,4 150,6 L200,7 L200,9 L0,9 Z"
              />
            </svg>
          </span>
        </h2>

        <div className="flex flex-wrap gap-2 justify-center mb-8">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => setSelectedCategory(category)}
              className="rounded-full"
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Masonry grid */}
        <Masonry
          breakpointCols={breakpointColumns}
          className="flex w-full gap-4"
          columnClassName="flex flex-col gap-4"
        >
          {filteredImages.map((image, index) => (
            <div
              key={image.id}
              className="group relative overflow-hidden rounded-xl cursor-pointer transition-all duration-300 hover:shadow-lg"
              onClick={() => handleImageSelect(image, index)}
            >
              <Image
                src={image.url}
                alt={image.title}
                width={image.width}
                height={image.height}
                className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
                placeholder="blur"
                blurDataURL={blurData}
              />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  <h3 className="text-lg font-semibold mb-1">{image.title}</h3>
                  <Badge variant="secondary" className="text-xs">
                    {image.category}
                  </Badge>
                </div>
              </div>
            </div>
          ))}
        </Masonry>

        {/* Enhanced modal dialog */}
        <Dialog
          open={!!selectedImage}
          onOpenChange={() => setSelectedImage(null)}
        >
          <DialogContent className="max-w-[95vw] h-[95vh] flex items-center justify-center p-0 gap-0 bg-black/95">
            {/* Close button */}
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-4 top-4 text-white hover:bg-white/20 z-50"
              onClick={() => setSelectedImage(null)}
              aria-label="Close dialog"
            >
              <X className="h-6 w-6" />
            </Button>

            {/* Navigation buttons */}
            <Button
              variant="ghost"
              size="icon"
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20 z-50"
              onClick={handlePrevious}
              aria-label="Previous image"
            >
              <ChevronLeft className="h-8 w-8" />
            </Button>

            {selectedImage && (
              <div className="relative w-full h-full flex items-center justify-center p-4">
                <div
                  className={`relative transition-transform duration-300 ${
                    isZoomed ? "scale-150" : "scale-100"
                  }`}
                  style={{ maxWidth: "95vw", maxHeight: "90vh" }}
                >
                  <Image
                    src={selectedImage.url}
                    alt={selectedImage.title}
                    width={selectedImage.width}
                    height={selectedImage.height}
                    className="w-auto h-auto max-w-full max-h-[85vh] object-contain"
                    quality={100}
                  />
                </div>

                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute bottom-4 right-4 text-white hover:bg-white/20 z-50"
                  onClick={() => setIsZoomed(!isZoomed)}
                  aria-label={isZoomed ? "Zoom out" : "Zoom in"}
                >
                  {isZoomed ? (
                    <ZoomOut className="h-6 w-6" />
                  ) : (
                    <ZoomIn className="h-6 w-6" />
                  )}
                </Button>

                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-xl font-semibold mb-1">
                    {selectedImage.title}
                  </h3>
                  <Badge variant="secondary">{selectedImage.category}</Badge>
                </div>
              </div>
            )}

            <Button
              variant="ghost"
              size="icon"
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20 z-50"
              onClick={handleNext}
              aria-label="Next image"
            >
              <ChevronRight className="h-8 w-8" />
            </Button>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
}
