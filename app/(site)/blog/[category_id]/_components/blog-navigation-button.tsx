import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { NavLeafItem } from "@/types/misc";

interface BlogNavigationButtonProps {
  blog: NavLeafItem | null;
  direction: 'prev' | 'next';
}

export function BlogNavigationButton({ blog, direction }: BlogNavigationButtonProps) {
  if (!blog) return null;

  return (
    <Link 
      href={`/blog${blog.path}`}
      className={`flex items-center ${direction === 'next' ? 'justify-end' : 'justify-start'}`}
    >
      <Button 
        variant="outline" 
        className="group hover:bg-primary hover:text-white transition-all"
      >
        {direction === 'prev' && (
          <ChevronLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
        )}
        <span className="max-w-[150px] truncate">{blog.label}</span>
        {direction === 'next' && (
          <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
        )}
      </Button>
    </Link>
  );
}