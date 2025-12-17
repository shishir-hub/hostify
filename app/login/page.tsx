"use client";

import "./Login.scss";
import Link from "next/link";
import Image from "next/image";

import InputField from "@/components/UserForm/InputField/InputField";
import Button from "@/components/Button/Button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/lib/validator";
import z from "zod";
import { Suspense, useState } from "react";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { useUserStore } from "@/store/userStore";
import { useAlertStore } from "@/store/alertStore";

type LoginData = z.infer<typeof loginSchema>;

type Error = {
  state: boolean;
  message: string;
};

const Login = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const redirect = searchParams.get("redirect") || "/";

  const setUser = useUserStore((state) => state.setUser);
  const showAlert = useAlertStore((state) => state.showAlert);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const [submitting, setSubmitting] = useState<boolean>(false);

  const [loginError, setLoginError] = useState<Error>({
    state: false,
    message: "",
  });

  const loginUser = (data: LoginData) => {
    setSubmitting(true);
    loginError.state &&
      setLoginError({
        state: false,
        message: "",
      });

    axios
      .post("/api/auth/login", data)
      .then((res) => {
        if (res.data?.user) {
          setUser(res.data.user);
        }
        showAlert("Login Success", "success");
        router.push(redirect);
      })
      .catch((err) => {
        console.log(err);

        setLoginError({
          state: true,
          message:
            err?.response?.data?.message ??
            "Something went wrong while logging",
        });
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  return (
    <main className="login">
      <div className="container">
        <h1>Sign in</h1>

        {loginError.state ? (
          <p className="error-container">Login failed! {loginError.message}</p>
        ) : (
          <></>
        )}

        <div className="inner-container">
          <form onSubmit={handleSubmit(loginUser)}>
            <div className="input-lists">
              <InputField
                name="email"
                label="Email address"
                type="text"
                register={register}
                error={errors["email"]?.message}
              />
              <InputField
                name="password"
                label="Password"
                type="password"
                register={register}
                error={errors["password"]?.message}
              />
            </div>

            <div className="button-wrapper">
              <Button
                name="Sign In"
                type="submit"
                style="primary"
                loading={submitting}
              />
            </div>
          </form>

          <span></span>

          <div className="other-options">
            <p>Or sign in with</p>

            <div className="lists">
              <div className="item">
                <Image
                  src={"/google.svg"}
                  width={40}
                  height={40.5}
                  alt="google"
                />
                <p>Google</p>
              </div>
              <div className="item">
                <Image
                  src={"/facebook.svg"}
                  width={40}
                  height={40.5}
                  alt="facebook"
                />
                <p>Facebook</p>
              </div>
              <div className="item">
                <Image
                  src={"/apple.svg"}
                  width={40}
                  height={40.5}
                  alt="apple"
                />
                <p>Apple</p>
              </div>
            </div>
          </div>

          <p className="link" style={{ textAlign: "left" }}>
            Don't have an account yet?{" "}
            <Link style={{ color: "#576074" }} href={"/signup"}>
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
};

export default function LoginLayout() {
  return (
    <Suspense fallback={<div>Loading....</div>}>
      <Login />
    </Suspense>
  );
}
