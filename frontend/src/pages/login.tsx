import LoginForm from "@/components/auth/login-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Login() {
  return (
    <section className="h-screen flex justify-center items-center">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Login your Account</CardTitle>
          <CardDescription>Fill up your account details</CardDescription>
        </CardHeader>
        <CardContent>
          <LoginForm />
        </CardContent>
      </Card>
    </section>
  );
}
