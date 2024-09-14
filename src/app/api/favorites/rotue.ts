import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  const session = await auth();

  if (!session || !session.user) {
    return NextResponse.json(
      { message: "不正なリクエストです" },
      { status: 400 }
    );
  }
  try {
    const favorite = await prisma.favorite.findMany({
      where: {
        userId: session.user.id,
      },
    });

    return NextResponse.json(favorite);
  } catch (error) {
    return NextResponse.json({ error: "Invalid JSON input" }, { status: 400 });
  }
};

export const POST = async (request : NextRequest){
    const session = await auth();
    if (!session || !session.user) {
        return NextResponse.json(
          { message: "不正なリクエストです" },
          { status: 400 }
        );
      }
      
      try {
        const favorite = await prisma.favorite.findMany({
          where: {
            userId: session.user.id,
          },
        });
    
        return NextResponse.json(favorite);
      } catch (error) {
        return NextResponse.json({ error: "Invalid JSON input" }, { status: 400 });
      }


}
