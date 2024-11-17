"use client";

import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { LayoutGrid, LayoutList } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

type Author = {
  name: string;
  image: string;
};

type BlogPost = {
  id: number;
  slug: string;
  title: string;
  description: string;
  image: string;
  author: Author;
  date: string;
  readTime: string;
  category: string;
};

// Move this to a separate data file later
const blogPosts: BlogPost[] = [
  {
    id: 1,
    slug: "electrical-safety-guide",
    title: "Essential Guide to Electrical Safety Certificates",
    description:
      "Everything you need to know about electrical safety certificates, their importance, and legal requirements for landlords and homeowners.",
    image: "/blog/electrical-safety.jpg",
    author: {
      name: "John Smith",
      image: "/team/john-smith.jpg",
    },
    date: "March 15, 2024",
    readTime: "5 min read",
    category: "Electrical Safety",
  },
  {
    id: 2,
    slug: "gas-safety-certificates",
    title: "Understanding Gas Safety Certificates",
    description:
      "A comprehensive guide to gas safety certificates, annual inspections, and maintaining gas appliance safety in your property.",
    image: "/blog/gas-safety.jpg",
    author: {
      name: "Sarah Johnson",
      image: "/team/sarah-johnson.jpg",
    },
    date: "March 14, 2024",
    readTime: "6 min read",
    category: "Gas Safety",
  },
];

function BlogCard({ post, view }: { post: BlogPost; view: "grid" | "list" }) {
  return (
    <Link href={`/blog/${post.slug}`} className="group">
      <Card
        className={`h-full overflow-hidden hover:shadow-lg transition-all duration-300 ${
          view === "list" ? "flex md:flex-row flex-col" : "flex flex-col"
        }`}
      >
        <div
          className={`relative ${
            view === "list"
              ? "md:w-80 w-full aspect-video md:aspect-auto"
              : "w-full aspect-video"
          }`}
        >
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover transition-transform group-hover:scale-105"
            sizes={
              view === "list"
                ? "(max-width: 768px) 100vw, 320px"
                : "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            }
          />
          <div className="absolute top-4 left-4 z-10">
            <span className="bg-primary text-white text-xs font-semibold px-2 py-1 rounded">
              {post.category}
            </span>
          </div>
        </div>

        <div className="flex flex-col flex-grow">
          <CardHeader className="p-4 pb-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
              <span>{post.date}</span>
              <span>•</span>
              <span>{post.readTime}</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 group-hover:text-primary transition-colors">
              {post.title}
            </h3>
          </CardHeader>

          <CardContent className="p-4 pt-0 flex-grow">
            <p className="text-muted-foreground line-clamp-3">
              {post.description}
            </p>
          </CardContent>

          <CardFooter className="p-4 border-t bg-muted/10">
            <div className="flex items-center gap-3">
              <Avatar className="h-8 w-8">
                <AvatarImage src={post.author.image} />
                <AvatarFallback>
                  {post.author.name
                    .split(" ")
                    .map((name: string) => name[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <span className="text-sm font-medium">{post.author.name}</span>
            </div>
          </CardFooter>
        </div>
      </Card>
    </Link>
  );
}

export default function BlogItems() {
  const [view, setView] = useState<"grid" | "list">("list");

  return (
    <section className="py-16 bg-background">
      <div className="container max-w-7xl">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-12">
          <div className="mb-6 sm:mb-0">
            <h2 className="text-3xl font-bold tracking-tight">
              Latest Articles
            </h2>
            <p className="mt-2 text-muted-foreground">
              Stay updated with our latest insights and guides
            </p>
          </div>

          <div className="flex items-center gap-2 p-2 bg-background rounded-lg shadow-sm border">
            <Button
              variant={view === "list" ? "default" : "ghost"}
              size="sm"
              onClick={() => setView("list")}
              className="w-10 h-10 p-0"
            >
              <LayoutList className="h-4 w-4" />
              <span className="sr-only">List view</span>
            </Button>
            <Button
              variant={view === "grid" ? "default" : "ghost"}
              size="sm"
              onClick={() => setView("grid")}
              className="w-10 h-10 p-0"
            >
              <LayoutGrid className="h-4 w-4" />
              <span className="sr-only">Grid view</span>
            </Button>
          </div>
        </div>

        <div
          className={`grid gap-8 ${
            view === "list" ? "grid-cols-1" : "sm:grid-cols-2 lg:grid-cols-3"
          }`}
        >
          {blogPosts.map((post) => (
            <BlogCard key={post.id} post={post} view={view} />
          ))}
        </div>
      </div>
    </section>
  );
}
