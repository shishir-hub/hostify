import jwt from "jsonwebtoken";
import { cookies } from "next/headers";


const JWT_SECRET = `${process.env.JWT_SECRET}`;
const JWT_EXPIRES_IN = "2d";


export const generateToken = (userObj: object) => {
    return jwt.sign(userObj, JWT_SECRET, {expiresIn: JWT_EXPIRES_IN});
}

export const verifyToken = (token: string) => {
    return jwt.verify(token, JWT_SECRET);
}

export const setAuthToken = async (token:string) => {
    const cookiesContainer = await cookies();
    cookiesContainer.set("token", token, {
        httpOnly: true,
        sameSite: "strict",
        secure: process.env.NODE_ENV === "production",
        path: "/"
    });
}