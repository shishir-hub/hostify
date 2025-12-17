import { readJSON, writeJSON } from "@/data/db";

import { v4 as uuid } from "uuid";
import { NextResponse } from "next/server";
import { hashPassword } from "@/lib/password";
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

  const alreadyExists = users.find((u) => u.email === email);

  if (alreadyExists) {
    return NextResponse.json(
      { message: "User with this email already exists" },
      { status: 400 }
    );
  }

  const user = {
    id: uuid(),
    name: `${email}`.split("@")[0],
    email: email,
    created_at: new Date(),
    is_super_host: false,
    password: await hashPassword(password),
    image: null,
  };

  const userObj = {
    id: user.id,
    name: user.name,
    email: user.email,
    created_at: user.created_at,
    is_super_host: user.is_super_host,
    image: user.image,
  };

  const token = generateToken(userObj);

  users.push(user);

  await writeJSON("users.json", users);

  await setAuthToken(token);

  return NextResponse.json(
    {
      message: "Sign-up success.",
      user: userObj,
      token: token,
    },
    { status: 201 }
  );
};
