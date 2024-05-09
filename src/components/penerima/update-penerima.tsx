"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosResponse } from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface UpdatePenerimaProps {
  data: {
    id: string;
    nama: string;
    alamat: string;
    noHp: string;
    createdAt: string;
    updatedAt: string;
  };
  getToken: () => Promise<string>;
}

const phoneRegex = /^08[0-9]{8,11}$/;

const formSchema = z.object({
  nama: z.string().min(2, {
    message: "Nama harus minimal 2 karakter.",
  }),
  alamat: z.string().min(2, {
    message: "Alamat harus minimal 2 karakter.",
  }),
  noHp: z.string().refine((value) => phoneRegex.test(value), {
    message: "Nomor HP harus berformat Indonesia yang valid.",
  }),
});

const UpdatePenerima = ({ data, getToken }: UpdatePenerimaProps) => {
  const [isLoading, setLoading] = useState(false);
  const { toast } = useToast();
  const route = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nama: data.nama,
      alamat: data.alamat,
      noHp: data.noHp,
    },
  });

  interface CreatePenerimaResponse {
    id: string;
    nama: string;
    alamat: string;
    noHp: string;
    createdAt: string;
    updatedAt: string;
  }

  async function onSubmit(value: z.infer<typeof formSchema>) {
    try {
      setLoading(true);

      const token = await getToken();

      const response: AxiosResponse<CreatePenerimaResponse> = await axios.patch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/penerimas/${data.id}`,
        value,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response?.data) {
        toast({
          title: "Penerima Berhasil",
          description: "Anda telah berhasil mengubah penerima.",
        });
        route.refresh();
      } else {
        throw new Error("Invalid response: data is missing");
      }
    } catch (error) {
      toast({
        title: "Penerima Gagal",
        description:
          "Gagal mengubah penerima. Harap periksa kredensial Anda dan coba lagi.",
      });
    } finally {
      setLoading(false);
    }
  }
  return (
    <>
      <Card className="w-full">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardHeader>
              <CardTitle className="text-2xl">Ubah Penerima</CardTitle>
              <CardDescription>
                Tolong masukan nama, alamat dan nomor telepon.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <FormField
                control={form.control}
                name="nama"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nama</FormLabel>
                    <FormControl>
                      <Input placeholder="yusi" {...field} />
                    </FormControl>
                    <FormDescription>Masukan nama di sini.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="alamat"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Alamat</FormLabel>
                    <FormControl>
                      <Input placeholder="Jl.Hegar Asih" {...field} />
                    </FormControl>
                    <FormDescription>Masukan alamat di sini.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="noHp"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nomor Telepon</FormLabel>
                    <FormControl>
                      <Input placeholder="081313" {...field} />
                    </FormControl>
                    <FormDescription>
                      Masukan nomor telepon di sini.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter>
              <Button className="w-full" type="submit" disabled={isLoading}>
                Kirim
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </>
  );
};

export default UpdatePenerima;
