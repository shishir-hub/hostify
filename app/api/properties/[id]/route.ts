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

export const GET = async (
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) => {
  const { id } = await params;
  
  const properties = await readJSON<any[]>("properties.json");
  const users = await readJSON<any[]>("users.json");

  const properteisMap = new Map(properties.map((p) => [p.id, p]));
  const usersMap = new Map(users.map((u) => [u.id, u]));

  const exists = properteisMap.get(id);

  const similarStays = properties.filter(el=> el.id !== id).splice(0,3);

  const similarStaysList: ItemInterface[] = similarStays.map((p) => {
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

  if (!exists?.id) {
    return NextResponse.json(
      {
        message: "Property not found.",
      },
      { status: 400 }
    );
  }

  const host = usersMap.get(exists.host_id);

  const {password, ...hostObj} = host;
  
  const property = {...exists, host: hostObj};
  
  return NextResponse.json(
    {
      message: "Property data fetched.",
      property: property,
      similarStays: similarStaysList
    },
    { status: 200 }
  );
};
