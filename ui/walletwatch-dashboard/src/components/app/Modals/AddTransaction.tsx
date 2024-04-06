import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { transactionSchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon, ImageUp, PlusCircle } from "lucide-react";
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
import { DialogClose } from "@radix-ui/react-dialog";
import { ChangeEvent, useEffect, useRef } from "react";
import useTransactionMutation from "@/hooks/useTransactionMutation";
import {
  CATEGORIES,
  CATEGORIES_IDS,
  REMINDERS,
  REMINDERS_IDS,
} from "@/api/api.constants";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { toast } from "@/components/ui/use-toast";
import { uploadTransactionApi } from "@/api";

type AddTransactionProps = {
  title: string;
  refetch?: () => Promise<any>;
};

export function AddTransaction({ title, refetch }: AddTransactionProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const mutation = useTransactionMutation();
  const form = useForm<z.infer<typeof transactionSchema>>({
    resolver: zodResolver(transactionSchema),
    defaultValues: {
      name: "",
      description: "",
      categoryId: 1,
      reminderTypeId: 1,
      enableReminder: 1,
      paymentDate: "",
      price: 0,
    },
  });

  async function onSubmit(values: z.infer<typeof transactionSchema>) {
    mutation.mutate({ type: "Add", request: values });
  }

  async function onFileUpload(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file)
      toast({ variant: "destructive", description: "Image upload failed" });
    const formData = new FormData();
    formData.append("file", file as File);
    await uploadTransactionApi(formData);
    if (refetch) await refetch();
  }

  useEffect(() => {
    mutation.isSuccess && ref?.current?.click();
  }, [mutation.isSuccess]);

  return (
    <div className="flex gap-2">
      <Button>
        <label htmlFor="transaction-file">
          <ImageUp />
        </label>
        <input
          id="transaction-file"
          type="file"
          className="hidden"
          accept=".png,.jpg,.jpeg"
          onChange={onFileUpload}
        />
      </Button>
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
                name="categoryId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <Select
                      onValueChange={(value) => {
                        field.onChange(CATEGORIES_IDS[value]);
                      }}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {Object.values(CATEGORIES).map((category, i) => (
                          <SelectItem key={`category-${i}`} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="reminderTypeId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Reminder</FormLabel>
                    <Select
                      onValueChange={(value) => {
                        field.onChange(REMINDERS_IDS[value]);
                      }}
                      defaultValue={REMINDERS.NO_REMINDER}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a Reminder type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {Object.values(REMINDERS).map((reminder, i) => (
                          <SelectItem key={`reminder-${i}`} value={reminder}>
                            {reminder}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="paymentDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Payment Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "y-MM-dd")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={new Date(field.value)}
                          onSelect={(date) => {
                            date && field.onChange(format(date, "y-MM-dd"));
                            form.setFocus("price");
                          }}
                          disabled={(date) =>
                            date > new Date() || date < new Date("1900-01-01")
                          }
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price</FormLabel>
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
    </div>
  );
}
