"use client";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import useQueryString from "@/hooks/use-query-string";
import { useEffect, useState } from "react";
import { useDebounce } from "@/hooks/use-debounce";
import { SERVICE_TYPE_OPTIONS } from "@/lib/constants";
import { kebabToNormal } from "@/lib/utils";
import { HandPlatter } from "lucide-react";

export default function ServiceTableHeader() {
  const router = useRouter();
  const { createQueryString } = useQueryString();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const initialSearchValue = searchParams.get("search") ?? ""; 
  const filterStatus = searchParams.get("filter_status") ?? "";

  const [searchValue, setSearchValue] = useState(initialSearchValue);
  const debouncedSearchValue = useDebounce(searchValue, 300); // 300ms delay

  useEffect(() => {
    router.push(
      `${pathname}?${createQueryString({
        search: debouncedSearchValue,
      })}`
    );
  }, [debouncedSearchValue, pathname, router, createQueryString]);

  return (
    <>
      <div className="flex items-center gap-4 mb-5 mt-7">
        <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0 flex items-center">
        <HandPlatter className="mr-3 text-primary" />         
          Service List
        </h1>

        <div className="hidden items-center gap-2 md:ml-auto md:flex">
          <Button variant="outline" size="sm">
            Download Excel
          </Button>
          <Link href="services/new">
            <Button size="sm" className="whitespace-nowrap">
              Add New Service
            </Button>
          </Link>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 w-full sm:w-auto mb-5">
        <Input
          type="search"
          placeholder="Search services..."
          className="w-full sm:w-auto flex-1"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
       
          

        <Select
          value={filterStatus}
          onValueChange={(value) => {
            if (value) {
              router.push(
                `${pathname}?${createQueryString({
                  filter_status: value !== "ALL" ? value : "",
                })}`
              );
            }
          }}
        >
          <SelectTrigger className="w-full sm:w-auto">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">ALL</SelectItem>
            {SERVICE_TYPE_OPTIONS.map((option) => (
              <SelectItem value={option} key={option}>
                {kebabToNormal(option)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </>
  );
}
