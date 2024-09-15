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
  const favorite = await prisma.favorite.findUnique({
    where: {
      userId: params.userId,
    },
  });
  if (!favorite) {
    return NextResponse.json(
      { message: "データが見つかりませんでした" },
      { status: 404 }
    );
  }
  return NextResponse.json(favorite);
};
