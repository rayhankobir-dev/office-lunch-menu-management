import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "../ui/input";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "@/components/ui/button";
import Spinner from "@/components/ui/spinner";
import { IUserFormData } from "@/types";
import * as Yup from "yup";
import React from "react";
import useUser from "@/hooks/useUser";
import { LockKeyhole, Mail, User } from "lucide-react";

const loginSchema = Yup.object().shape({
  full_name: Yup.string()
    .min(2, "Full name must be grater than 2 characters.")
    .max(60, "Full name must be less than 60 characters.")
    .required("Full name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string().required("Email is required"),
  role: Yup.string().required("Password is required"),
});

export default function UserForm() {
  const [isSubmitting, setIsSubmitting] = React.useState<boolean>(false);
  const { addUser } = useUser();
  const menuForm = useForm<IUserFormData>({
    mode: "onTouched",
    resolver: yupResolver(loginSchema),
    defaultValues: {
      full_name: "",
      email: "",
      password: "",
      role: "employee",
    },
  });
  const onSubmit: SubmitHandler<IUserFormData> = async (payload) => {
    setIsSubmitting(true);
    await addUser(payload);
    setIsSubmitting(false);
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle>Create new user</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...menuForm}>
          <form
            onSubmit={menuForm.handleSubmit(onSubmit)}
            className="flex flex-col md:flex-row gap-2"
          >
            <div className="w-full grid md:grid-cols-2 gap-2">
              <FormField
                name="full_name"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="relative">
                        <User className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                        <Input
                          {...field}
                          id="full_name"
                          type="text"
                          autoComplete="true"
                          placeholder="Full name"
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
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="relative">
                          <Mail className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                          <Input
                            {...field}
                            id="unit"
                            type="text"
                            autoComplete="true"
                            placeholder="Email address"
                            className="pl-10 h-11 rounded-lg"
                          />
                        </div>
                      </FormControl>
                      <FormMessage className="font-light px-1 text-rose-500" />
                    </FormItem>
                  )}
                />
              </div>
              <div>
                <FormField
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="relative">
                          <LockKeyhole className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                          <Input
                            {...field}
                            id="password"
                            type="password"
                            autoComplete="true"
                            placeholder="Password"
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
              className="w-full min-w-[6rem] md:flex-1 h-11 px-6 border rounded-lg"
            >
              {isSubmitting ? <Spinner textHidden={true} /> : "Create"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
