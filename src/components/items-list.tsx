"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Skeleton } from "./ui/skeleton";
import { useToast } from "./ui/use-toast";

import { FunctionComponent, useEffect, useState } from "react";

import { formatIDR } from "@/lib/utils";

import axios from "axios";

import { useRouter } from "next/navigation";

import useDebounce from "@/hooks/use-debounce";

interface ItemsListProps {
  getToken: () => Promise<string>;
}

interface Item {
  id: string;
  nama: string;
  tipe: string;
  harga: number;
  createdAt: string;
  updatedAt: string;
}

const ItemsList: FunctionComponent<ItemsListProps> = ({ getToken }) => {
  const [isLoading, setLoading] = useState(false);
  const [items, setItems] = useState([] as Item[]);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [page, setPage] = useState(1);
  const [orderValue, setOrderValue] = useState("desc");
  const [orderKey, setOrderKey] = useState("harga");
  const [searchKey, setSearchKey] = useState("nama");
  const [searchString, setSearchString] = useState("");
  const [perPage, setPerPage] = useState(10);
  const [total, setTotal] = useState(10);

  const { toast } = useToast();
  const router = useRouter();
  const debouncedsearchString = useDebounce(searchString);

  useEffect(() => {
    const getItems = async () => {
      try {
        setLoading(true);

        const token = await getToken();

        const queryParams: any = {
          page: page,
          perPage: perPage,
        };

        if (orderKey && orderValue) {
          queryParams.orderBy = { [orderKey]: orderValue };
        }

        if (searchKey && searchString) {
          queryParams.where = { [searchKey]: searchString };
        }

        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/items`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            params: queryParams,
          }
        );

        if (response?.data) {
          const item: Item[] = response.data.data;
          setItems(item);
          setCurrentPage(response.data.meta.currentPage);
          setLastPage(response.data.meta.lastPage);
          setTotal(response.data.meta.total);
        } else {
          throw new Error("Invalid response: data is missing");
        }
      } catch (error) {
        toast({
          title: "Items Gagal",
          description:
            "Gagal mengambil items. Harap periksa kredensial Anda dan coba lagi.",
        });
        router.push("/sign-in");
      } finally {
        setLoading(false);
      }
    };
    getItems();
  }, [
    debouncedsearchString,
    page,
    orderValue,
    orderKey,
    searchKey,
    perPage,
    getToken,
    router,
    searchString,
    toast,
  ]);

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleNextPage = () => {
    if (page < lastPage) {
      setPage(page + 1);
    }
  };

  const handleOrderValueValueChange = (value: string) => {
    setOrderValue(value);
  };

  const handleOrderKeyValueChange = (value: string) => {
    setOrderKey(value);
  };

  const handleSearchKeyValueChange = (value: string) => {
    setSearchKey(value);
  };

  const renderTopInputs = () => (
    <>
      <div className="p-4 pb-0">
        <Select onValueChange={handleSearchKeyValueChange}>
          <SelectTrigger>
            <SelectValue placeholder="Cari bedasarkan apa?" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="id">Id</SelectItem>
            <SelectItem value="nama">Nama</SelectItem>
            <SelectItem value="tipe">Tipe</SelectItem>
            <SelectItem value="harga">Harga</SelectItem>
            <SelectItem value="createdAt">Kapan di buat</SelectItem>
            <SelectItem value="updatedAt">Kapan di update</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="p-4 pb-0">
        <Input
          onChange={(e) => setSearchString(e.target.value)}
          value={searchString ?? "Cari di sini"}
          placeholder="Ketik untuk cari"
        />
      </div>
      <div className="p-4 pb-0">
        <Select onValueChange={handleOrderKeyValueChange}>
          <SelectTrigger>
            <SelectValue placeholder="Urut bedasarkan apa?" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="id">Id</SelectItem>
            <SelectItem value="nama">Nama</SelectItem>
            <SelectItem value="tipe">Tipe</SelectItem>
            <SelectItem value="harga">Harga</SelectItem>
            <SelectItem value="createdAt">Kapan di buat</SelectItem>
            <SelectItem value="updatedAt">Kapan di update</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="p-4 pb-0">
        <Select onValueChange={handleOrderValueValueChange}>
          <SelectTrigger>
            <SelectValue placeholder="Urut naik atau turun?" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="asc">Naik</SelectItem>
            <SelectItem value="desc">Turun</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="p-4 pb-0 grid items-center gap-1.5">
        <Label htmlFor="perPage">Hasil per halaman</Label>
        <Input
          type="number"
          onChange={(e) => {
            setPerPage(Math.min(Math.max(+e.target.value, 1), total));
          }}
          value={perPage}
          id="perPage"
        />
      </div>
    </>
  );

  const renderBottomInputs = () => (
    <>
      <div className="p-4 pb-0 flex justify-center items-center gap-2">
        <Button
          variant="ghost"
          onClick={handlePreviousPage}
          disabled={page === 1}
        >
          Sebelum
        </Button>
        <span>
          {currentPage} / {lastPage}
        </span>
        <Button
          variant="ghost"
          onClick={handleNextPage}
          disabled={page === lastPage}
        >
          Berikut
        </Button>
      </div>
    </>
  );

  if (isLoading) {
    return (
      <>
        {renderTopInputs()}
        <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-4 p-4">
          {[...Array(perPage)].map((_, index) => (
            <Card key={index}>
              <CardHeader className="space-y-2 p-6">
                <Skeleton className="h-6 w-[200px]" />
                <Skeleton className="h-5 w-[150px]" />
              </CardHeader>
              <CardContent className="space-y-4 border-t px-6 py-8">
                <Skeleton className="h-10 w-[150px]" />
              </CardContent>
            </Card>
          ))}
        </div>
        {renderBottomInputs()}
      </>
    );
  }

  if (items && items.length !== 0) {
    return (
      <>
        {renderTopInputs()}
        <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-4 p-4">
          {items.map((item) => (
            <Card key={item.id}>
              <CardHeader className="space-y-2 p-6">
                <CardTitle>{item.nama}</CardTitle>
                <CardDescription>{item.tipe}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 border-t px-6 py-8">
                <div className="text-4xl font-bold">
                  {formatIDR(item.harga)}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        {renderBottomInputs()}
      </>
    );
  }

  if (items && items.length === 0) {
    return (
      <>
        {renderTopInputs()}
        <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-4 p-4">
          <Card>
            <CardHeader className="space-y-2 p-6">
              <CardTitle>Tidak ada hasil</CardTitle>
              <CardDescription>Tidak ada hasil</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 border-t px-6 py-8">
              <div className="text-4xl font-bold">{formatIDR(0)}</div>
            </CardContent>
          </Card>
        </div>
        {renderBottomInputs()}
      </>
    );
  }
};

export default ItemsList;
