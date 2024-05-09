"use client";

import { FunctionComponent } from "react";
import { useState } from "react";
import axios, { AxiosResponse } from "axios";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
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

interface CreatePembeliProps {
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

const CreatePembeli: FunctionComponent<CreatePembeliProps> = ({ getToken }) => {
  const [isLoading, setLoading] = useState(false);
  const { toast } = useToast();
  const route = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nama: "",
      alamat: "",
      noHp: "",
    },
  });

  interface CreatePembeliResponse {
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

      const response: AxiosResponse<CreatePembeliResponse> = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/pembelis`,
        value,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response?.data) {
        toast({
          title: "Pembeli Berhasil",
          description: "Anda telah berhasil menambah pembeli.",
        });
        route.push("/pembelis");
      } else {
        throw new Error("Invalid response: data is missing");
      }
    } catch (error) {
      toast({
        title: "Pembeli Gagal",
        description:
          "Gagal menambah pembeli. Harap periksa kredensial Anda dan coba lagi.",
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
              <CardTitle className="text-2xl">Tambah Pembeli</CardTitle>
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

export default CreatePembeli;
