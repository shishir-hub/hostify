"use client";

import Link from "next/link";
import Image from "next/image";

import "../login/Login.scss";

import InputField from "@/components/UserForm/InputField/InputField";
import Button from "@/components/Button/Button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema } from "@/lib/validator";
import z from "zod";
import { useState } from "react";
import axios from "axios";

type SignupUser = z.infer<typeof signupSchema>;

const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signupSchema),
  });

  const [submitting, setSubmitting] = useState<boolean>(false);

  const signupUser = (data: SignupUser) => {
    setSubmitting(true);
    axios
      .post("/api/auth/signup", data)
      .then((res) => {
        console.log(res.data);
        
      })
      .catch((err) => {})
      .finally(() => {
        setSubmitting(false);
      });
  };

  return (
    <main className="login">
      <div className="container">
        <h1>Create Account</h1>

        <div className="inner-container">
          <form onSubmit={handleSubmit(signupUser)}>
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
              <InputField
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                register={register}
                error={errors["confirmPassword"]?.message}
              />
            </div>

            <div className="button-wrapper">
              <Button name="Sign Up" type="submit" style="primary" />
            </div>
          </form>

          <span></span>

          <div className="other-options">
            <p>Or sign up with</p>

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

          <p className="link">
            I already have an account. <Link href={"/login"}>Login</Link>
          </p>
        </div>
      </div>
    </main>
  );
};

export default Signup;
