import { readJSON } from "@/data/db";
import { NextResponse } from "next/server";

type ItemInterface = {
  id: string;
  name: string;
  image: string | null;
  location_tag: string;
  rate: number;
  is_super_host: boolean;
  ratings: number;
};

export const GET = async (req: Request) => {
  const url = new URL(req.url);
  const search = url.searchParams.get("search") ?? "";
  const page = Number(url.searchParams.get("page") ?? 1);
  const limit = Number(url.searchParams.get("limit") ?? 16);

  let properties = await readJSON<any[]>("properties.json");
  const users = await readJSON<any[]>("users.json");

  if (search) {
    const escaped = search.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const regex = new RegExp(escaped, "i");

    properties = properties.filter(
      (property) =>
        regex.test(property.name) ||
        regex.test(property.location_tag)
    );
  }

  const total = properties.length;
  const totalPages = Math.ceil(total / limit);

  const start = (page - 1) * limit;
  const paginatedData = properties.slice(start, start + limit);

  const usersMap = new Map(users.map((u) => [u.id, u]));

  const list: ItemInterface[] = paginatedData.map((p) => {
    const host = usersMap.get(p.host_id);
    return {
      id: p.id,
      name: p.name,
      image: p.image,
      location_tag: p.location_tag,
      rate: p.rate,
      is_super_host: host?.is_super_host ?? false,
      ratings: p.ratings,
    };
  });

  return NextResponse.json({
    message: "Properties fetched.",
    properties: list,
    totalPages: totalPages,
    page: page,
    limit: limit
  });
};
