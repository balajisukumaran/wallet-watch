import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";

import { ROUTES } from "@/routes/constants";
import { signupSchema } from "@/lib/schema";

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
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { PhoneInput } from "@/components/ui/phone-input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

export function Signup() {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const form = useForm<z.infer<typeof signupSchema>>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      userName: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof signupSchema>) {
    console.log(values);
  }

  return (
    <div className="container min-h-dvh px-3 grid place-items-center my-2 md:my-8">
      <Card className="w-full md:w-[350px]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <CardHeader className="pb-0">
              <CardTitle>Signup</CardTitle>
              <CardDescription>
                Already have an account ?{" "}
                <Link to={ROUTES.LOGIN}>
                  <Button className="m-0 p-0" variant={"link"}>
                    Login
                  </Button>
                </Link>
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col space-y-4">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your first name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your last name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone</FormLabel>
                    <FormControl>
                      <PhoneInput
                        placeholder="Enter your phone number"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="Enter your email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="userName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your username" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription className="flex items-center gap-2 p-2">
                      <Checkbox
                        id="showPass"
                        className="rounded"
                        checked={showPassword}
                        onCheckedChange={(value: boolean) =>
                          setShowPassword(value)
                        }
                      />
                      <Label htmlFor="showPass">show password</Label>
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter>
              <Button className="w-full" type="submit">
                Submit
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  );
}
