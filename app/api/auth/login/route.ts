import { readJSON } from "@/data/db";

import { NextResponse } from "next/server";
import { comparePassword } from "@/lib/password";
import { generateToken, setAuthToken } from "@/lib/authentication";

export const POST = async (req: Request) => {
  const { email, password } = await req.json();

  if (!email || !password) {
    return NextResponse.json(
      {
        message: `${!email ? "Email" : "Password"} is required.`,
      },
      { status: 400 }
    );
  }

  if (`${password}`.length < 8) {
    return NextResponse.json(
      {
        message: `Password must be at-least 8 characters long.`,
      },
      { status: 400 }
    );
  }

  const users = await readJSON<any[]>("users.json");

  const exists = users.find((u) => u.email === email);

  if (!exists) {
    return NextResponse.json(
      { message: "User with this email not found." },
      { status: 400 }
    );
  }

  const passwordIsValid = await comparePassword(password, exists?.password);

  if (!passwordIsValid) {
    return NextResponse.json(
      { message: "Password is incorrect." },
      { status: 400 }
    );
  }

  const userObj = {
    id: exists?.id,
    name: exists?.name,
    email: exists?.email,
    created_at: exists?.created_at,
    is_super_host: exists?.is_super_host,
    image: exists?.image
  };

  const token = generateToken(userObj);

  await setAuthToken(token);

  return NextResponse.json(
    {
      message: "Sign-in success.",
      user: userObj,
      token: token,
    },
    { status: 200 }
  );
};
