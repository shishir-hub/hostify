import { verifyToken } from "@/lib/authentication";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const verifyTokenInRoute = async () => {
  const cookiesContainer = await cookies();
  const token = cookiesContainer.get("token")?.value;

  if (!token) {
    redirect("/login");
  }

  try {
    verifyToken(token);
  } catch (error) {
    redirect("/login");
  }
};
