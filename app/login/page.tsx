"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import {  useForm } from "react-hook-form";
import { z } from "zod";
import { loginWithcredential } from "./action";

const foromSchema = z.object({
    email: z.string().email(),
    password: z.string().min(5),

  });

export default function Login() {


    const form = useForm<z.infer<typeof foromSchema>>({
        resolver: zodResolver(foromSchema),
        defaultValues: {
          email: "",
          password: "",
     
        },
      });
      const handleSubmit = async (data: z.infer<typeof foromSchema>) => {
        console.log(data.email);
        await loginWithcredential({
            email:data.email,
            password:data.password
        })
      };

  return (
    <main className="flex justify-center item-center ">
      <Card className="w-[350px] ">
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>create your new account</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)}>
              <fieldset
                className="flex flex-col gap-4"
                disabled={form.formState.isSubmitting}
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input {...field} type={"email"} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                ></FormField>
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>password</FormLabel>
                      <FormControl>
                        <Input {...field} type={"password"} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                ></FormField>
         
                <Button type="submit">Login</Button>
              </fieldset>
            </form>
          </Form>
        </CardContent>
      </Card>
    </main>
  );
}
