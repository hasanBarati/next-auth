"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  Form,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { RegisterUser } from "./action";

const foromSchema = z.object({
  email: z.string().email(),
  password: z.string().min(5),
  passwordConfirm: z.string(),
});

export default function Register() {
  const form = useForm<z.infer<typeof foromSchema>>({
    resolver: zodResolver(foromSchema),
    defaultValues: {
      email: "",
      password: "",
      passwordConfirm: "",
    },
  });
  const handleSubmit = async (data: z.infer<typeof foromSchema>) => {
    console.log(data.email);
    const response = await RegisterUser({
      email: data.email,
      password: data.password,
      passwordConfirm: data.passwordConfirm,
    });
    if (response?.error) {
      form.setError("email", { message: response?.message });
    }
    console.log(response);
  };
  return (
    <main className="flex justify-center item-center ">
      {form.formState.isSubmitSuccessful ? (
        <div>Your account has been created</div>
      ) : (
        <Card className="w-[350px] ">
          <CardHeader>
            <CardTitle>Register</CardTitle>
            <CardDescription>register for new account</CardDescription>
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
                  <FormField
                    control={form.control}
                    name="passwordConfirm"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>passwordConfirm</FormLabel>
                        <FormControl>
                          <Input {...field} type={"passwordConfirm"} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  ></FormField>
                  <Button type="submit">Register</Button>
                </fieldset>
              </form>
            </Form>
          </CardContent>
        </Card>
      )}
    </main>
  );
}
