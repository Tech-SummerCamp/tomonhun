import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  request: NextRequest,
  { params }: { params: { userId: string } }
) => {
  const session = await auth();

  if (!session || !session.user) {
    return NextResponse.json(
      { message: "不正なリクエストです" },
      { status: 400 }
    );
  }
  try {
    const user = await prisma.favorite.findUnique({
      where: {
        id: params.userId,
      },
    });

    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json({ error: "Invalid JSON input" }, { status: 400 });
  }
};
