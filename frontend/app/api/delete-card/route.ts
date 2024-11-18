import { NextResponse } from "next/server";
import prisma from "@/prisma/client";


export async function POST(request: Request) {
    const { idx }: { idx: number } = await request.json();

    await prisma.learningCard.delete({
        where: {
            id: idx,
        }
    })

    return NextResponse.json({status: 200});
}