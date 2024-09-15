import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { favoriteSchema } from "@/api/favorites";

export const PUT = async (
  request: NextRequest,
  { params }: { params: { id: string } }
) => {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json(
      { message: "不正なリクエストです" },
      { status: 400 }
    );
  }

  const body = await request.json();
  const updateField = favoriteSchema.parse(body);
  if (!updateField) {
    return NextResponse.json(
      { message: "好物の名前を指定してください" },
      { status: 400 }
    );
  }
  if (!body.name) {
    return NextResponse.json(
      { message: "好物の名前を指定してください" },
      { status: 400 }
    );
  }

  try {
    const favorite = await prisma.favorite.update({
      where: {
        userId: session.user.id,
        id: params.id,
      },
      data: {
        name: updateField.name,
      },
    });

    return NextResponse.json(favorite);
  } catch (error) {
    return NextResponse.json({ error: "Invalid JSON input" }, { status: 400 });
  }
};
