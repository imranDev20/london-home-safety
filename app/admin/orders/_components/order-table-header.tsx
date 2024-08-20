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
import { ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import useQueryString from "@/hooks/use-query-string";
import { useEffect, useState, useTransition } from "react";
import { useDebounce } from "@/hooks/use-debounce";
import { ORDER_STATUS_OPTIONS } from "@/lib/constants";
import { kebabToNormal } from "@/lib/utils";
import dayjs from "dayjs";
import { getExportOrders } from "../actions";
import { toast } from "@/components/ui/use-toast";
import { LoadingButton } from "@/components/ui/loading-button";

export default function OrderTableHeader() {
  const router = useRouter();
  const { createQueryString } = useQueryString();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const initialSearchValue = searchParams.get("search") ?? "";
  const sortBy = searchParams.get("sort_by") ?? "";
  const sortOrder = searchParams.get("sort_order") ?? "";
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

  const handleExportOrders = async () => {
    startTransition(async () => {
      const result = await getExportOrders();
      if (result.success) {
        // Handle successful deletion (e.g., show a success message, update UI)
        const excelData = result.data as string;
        const byteArray = new Uint8Array(
          atob(excelData)
            .split("")
            .map((char) => char.charCodeAt(0))
        );
        const blob = new Blob([byteArray], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });
        const downloadUrl = window.URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.href = downloadUrl;
        link.setAttribute(
          "download",
          `Orders - ${dayjs().format("YYYY-MM-DD@hh:mm:ss")}.xlsx`
        );
        document.body.appendChild(link);
        link.click();
        link.remove();
        toast({
          title: "Orders  Downloaded",
          description: result.message,
          variant: "success",
        });      
      } else {
        toast({
          title: "Orders download failed",
          description: result.message,
          variant: "destructive",
        });
        console.error(result.message);
      }
    });
  };

  return (
    <>
      <div className="flex items-center gap-4 mb-5 mt-7">
        <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0 flex items-center">
          <ShoppingBag className="mr-3 text-primary" />
          Order List
        </h1>

        <div className="hidden items-center gap-2 md:ml-auto md:flex">
          <LoadingButton
            type="button"
            disabled={isPending}
            size="sm"
            loading={isPending}
            className="text-xs font-semibold h-8"
            onClick={handleExportOrders}
            variant="outline"
          >
            Download Excel
          </LoadingButton>
          <Link href="orders/new">
            <Button size="sm" className="whitespace-nowrap">
              Add New Order
            </Button>
          </Link>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 w-full sm:w-auto mb-5">
        <Input
          type="search"
          placeholder="Search orders..."
          className="w-full sm:w-auto flex-1"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <Select
          value={sortBy}
          onValueChange={(value) => {
            if (value) {
              router.push(
                `${pathname}?${createQueryString({
                  sort_by: value,
                })}`
              );
            }
          }}
        >
          <SelectTrigger className="w-full sm:w-auto">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="name">Name</SelectItem>
            <SelectItem value="price">Cost</SelectItem>
            <SelectItem value="email">Email</SelectItem>
            <SelectItem value="createdAt">Created At</SelectItem>
          </SelectContent>
        </Select>

        <Select
          value={sortOrder}
          onValueChange={(value) => {
            if (value) {
              router.push(
                `${pathname}?${createQueryString({
                  sort_order: value,
                })}`
              );
            }
          }}
        >
          <SelectTrigger className="w-full sm:w-auto">
            <SelectValue placeholder="Sort Order" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="desc">Desc</SelectItem>
            <SelectItem value="asc">Asc</SelectItem>
          </SelectContent>
        </Select>

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
            {ORDER_STATUS_OPTIONS.map((option) => (
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
