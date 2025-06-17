"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import * as R from "ramda";

import CustomButton from "@/components/custom/Button";

import { useAppActions } from "@/api/App/tasks";
import { useGlobalContext } from "@/Context/Global";

const LoginMain = () => {
  const { onLogin } = useAppActions();
  const { error } = useGlobalContext();

  console.log("aaaa", error);

  const handleSubmit = (event: any) => {
    event.preventDefault();
    const email = "test@example.com";
    const password = "password123";

    onLogin({ email, password });
  };
  return (
    <Card className="w-[450px]">
      <CardHeader>
        <CardTitle>Login to your account</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>
      {error && (
        <div className="p-4 mx-6 bg-red-800 rounded-md border-red-500 border-1 opacity-50">
          {R.pathOr("Errore generico", ["response", "data", "message"])(error)}
        </div>
      )}
      <CardContent>
        <form>
          <div className="flex flex-col gap-10">
            <div className="grid gap-3">
              <Label htmlFor="email">Email</Label>
              <Input
                // id="email"
                // type="email"
                placeholder="m@example.com"
                // required
              />
            </div>
            <div className="grid gap-3">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <a
                  href="#"
                  className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                >
                  Forgot your password?
                </a>
              </div>
              <Input
                id="password"
                type="password"
                // required
              />
            </div>
            <div className="flex flex-col gap-3">
              <CustomButton
                onClick={handleSubmit}
                type="submit"
                className="w-full"
              >
                Login
              </CustomButton>
              <CustomButton variant="outline" className="w-full">
                Login with Google
              </CustomButton>
            </div>
          </div>
          <div className="mt-8 text-center text-sm">
            Don&apos;t have an account?{" "}
            <a href="#" className="underline underline-offset-4">
              Sign up
            </a>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default LoginMain;
