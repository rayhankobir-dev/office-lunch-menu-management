import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import React from "react";
import { Eye, EyeOff, LockKeyhole, Mail } from "lucide-react";
import { useForm, SubmitHandler, useFormState } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Spinner from "@/components/ui/spinner";
import { ILoginCredential } from "@/types";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import { api } from "@/api";

const loginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

export default function LoginForm() {
  const [passwordVisible, setPasswordVisible] = React.useState<boolean>(false);

  const loginForm = useForm<ILoginCredential>({
    mode: "onTouched",
    resolver: yupResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { isSubmitting } = useFormState({
    control: loginForm.control,
  });

  const onSubmit: SubmitHandler<ILoginCredential> = async (payload) => {
    try {
      const response = await api.post("/user/login", payload);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Form {...loginForm}>
      <form
        onSubmit={loginForm.handleSubmit(onSubmit)}
        className="w-full h-fit space-y-5 transition-all duration-500"
      >
        <div className="space-y-2.5">
          <FormField
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                    <Input
                      {...field}
                      id="email"
                      type="email"
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

          <FormField
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="relative group">
                    <LockKeyhole className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                    <Input
                      {...field}
                      id="password"
                      type={passwordVisible ? "text" : "password"}
                      placeholder="Password"
                      className="pl-10 h-11 rounded-lg"
                    />
                    <button
                      type="button"
                      className="absolute right-2 top-3 z-10 h-5 w-5 hover:cursor-pointer text-gray-400 group-hover:text-gray-700 duration-300"
                      onClick={() => setPasswordVisible(!passwordVisible)}
                    >
                      {passwordVisible ? (
                        <Eye size={20} />
                      ) : (
                        <EyeOff size={20} />
                      )}
                    </button>
                  </div>
                </FormControl>
                <FormMessage className="font-light px-1 text-rose-500" />
              </FormItem>
            )}
          />
        </div>

        <Button
          variant="default"
          type="submit"
          disabled={isSubmitting}
          className="w-full h-11 border rounded-lg"
        >
          {isSubmitting ? <Spinner /> : "Login"}
        </Button>

        <p className="font-light text-sm">
          Have you lost your password?{" "}
          <Link to="/forget-password" className="font-medium">
            Forget password
          </Link>
        </p>
      </form>
    </Form>
  );
}
