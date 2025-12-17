import { NextResponse } from "next/server"

export const GET = (req: Request) => {
    return NextResponse.json({message: "User api in development"});
}