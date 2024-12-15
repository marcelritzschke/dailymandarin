import { PrismaClient } from "@prisma/client";
import { createEmptyCard } from "ts-fsrs";

const prisma = new PrismaClient();

async function main() {
  console.log("Start seeding...");

  const card1 = await prisma.learningCard.create({
    data: {
      public: true,
      level: 1,
      word: {
        create: {
          original: "你好",
          translation: "Hello",
        },
      },
      examples: {
        create: [
          {
            original: "你好，我叫小明。",
            translation: "Hello, my name is Xiao Ming.",
          },
          {
            original: "你好！今天怎么样？",
            translation: "Hello! How are you today?",
          },
        ],
      },
    },
  });

  const card2 = await prisma.learningCard.create({
    data: {
      public: true,
      level: 2,
      word: {
        create: {
          original: "谢谢",
          translation: "Thank you",
        },
      },
      examples: {
        create: [
          {
            original: "谢谢你帮助我。",
            translation: "Thank you for helping me.",
          },
          {
            original: "谢谢光临！",
            translation: "Thank you for coming!",
          },
        ],
      },
    },
  });

  console.log({ card1, card2 });
  console.log("Seeding finished.");
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
