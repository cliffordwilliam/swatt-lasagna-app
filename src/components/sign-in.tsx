"use client";
import { FunctionComponent } from "react";

interface SignInProps {
  setCookie: (token: string) => Promise<void>;
}

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

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Nama harus minimal 2 karakter.",
  }),
  password: z.string().min(2, {
    message: "Kata sandi harus minimal 2 karakter.",
  }),
});

const SignIn: FunctionComponent<SignInProps> = ({ setCookie }) => {
  const [isLoading, setLoading] = useState(false);

  const { toast } = useToast();

  const route = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  interface LoginResponse {
    access_token: string;
  }

  async function onSubmit(value: z.infer<typeof formSchema>) {
    try {
      setLoading(true);

      const response: AxiosResponse<LoginResponse> = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login`,
        value
      );

      if (response?.data?.access_token) {
        toast({
          title: "Login Berhasil",
          description: "Anda telah berhasil masuk.",
        });
        await setCookie(response?.data?.access_token);
        route.push("/");
      } else {
        throw new Error("Invalid response: access_token is missing");
      }
    } catch (error) {
      toast({
        title: "Login Gagal",
        description:
          "Gagal masuk. Harap periksa kredensial Anda dan coba lagi.",
      });
    } finally {
      setLoading(false);
    }
  }

  if (isLoading) {
    return (
      <>
        <span className="text-xl animate-bounce">Bentar ya...</span>
      </>
    );
  } else {
    return (
      <>
        <Card className="w-full max-w-sm">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <CardHeader>
                <CardTitle className="text-2xl">Masuk</CardTitle>
                <CardDescription>
                  Tolong masukkan nama dan kata sandi.
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4">
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nama</FormLabel>
                      <FormControl>
                        <Input placeholder="yusi" {...field} />
                      </FormControl>
                      <FormDescription>Masukkan nama di sini.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Kata sandi</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="1234" {...field} />
                      </FormControl>
                      <FormDescription>
                        Masukkan kata sandi di sini.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
              <CardFooter>
                <Button className="w-full" type="submit">
                  Masuk
                </Button>
              </CardFooter>
            </form>
          </Form>
        </Card>
      </>
    );
  }
};

export default SignIn;
