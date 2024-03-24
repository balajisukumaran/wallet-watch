import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { incomeSchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { PlusCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import useIncomeMutation from "@/hooks/useIncomeMutation";
import { DialogClose } from "@radix-ui/react-dialog";
import { useEffect, useRef } from "react";

type AddIncomeProps = {
  title: string;
};

export function AddIncome({ title }: AddIncomeProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const mutation = useIncomeMutation();
  const form = useForm<z.infer<typeof incomeSchema>>({
    resolver: zodResolver(incomeSchema),
    defaultValues: {
      name: "",
      description: "",
      value: 0,
    },
  });

  async function onSubmit(values: z.infer<typeof incomeSchema>) {
    mutation.mutate({ type: "Add", request: values });
  }

  useEffect(() => {
    mutation.isSuccess && ref?.current?.click();
  }, [mutation.isSuccess]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="ml-auto px-2 py-0">
          New <PlusCircle className="ml-2" />
        </Button>
      </DialogTrigger>
      <DialogContent
        className="sm:max-w-[425px]"
        onPointerDownOutside={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="value"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Value</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      onChange={(e) => {
                        let value = Number(e?.target?.value);
                        field.onChange(value >= 0 ? value : 0);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="w-full" type="submit">
              Submit
            </Button>
            <DialogClose asChild>
              <Button ref={ref} className="hidden"></Button>
            </DialogClose>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
