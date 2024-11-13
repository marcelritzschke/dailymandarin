import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient();

interface GetProps {
    params: { id: string };
}
export async function GET(request: Request, { params }: GetProps) {
    const card = await prisma.learningCard.findUnique({
        where: { id: parseInt(params.id) },
    });
    if (!card) {
        return NextResponse.json({ error: "Card not found" }, { status: 404 });
    }
    return NextResponse.json(card);
}