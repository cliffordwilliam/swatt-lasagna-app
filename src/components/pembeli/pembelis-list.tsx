"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
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
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Skeleton } from "../ui/skeleton";
import { useToast } from "../ui/use-toast";

import { FunctionComponent, useEffect, useState } from "react";

import axios from "axios";

import { useRouter } from "next/navigation";

import useDebounce from "@/hooks/use-debounce";

interface PembelisListProps {
  getToken: () => Promise<string>;
  isOrderMode?: boolean;
  onPilihClicked?: (pembeli: Pembeli) => void;
}

export interface Pembeli {
  id: string;
  nama: string;
  alamat: string;
  noHp: number;
  createdAt: string;
  updatedAt: string;
}

const PembelisList: FunctionComponent<PembelisListProps> = ({
  getToken,
  isOrderMode = false,
  onPilihClicked,
}) => {
  const [isLoading, setLoading] = useState(false);
  const [pembelis, setPembelis] = useState([] as Pembeli[]);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [page, setPage] = useState(1);
  const [orderValue, setOrderValue] = useState("desc");
  const [orderKey, setOrderKey] = useState("nama");
  const [searchKey, setSearchKey] = useState("nama");
  const [searchString, setSearchString] = useState("");
  const [perPage, setPerPage] = useState(10);
  const [total, setTotal] = useState(10);

  const { toast } = useToast();
  const router = useRouter();
  const debouncedsearchString = useDebounce(searchString);

  useEffect(() => {
    const getPembelis = async () => {
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
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/pembelis`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            params: queryParams,
          }
        );

        if (response?.data) {
          const pembeli: Pembeli[] = response.data.data;
          setPembelis(pembeli);
          setCurrentPage(response.data.meta.currentPage);
          setLastPage(response.data.meta.lastPage);
          setTotal(response.data.meta.total);
        } else {
          throw new Error("Invalid response: data is missing");
        }
      } catch (error) {
        toast({
          title: "Pembelis Gagal",
          description:
            "Gagal mengambil pembelis. Harap periksa kredensial Anda dan coba lagi.",
        });
        router.push("/sign-in");
      } finally {
        setLoading(false);
      }
    };
    getPembelis();
  }, [
    debouncedsearchString,
    page,
    orderValue,
    orderKey,
    searchKey,
    perPage,
    getToken,
    router,
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

  const handleEdit = (value: string) => {
    router.push(`/pembelis/${value}`);
  };

  const handleDelete = async (value: string) => {
    try {
      setLoading(true);

      const token = await getToken();

      const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/pembelis/${value}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response?.data) {
        toast({
          title: "Pembeli Berhasil",
          description: "Anda telah berhasil menghapus pembeli.",
        });

        const getPembelis = async () => {
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
              `${process.env.NEXT_PUBLIC_BACKEND_URL}/pembelis`,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
                params: queryParams,
              }
            );

            if (response?.data) {
              const pembeli: Pembeli[] = response.data.data;
              setPembelis(pembeli);
              setCurrentPage(response.data.meta.currentPage);
              setLastPage(response.data.meta.lastPage);
              setTotal(response.data.meta.total);
            } else {
              throw new Error("Invalid response: data is missing");
            }
          } catch (error) {
            toast({
              title: "Pembelis Gagal",
              description:
                "Gagal mengambil pembelis. Harap periksa kredensial Anda dan coba lagi.",
            });
            router.push("/sign-in");
          } finally {
            setLoading(false);
          }
        };
        getPembelis();
      } else {
        throw new Error("Invalid response: data is missing");
      }
    } catch (error) {
      toast({
        title: "Pembeli Gagal",
        description:
          "Gagal menghapus pembeli. Harap periksa kredensial Anda dan coba lagi.",
      });
      router.push("/sign-in");
    } finally {
      setLoading(false);
    }
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
            <SelectItem value="alamat">Alamat</SelectItem>
            <SelectItem value="noHp">Nomor Telepon</SelectItem>
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
            <SelectItem value="alamat">Alamat</SelectItem>
            <SelectItem value="noHp">Nomor Telepon</SelectItem>
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

  const renderActionButtons = (pembeli: Pembeli) => {
    if (isOrderMode) {
      return (
        <CardFooter className="flex gap-2">
          {onPilihClicked && (
            <Button
              onClick={() => {
                onPilihClicked(pembeli);
              }}
            >
              Pilih
            </Button>
          )}
        </CardFooter>
      );
    } else {
      return (
        <CardFooter className="flex gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="destructive">Hapus</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Yakin mau menghapus pembeli?</DialogTitle>
                <DialogDescription>
                  Sekali di hapus pembeli ini akan hilang selamanya.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button
                  variant="destructive"
                  type="submit"
                  onClick={(e) => {
                    e.preventDefault();
                    handleDelete(pembeli.id);
                  }}
                >
                  Hapus
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <Button
            onClick={(e) => {
              e.preventDefault();
              handleEdit(pembeli.id);
            }}
          >
            Ubah
          </Button>
        </CardFooter>
      );
    }
  };

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

  if (pembelis && pembelis.length !== 0) {
    return (
      <>
        {renderTopInputs()}
        <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-4 p-4">
          {pembelis.map((pembeli) => (
            <Card key={pembeli.id}>
              <CardHeader className="space-y-2 p-6">
                <CardTitle>{pembeli.nama}</CardTitle>
                <CardDescription>{pembeli.alamat}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 border-t px-6 py-8">
                <div className="text-4xl font-bold">{pembeli.noHp}</div>
              </CardContent>
              {renderActionButtons(pembeli)}
            </Card>
          ))}
        </div>
        {renderBottomInputs()}
      </>
    );
  }

  if (pembelis && pembelis.length === 0) {
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
              <div className="text-4xl font-bold">Tidak ada hasil</div>
            </CardContent>
            <CardFooter className="flex gap-2">
              <Button disabled={true}>Hapus</Button>
              <Button disabled={true}>Ubah</Button>
            </CardFooter>
          </Card>
        </div>
        {renderBottomInputs()}
      </>
    );
  }
};

export default PembelisList;
