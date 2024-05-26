/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MdOutlineRestaurantMenu } from "react-icons/md";
import { Input } from "../ui/input";
import { api } from "@/api";
import toast from "react-hot-toast";
import { sleep } from "@/lib/utils";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "@/components/ui/button";
import Spinner from "@/components/ui/spinner";
import { IMenuFormData } from "@/types";
import * as Yup from "yup";
import React from "react";

const loginSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Item name must be grater than 2 characters.")
    .max(60, "Item name must be less than 60 characters.")
    .required("Item name is required"),
  unit: Yup.string().required("Unit is required"),
});

export default function MenuForm() {
  const [isSubmitting, setIsSubmitting] = React.useState<boolean>(false);

  const menuForm = useForm<IMenuFormData>({
    mode: "onTouched",
    resolver: yupResolver(loginSchema),
    defaultValues: {
      name: "",
      unit: "",
    },
  });
  const onSubmit: SubmitHandler<IMenuFormData> = async (payload) => {
    setIsSubmitting(true);
    try {
      await sleep(500);
      const response = await api.post("/user/login", payload);
      toast.success(response.data.message);
    } catch (error: any) {
      const errorMessage =
        error?.response?.data?.message || "An error occurred";
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle>Create new menu</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...menuForm}>
          <form
            onSubmit={menuForm.handleSubmit(onSubmit)}
            className="flex flex-col md:flex-row gap-2"
          >
            <div className="w-full grid md:grid-cols-2 gap-2">
              <FormField
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="relative">
                        <MdOutlineRestaurantMenu className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                        <Input
                          {...field}
                          id="name"
                          type="text"
                          autoComplete="true"
                          placeholder="Item name"
                          className="pl-10 h-11 rounded-lg"
                        />
                      </div>
                    </FormControl>
                    <FormMessage className="font-light px-1 text-rose-500" />
                  </FormItem>
                )}
              />

              <div>
                <FormField
                  name="unit"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="relative">
                          <MdOutlineRestaurantMenu className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                          <Input
                            {...field}
                            id="unit"
                            type="text"
                            autoComplete="true"
                            placeholder="Unit e.g 1pice, half"
                            className="pl-10 h-11 rounded-lg"
                          />
                        </div>
                      </FormControl>
                      <FormMessage className="font-light px-1 text-rose-500" />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <Button
              variant="default"
              type="submit"
              disabled={isSubmitting}
              className="w-full md:flex-1 h-11 px-6 border rounded-lg"
            >
              {isSubmitting ? <Spinner /> : "Create"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
