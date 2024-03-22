import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";

import { ROUTES } from "@/routes/constants";
import { loginSchema } from "@/lib/schema";

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
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import { Label } from "@/components/ui/label";

export function Login() {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      userName: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof loginSchema>) {
    console.log(values);
  }

  return (
    <div className="container h-dvh px-3 grid place-items-center">
      <Card className="w-full md:w-[350px]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <CardHeader className="pb-0">
              <CardTitle>Login</CardTitle>
              <CardDescription>
                Don't have an account ?{" "}
                <Link to={ROUTES.SIGNUP}>
                  <Button className="m-0 p-0" variant={"link"}>
                    Sign up
                  </Button>
                </Link>{" "}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col space-y-4">
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
